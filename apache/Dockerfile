FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y apache2 openssl && \
    a2enmod ssl proxy proxy_http && \
    a2ensite default-ssl && \
    apt-get clean

COPY certs/selfsigned.crt /etc/apache2/certs/selfsigned.crt
COPY certs/selfsigned.key /etc/apache2/certs/selfsigned.key
COPY default-ssl.conf /etc/apache2/sites-available/default-ssl.conf

COPY index.html /var/www/html/index.html

EXPOSE 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
