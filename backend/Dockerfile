FROM php:8.2-apache

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libonig-dev \
    libzip-dev \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Extensions PHP nécessaires
RUN docker-php-ext-install pdo_mysql mbstring bcmath exif pcntl

# Apache rewrite
RUN a2enmod rewrite
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copier tout le projet
COPY . .

# Créer bootstrap/cache + storage avant composer
RUN mkdir -p bootstrap/cache storage \
    && chown -R www-data:www-data bootstrap/cache storage \
    && chmod -R 775 bootstrap/cache storage

# Installer les dépendances PHP/Laravel
RUN composer install --no-dev --optimize-autoloader

# Assurer que vendor est lisible par PHP
RUN chown -R www-data:www-data vendor \
    && chmod -R 755 vendor

EXPOSE 80
CMD ["apache2-foreground"]
