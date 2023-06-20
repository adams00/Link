FROM node:gallium-alpine

ENV MONGO_URL=mongodb://database:27017/link
ENV LISTEN_IP=0.0.0.0

WORKDIR /app/
COPY package*.json .
RUN npm install
COPY . .
CMD npm start