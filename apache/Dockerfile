FROM debian:bullseye

# Install Apache and SSL tools
RUN apt-get update && \
    apt-get install -y apache2 openssl && \
    a2enmod ssl && \
    a2ensite default-ssl && \
    apt-get clean

# Copy SSL certs and config
COPY certs/selfsigned.crt /etc/apache2/certs/selfsigned.crt
COPY certs/selfsigned.key /etc/apache2/certs/selfsigned.key
COPY apache.conf /etc/apache2/sites-available/default-ssl.conf

# Optional: copy site content
COPY index.html /var/www/html/index.html

EXPOSE 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
