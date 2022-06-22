FROM php:8.1-cli-alpine

WORKDIR /app

COPY . /app

RUN cp .env.example .env
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install
RUN php artisan key:generate
RUN php artisan migrate
EXPOSE 8000

CMD ["php","artisan","serve"]