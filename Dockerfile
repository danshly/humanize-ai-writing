# syntax=docker/dockerfile:1

# ---------- build stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
ARG TARGETARCH
RUN --mount=type=cache,target=/root/.npm,id=npm-${TARGETARCH} \
    npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- runtime stage ----------
FROM nginx:1.27-alpine

# Links the ghcr.io package to the GitHub repo
LABEL org.opencontainers.image.source="https://github.com/danshly/humanize-ai-writing"
LABEL org.opencontainers.image.description="Don't AI Me — static Next.js site served by nginx"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
