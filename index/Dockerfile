FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . . 
EXPOSE 8080
RUN npm run compile-server
CMD [ "npm", "run", "start" ]
