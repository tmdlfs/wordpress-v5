FROM wordpress:latest

# Copy WordPress files
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html/

# Remove installation files
RUN rm -f /var/www/html/wp-config-sample.php
