# Tahap 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Salin dependency dan install
COPY package*.json ./
RUN npm ci

# Salin seluruh source code dan build Next.js app
COPY . .
RUN npm run build

# Tahap 2: Jalankan hasil build
FROM node:20-alpine AS runner

# Working directory
WORKDIR /app

# Salin file produksi dari tahap builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set env untuk production
ENV NODE_ENV=production
ENV PORT=3000

# Jalankan Next.js
EXPOSE 3000
CMD ["npm", "start"]