# مرحله build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# مرحله production
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app
RUN npm ci --omit=dev

ENV NODE_ENV=production

CMD ["npm", "start"]
