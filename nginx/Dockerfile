# Use the official Nginx image as the base
FROM nginx:alpine

# Install OpenSSL 1.0.2
# Install dependencies
RUN apk add --no-cache build-base wget

# Download and install OpenSSL 1.0.2u from source
RUN wget https://www.openssl.org/source/openssl-1.0.2u.tar.gz \
    && tar -xvzf openssl-1.0.2u.tar.gz \
    && cd openssl-1.0.2u \
    && ./config \
    && make \
    && make install \
    && rm -rf /var/cache/apk/*

# Copy the main nginx.conf to the container
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the default.conf to the nginx conf.d directory
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificate files to the container
COPY ./nginx/certs/nginx-selfsigned.crt /etc/nginx/certs/nginx-selfsigned.crt
COPY ./nginx/certs/nginx-selfsigned.key /etc/nginx/certs/nginx-selfsigned.key

# Expose ports 80 (HTTP) and 443 (HTTPS)
EXPOSE 80 443

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
