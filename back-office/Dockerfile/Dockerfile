FROM webdevops/php-nginx:8.0
RUN wget -qO- https://deb.nodesource.com/setup_14.x | bash - \
&& apt-get -y install nodejs
WORKDIR /app
EXPOSE 80

