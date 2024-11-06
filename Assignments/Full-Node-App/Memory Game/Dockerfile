# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /server

# Copy package.json and package-lock.json to /app in the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy backend code (where server.js is located) to /app in the container
COPY backend/. .  

# Copy frontend code to /app/frontend in the container
COPY frontend ./frontend  

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]