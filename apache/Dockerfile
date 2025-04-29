# Base image with Apache (PHP is optional, but fine)
FROM php:8.2-apache

# Enable SSL module
RUN a2enmod ssl

# Copy VirtualHost SSL config (HTTPS)
COPY apache.conf /etc/apache2/sites-available/default-ssl.conf

# Optional OpenSSL config (for cert generation, if needed)
COPY openssl.cnf /etc/apache2/openssl.cnf

# Copy your self-signed certs and keys
COPY certs/ /etc/apache2/certs/

# Enable the SSL site
RUN a2ensite default-ssl

# Expose the HTTPS port
EXPOSE 443

# Start Apache
CMD ["apache2-foreground"]
