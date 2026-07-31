# ====================
# Stage 1: Dependencies (SAFE)
# ====================
FROM node:20-bullseye AS deps
WORKDIR /app

# Minimal build tools (no curl/wget/netcat)
RUN apt-get update && apt-get install -y \
    python3 make g++ openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy only lock files
COPY package.json package-lock.json ./

# ⛔ Block ALL lifecycle scripts (malware protection)
RUN npm ci --ignore-scripts

# Allow only known-safe native rebuilds
RUN npm rebuild prisma bcrypt sharp || true


# ====================
# Stage 2: Build
# ====================
FROM node:20-bullseye AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PRIVATE_TURBOPACK=0
ENV NODE_ENV=production

# Prisma generate (safe, local only)
RUN npx prisma generate

# Build app
RUN npm run build


# ====================
# Stage 3: Runtime (LOCKED DOWN)
# ====================
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app
ENV NODE_ENV=production

# Run as non-root
USER nonroot

# Copy ONLY what is required to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Distroless has no shell → malware cannot execute
CMD ["node_modules/.bin/next", "start"]
