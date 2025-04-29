FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y apache2 openssl && \
    a2enmod ssl proxy proxy_http && \
    a2ensite default-ssl && \
    apt-get clean

COPY certs/server.crt /etc/apache2/certs/selfsigned.crt
COPY certs/server.key /etc/apache2/certs/selfsigned.key
COPY apache.conf /etc/apache2/sites-available/default-ssl.conf



EXPOSE 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
