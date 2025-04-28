# Use official Apache image
FROM httpd:2.4

# Copy custom Apache configs into container
COPY ./apache/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./apache/000-default.conf /usr/local/apache2/conf/extra/000-default.conf
COPY ./apache/default-ssl.conf /usr/local/apache2/conf/extra/default-ssl.conf

# Copy SSL certificates
COPY ./apache/certs/nginx-selfsigned.crt /usr/local/apache2/conf/ssl/nginx-selfsigned.crt
COPY ./apache/certs/nginx-selfsigned.key /usr/local/apache2/conf/ssl/nginx-selfsigned.key

# Copy your app files if needed (optional - if web files are needed in Apache)
# COPY ./public/ /usr/local/apache2/htdocs/

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Apache server
CMD ["httpd-foreground"]
