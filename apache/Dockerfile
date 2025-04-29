FROM debian:bullseye

# Install Apache and required modules
RUN apt-get update && \
    apt-get install -y apache2 openssl && \
    a2enmod ssl proxy proxy_http headers

# Create certs directory and copy SSL certs
RUN mkdir -p /etc/apache2/certs
COPY certs/server.crt /etc/apache2/certs/selfsigned.crt
COPY certs/server.key /etc/apache2/certs/selfsigned.key

# Copy site config and enable SSL site
COPY apache.conf /etc/apache2/sites-available/default-ssl.conf
RUN a2ensite default-ssl

# Optional: disable the default HTTP site if you don't need it
RUN a2dissite 000-default

# Expose HTTPS port
EXPOSE 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
