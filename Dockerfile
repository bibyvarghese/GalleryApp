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

# Use official Apache Alpine image
FROM httpd:alpine


# Download and install OpenSSL 1.0.2u
RUN wget https://www.openssl.org/source/openssl-1.0.2u.tar.gz \
    && tar -xvzf openssl-1.0.2u.tar.gz \
    && cd openssl-1.0.2u \
    && ./config \
    && make \
    && make install \
    && rm -rf /var/cache/apk/*
    
# Create SSL directory
RUN mkdir -p /usr/local/apache2/conf/ssl

# Copy SSL certificate and key
COPY ./apache/certs/nginx-selfsigned.crt /usr/local/apache2/conf/ssl/nginx-selfsigned.crt
COPY ./apache/certs/nginx-selfsigned.key /usr/local/apache2/conf/ssl/nginx-selfsigned.key

# Copy site configurations
COPY ./apache/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./apache/000-default.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
COPY ./apache/default-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf


# Expose ports
EXPOSE 80 443

# Start Apache in foreground
CMD ["httpd-foreground"]
