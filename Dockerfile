FROM node:8.11.3-alpine
RUN mkdir -p /var/www/app
RUN mkdir /mnt/shared
WORKDIR /var/www/app
COPY . .
RUN npm install --unsafe-perm
EXPOSE 80
CMD ["npm", "start"]