# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

RUN ls -la /app


# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Clear npm cache to avoid issues with previous builds
RUN npm cache clean --force

# Debug step to verify npm and node versions
RUN node -v
RUN npm -v

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code to the container
COPY . .

# Ensure proper permissions for files and directories
RUN chown -R node:node /app

# Switch to the non-root user (node)
USER node

# Expose the port your app runs on (adjust as needed)
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
