FROM php:8.2-apache
WORKDIR /var/www/html

# Create storage and bootstrap/cache directories
RUN mkdir -p storage bootstrap/cache

# Set the correct permissions for storage and bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Mod Rewrite
RUN a2enmod rewrite

# Linux Library
RUN apt-get update -y && apt-get install -y \
    libicu-dev \
    libmariadb-dev \
    unzip zip \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev

# Copy the custom Apache virtual host configuration
COPY apache-vhost.conf /etc/apache2/sites-available/000-default.conf

# Modify Apache configuration to allow all access
RUN sed -i 's/Require all denied/Require all granted/g' /etc/apache2/sites-available/000-default.conf

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# PHP Extension
RUN docker-php-ext-install gettext intl pdo_mysql gd

RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# Reinstall application dependencies using Composer
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copy the rest of the application files
COPY . .

# Run Composer scripts
RUN composer dump-autoload --optimize
