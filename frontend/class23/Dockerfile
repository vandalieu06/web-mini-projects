FROM php:8.2-apache

# Actualizar repositorios e instalar la librería de desarrollo de SQLite y compilar la extensión
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*
