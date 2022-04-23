# get base image
FROM node:16-alpine

WORKDIR /var/app

COPY ./package.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["yarn","run","dev"]