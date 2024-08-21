FROM node:21.7
LABEL authors="TeamOps"

RUN npm install -g http-server

WORKDIR /app

COPY ../package*.json ./
RUN npm install

COPY ../ .
RUN npm run build

CMD [ "http-server", "dist" ]
EXPOSE 8080