FROM debian:bullseye

# Install necessary build dependencies
RUN apt-get update && apt-get install -y \
    build-essential wget curl zlib1g-dev libpcre3 libpcre3-dev libssl-dev \
    nginx

# Copy OpenSSL source (if you still need to compile a specific version)
COPY openssl/openssl-1.1.1l /usr/local/src/openssl-1.1.1l

# Optionally, you could compile OpenSSL from source (but this is rarely necessary nowadays)
# RUN cd /usr/local/src && \
#     wget https://www.openssl.org/source/openssl-1.1.1l.tar.gz && \
#     tar -xzf openssl-1.1.1l.tar.gz && \
#     cd openssl-1.1.1l && \
#     ./config && make && make install

# Copy NGINX source and build it (or skip if you use the NGINX package)
# RUN cd /usr/local/src && \
#     wget http://nginx.org/download/nginx-1.20.2.tar.gz && \
#     tar -xzf nginx-1.20.2.tar.gz && \
#     cd nginx-1.20.2 && \
#     ./configure --with-http_ssl_module --with-openssl=../openssl-1.1.1l && \
#     make && make install

# Copy the NGINX configuration and SSL certs
COPY conf.d/nginx.conf /etc/nginx/nginx.conf
COPY ssl/certs/server.crt /etc/ssl/certs/server.crt
COPY ssl/private/server.key /etc/ssl/private/server.key

# Expose ports
EXPOSE 443

# Set the command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
