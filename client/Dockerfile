FROM node:20.0.0 as builder
WORKDIR /client
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
RUN npm run build


FROM node:20.0.0

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

