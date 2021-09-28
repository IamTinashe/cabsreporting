FROM nginx:1.18

RUN set -eux; \
    apt-get update; \
    apt-get install --no-install-recommends -y ca-certificates curl; \
    rm -fr /var/lib/apt/lists/

COPY dist /var/www/html
COPY frontend.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /tmp/
RUN chmod +x /tmp/entrypoint.sh

ENTRYPOINT [ "/tmp/entrypoint.sh" ]
