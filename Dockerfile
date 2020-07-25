FROM node:12.18-alpine
RUN mkdir -p /var/www/app
RUN mkdir /mnt/shared
WORKDIR /var/www/app
COPY . .
RUN npm install --production --ignore-scripts
RUN npm run prepare:prod
EXPOSE 80
CMD ["npm", "start"]