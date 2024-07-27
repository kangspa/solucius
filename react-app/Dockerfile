# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Set environment variables
ENV REACT_APP_API_URL=http://spring-app:8080

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
