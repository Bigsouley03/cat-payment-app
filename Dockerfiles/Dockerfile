# Use a specific Node.js version for build stage
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a smaller Nginx image for runtime
FROM nginx:alpine

# Copy built artifacts from the build stage
COPY dist/ /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Entry point for the container
CMD ["nginx", "-g", "daemon off;"]
