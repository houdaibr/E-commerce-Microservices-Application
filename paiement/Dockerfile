# Use a lightweight Node.js image
FROM node:20.0.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code
COPY . .

# Expose the port on which the microservice will listen
EXPOSE 5009

CMD ["node", "server.js"]