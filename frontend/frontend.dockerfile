FROM node:20

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only lock + manifest files first for efficient caching
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the app
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["pnpm", "dev", "--host"]
