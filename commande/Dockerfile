FROM node:20.0.0-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
COPY . .
EXPOSE 5008
CMD ["node", "server.js"]
