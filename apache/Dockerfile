FROM httpd:2.4

RUN apt-get update && \
    apt-get install -y apache2 openssl && \
    a2enmod ssl proxy proxy_http && \
    apt-get install -y apache2 apache2-utils apache2-bin apache2-data && \
    a2enmod ssl proxy proxy_http headers

COPY certs/server.crt /etc/apache2/certs/selfsigned.crt
COPY certs/server.key /etc/apache2/certs/selfsigned.key
COPY apache.conf /etc/apache2/sites-available/default-ssl.conf



# Enable needed modules
RUN apt-get update && \
    apt-get install -y apache2 apache2-utils apache2-bin apache2-data && \
    a2enmod ssl proxy proxy_http headers

# Copy site configuration
COPY apache.conf /etc/apache2/sites-available/default-ssl.conf

# Enable the site
RUN a2ensite default-ssl

# Expose HTTPS port
EXPOSE 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
