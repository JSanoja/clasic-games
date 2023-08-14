############################################################
# Dockerfile to build Flask App
# Based on
############################################################

# Set the base image
FROM debian:bullseye-slim

# File Author / Maintainer
LABEL image.author="jm"

RUN apt-get update \     
    && apt-get install -y apache2 curl 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs \
    && apt-get clean \
    && apt-get autoremove \
    && rm -rf /var/lib/apt/lists/* 
    

RUN echo "ServerName clasic-games" >> /etc/apache2/apache2.conf
# Copy over the apache configuration file and enable the site
COPY ./clasic-games.conf /etc/apache2/sites-available/clasic-games.conf
# Copy over the wsgi file, run.py and the app
COPY ./ /var/www/clasic-games/
WORKDIR /var/www/clasic-games
RUN bash /var/www/clasic-games/deploy.sh

RUN a2dissite 000-default.conf
RUN a2ensite clasic-games.conf
RUN a2enmod headers

#nameserver
#RUN echo "hostname_ejemplo" > /etc/hostname
#RUN hostname -F /etc/hostname

# LINK apache config to docker logs.
RUN ln -sf /proc/self/fd/1 /var/log/apache2/access.log && \
    ln -sf /proc/self/fd/1 /var/log/apache2/error.log

EXPOSE 80



CMD  /usr/sbin/apache2ctl -D FOREGROUND