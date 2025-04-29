FROM httpd:2.4

# Copy custom config
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Copy certs
COPY certs/server.crt /etc/apache2/ssl/server.crt
COPY certs/server.key /etc/apache2/ssl/server.key
