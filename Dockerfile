# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app's source code into the container
COPY . .

# Expose the app on port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
