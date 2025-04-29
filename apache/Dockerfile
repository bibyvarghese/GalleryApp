# Base image with Apache + PHP (we're not using PHP though)
FROM php:8.2-apache

# Enable SSL module
RUN a2enmod ssl

# Copy SSL VirtualHost config
COPY apache/apache.conf /etc/apache2/sites-available/000-default.conf

# Optional OpenSSL config (if needed by scripts/tools)
COPY /apache/openssl.cnf /etc/apache2/openssl.cnf

# Self-signed certs
COPY certs/ /etc/apache2/certs/

# Expose HTTPS port
EXPOSE 443
