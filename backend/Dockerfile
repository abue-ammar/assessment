FROM php:8.4-cli

# Install system dependencies required by Composer and PDO MySQL
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libonig-dev \
    unzip \
    git \
    zip \
    && docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Copy Composer from official Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist

# Expose port for PHP built-in server
EXPOSE 8080

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:8080", "router.php"]
