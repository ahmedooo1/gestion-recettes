FROM php:8.3-apache
WORKDIR /var/www/html

COPY public/ /var/www/html/
COPY database.php /var/www/html/  

RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod headers rewrite

# Copier la configuration CORS dans Apache
COPY ./cors.conf /etc/apache2/conf-available/cors.conf

# Activer la configuration CORS
RUN a2enconf cors
EXPOSE 80

CMD ["apache2-foreground"]



