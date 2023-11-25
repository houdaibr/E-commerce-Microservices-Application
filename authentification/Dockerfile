FROM node:20.0.0
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 5010
CMD ["node", "server.js"]