FROM php:8.4-cli

# Install required extensions
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libonig-dev \
    && docker-php-ext-install pdo pdo_mysql

# Copy project
WORKDIR /app
COPY . .

# Install Composer dependencies
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install

# Expose port
EXPOSE 8080

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:8080", "router.php"]
