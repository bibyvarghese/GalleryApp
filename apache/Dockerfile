# Base image with Apache + PHP 8.2
FROM php:8.2-apache

RUN docker-php-ext-install mysqli
RUN a2enmod ssl

# SSL VirtualHost config
COPY apache/apache.conf /etc/apache2/sites-available/000-default.conf

# Optional OpenSSL config (not always needed)
COPY apache/openssl.cnf /etc/apache2/openssl.cnf

# Self-signed certs
COPY apache/certs/ /etc/apache2/certs/

# PHP files (optional)
COPY apache/html/ /var/www/html/

EXPOSE 443
