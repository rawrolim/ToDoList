FROM php:8.1-cli-alpine

WORKDIR /app

COPY . /app

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install
RUN php artisan key:generate

EXPOSE 8000

CMD ["php","artisan","serve"]