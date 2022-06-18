FROM node:17.3.1

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV NODE_PATH=./src
