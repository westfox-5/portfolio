# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.11.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /app

################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --only=production

################################################################################
# Create a stage for building the application.
FROM deps AS builder

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

################################################################################
# Use Nginx to serve the static files
FROM nginx:alpine AS final

# Copy the built static files from the builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
