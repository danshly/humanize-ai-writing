#!/usr/bin/env bash
# =============================================================================
# humanize-ai-writing — Cross-Platform Build & Push (buildx)
# =============================================================================
# Builds multi-arch images (amd64 + arm64) and pushes to GitHub Container
# Registry (ghcr.io) by default.
#
# Authentication (before pushing):
#   echo "$GITHUB_PAT" | docker login ghcr.io -u <github-user> --password-stdin
#   (PAT needs the `write:packages` scope)
#
# Usage:
#   ./scripts/build.sh                          # build + push (default)
#   ./scripts/build.sh --tag v1.0.0             # custom tag
#   ./scripts/build.sh --repo myuser            # push to ghcr.io/myuser/...
#   ./scripts/build.sh --registry docker.io     # use Docker Hub instead
#   ./scripts/build.sh --platform linux/arm64   # single platform only
#   ./scripts/build.sh --load                   # load into local Docker (single platform)
#   ./scripts/build.sh --dry-run                # print the command without executing
# =============================================================================

set -euo pipefail

# ---- Defaults ----
REGISTRY="${DOCKER_REGISTRY:-ghcr.io}"
REPO="${DOCKER_REPO:-danshly}"
IMAGE_NAME="humanize-ai-writing"
TAG="latest"
PLATFORMS="linux/amd64,linux/arm64"
BUILDER_NAME="humanize-ai-writing"
DRY_RUN=false
LOAD=false
NO_CACHE=false

# ---- Colors ----
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[build]${NC} $*"; }
ok()   { echo -e "${GREEN}[build]${NC} $*"; }
warn() { echo -e "${YELLOW}[build]${NC} $*"; }
err()  { echo -e "${RED}[build]${NC} $*" >&2; }

# ---- Parse args ----
while [[ $# -gt 0 ]]; do
    case "$1" in
        --registry)  REGISTRY="$2";   shift 2 ;;
        --repo)      REPO="$2";       shift 2 ;;
        --tag)       TAG="$2";        shift 2 ;;
        --platform)  PLATFORMS="$2";  shift 2 ;;
        --load)      LOAD=true;       shift ;;
        --no-cache)  NO_CACHE=true;   shift ;;
        --dry-run)   DRY_RUN=true;    shift ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --registry REGISTRY  Container registry (default: ghcr.io)"
            echo "  --repo REPO          Repository namespace (default: danshly)"
            echo "  --tag TAG            Image tag (default: latest)"
            echo "  --platform PLATFORMS Comma-separated platforms (default: linux/amd64,linux/arm64)"
            echo "  --load               Load image into local Docker (single platform only)"
            echo "  --no-cache           Disable Docker layer cache"
            echo "  --dry-run            Print the build command without executing"
            echo "  --help               Show this help"
            exit 0
            ;;
        *)
            err "Unknown option: $1"
            exit 1
            ;;
    esac
done

# ---- Resolve project root ----
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

FULL_IMAGE="${REGISTRY}/${REPO}/${IMAGE_NAME}:${TAG}"

# ---- Preflight checks ----
if ! command -v docker &>/dev/null; then
    err "Docker is not installed. Install Docker first."
    exit 1
fi

if ! docker buildx version &>/dev/null; then
    err "Docker buildx is not available. Update Docker or install the buildx plugin."
    exit 1
fi

# ---- Register QEMU for cross-arch emulation (must happen BEFORE builder creation) ----
NEEDS_QEMU=false
if [[ "$PLATFORMS" == *","* ]]; then
    NEEDS_QEMU=true
elif [[ "$PLATFORMS" != "linux/$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')" ]]; then
    NEEDS_QEMU=true
fi

if [[ "$NEEDS_QEMU" == true ]]; then
    log "Registering QEMU emulators for cross-platform builds..."
    docker run --privileged --rm tonistiigi/binfmt --install all >/dev/null 2>&1
    ok "QEMU registered."
fi

# ---- Ensure buildx builder exists and is healthy ----
log "Checking buildx builder '${BUILDER_NAME}'..."

create_builder() {
    log "Creating buildx builder '${BUILDER_NAME}'..."
    docker buildx create \
        --name "$BUILDER_NAME" \
        --driver docker-container \
        --platform linux/amd64,linux/arm64
    ok "Builder '${BUILDER_NAME}' created."
}

if ! docker buildx inspect "$BUILDER_NAME" &>/dev/null; then
    create_builder
fi

docker buildx use "$BUILDER_NAME"

log "Bootstrapping builder..."
docker buildx inspect --bootstrap >/dev/null 2>&1

# ---- Build command ----
BUILD_ARGS=(
    docker buildx build
    --builder "$BUILDER_NAME"
    --platform "$PLATFORMS"
    -t "$FULL_IMAGE"
)

if [[ "$LOAD" == true ]]; then
    # --load only works for single-platform builds
    if [[ "$PLATFORMS" == *","* ]]; then
        err "--load only supports single-platform builds. Use --platform with one target."
        exit 1
    fi
    BUILD_ARGS+=(--load)
else
    BUILD_ARGS+=(--push)
fi

if [[ "$NO_CACHE" == true ]]; then
    BUILD_ARGS+=(--no-cache)
fi

BUILD_ARGS+=(.)

# ---- Execute or dry-run ----
if [[ "$DRY_RUN" == true ]]; then
    warn "Dry run — would execute:"
    echo "  ${BUILD_ARGS[*]}"
    exit 0
fi

log "Building multi-arch image..."
log "  Image:     ${FULL_IMAGE}"
log "  Platforms: ${PLATFORMS}"
log "  Action:    $(if [[ "$LOAD" == true ]]; then echo "load (local)"; else echo "push"; fi)"
echo ""

"${BUILD_ARGS[@]}"

echo ""
ok "Build complete!"
ok "  Image: ${FULL_IMAGE}"
ok "  Platforms: ${PLATFORMS}"

if [[ "$LOAD" != true ]]; then
    ok ""
    ok "Pull on target server:"
    ok "  docker pull ${FULL_IMAGE}"
fi
