# 1. Base image
FROM node:22-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy source code
COPY . .

# 5. Build TypeScript code
RUN npm run build

# 7. Start the app
CMD ["node", "dist/server.js"]
