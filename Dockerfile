# Stage 1: Build the Vue app
# We use an official Node.js image with Alpine Linux for a smaller footprint
FROM node:23-alpine3.20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
# This helps in caching dependencies and speeds up the build process
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Build the Vue.js application
RUN npm run build

# Stage 2: Serve the app with Nginx
# We use an official Nginx image with Alpine Linux (lightweight and efficient)
FROM nginx:alpine

# Remove the default static HTML files served by Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Vue app from the previous "builder" stage to the Nginx serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config for Vue history mode
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to make the application accessible
EXPOSE 80

# Start Nginx in the foreground (this keeps the container running)
CMD ["nginx", "-g", "daemon off;"]
