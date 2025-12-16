# Use the official PHP image as the base image
FROM php:8.2-apache

# Install dependencies for Composer
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Install PDO MySQL extension
RUN docker-php-ext-install pdo_mysql

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
# RUN composer install --no-scripts --no-autoloader

# Copy the rest of the application code
COPY . .

# Set the correct permissions for the storage and bootstrap cache directories
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Enable Apache modules and set the document root
RUN a2enmod rewrite
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
# Install additional PHP extensions if needed

# Expose port 80
EXPOSE 80

# Start the Apache server
CMD ["apache2-foreground"]
