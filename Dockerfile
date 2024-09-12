FROM nginx:stable-alpine

# Install ACME certbot
RUN apk add --no-cache certbot

# Copy nginx configurations to the nginx config folder on the
# container image
COPY ./nginx/ /etc/nginx/

# Copy the static sources for domains into /var/www
RUN mkdir -p /var/www
COPY ./src /var/www

# Install entrypoint script
COPY ./docker/scripts/init.sh /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]
