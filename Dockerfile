# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

# Salin file dependency dan install
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Salin seluruh source code dan build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:lts-alpine AS runner

WORKDIR /app

# Set NODE_ENV production
ENV NODE_ENV=production

# Install hanya dependencies produksi
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Salin hasil build dan config yang dibutuhkan
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/next-env.d.ts .

# Port default untuk Cloud Run
EXPOSE 8080

# Start server di port 8080
CMD ["npm", "start"]
