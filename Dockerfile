FROM httpd:alpine

# Install build tools (make, gcc, etc.) for building OpenSSL
RUN apk add --no-cache build-base wget

# Download and install OpenSSL 1.0.2u
RUN wget https://www.openssl.org/source/openssl-1.0.2u.tar.gz \
    && tar -xvzf openssl-1.0.2u.tar.gz \
    && cd openssl-1.0.2u \
    && ./config \
    && make \
    && make install \
    && rm -rf /var/cache/apk/*

# Copy Apache site configs
COPY ./apache/000-default.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
COPY ./apache/default-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

# Copy SSL certificates
COPY ./apache/certs/nginx-selfsigned.crt /etc/apache2/ssl/nginx-selfsigned.crt
COPY ./apache/certs/nginx-selfsigned.key /etc/apache2/ssl/nginx-selfsigned.key

# Copy and update main apache config to include vhosts
COPY ./apache/httpd.conf /usr/local/apache2/conf/httpd.conf

# Expose ports
EXPOSE 80 443

# Start Apache in foreground
CMD ["httpd-foreground"]
