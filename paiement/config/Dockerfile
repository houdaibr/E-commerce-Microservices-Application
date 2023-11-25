FROM node:20.0.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5009

CMD ["node", "server.js"]