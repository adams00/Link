FROM node:gallium-alpine as build
RUN apk update
RUN apk upgrade
RUN apk add curl
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
# RUN npm start
RUN npm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html