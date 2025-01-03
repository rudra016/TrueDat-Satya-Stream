# Use the official Node.js image for building the frontend
FROM node:18 AS build

# Set the working directory
WORKDIR /frontend

# Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Use an official Nginx image to serve the frontend
FROM nginx:alpine

# Copy the build output to the Nginx web server
COPY --from=build /frontend/dist /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
