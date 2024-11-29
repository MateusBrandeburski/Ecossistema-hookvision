# Usar uma imagem base do PHP com Composer
FROM php:8.3.2-fpm-alpine3.19
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos da aplicação
COPY . /app

# Instalar dependências do Composer
RUN composer install --no-interaction --optimize-autoloader --no-scripts

# Expor a porta 8000
EXPOSE 8000

# Comando para iniciar o servidor PHP built-in
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
