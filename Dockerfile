FROM nginx

COPY nginx/server.conf /etc/nginx/conf.d/default.conf
COPY ./htdoc/ /usr/share/nginx/html