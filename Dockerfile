# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory inside the container to /frontend
WORKDIR /frontend

# Set more permissive permissions (example)
RUN chmod -R 777 /frontend

# Copy package.json and yarn.lock to the working directory
COPY frontend/package.json .
COPY frontend/yarn.lock .


# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Run yarn build
RUN yarn build

# Your additional configuration or steps go here

# Command to start your application, if applicable
CMD [ "yarn", "start" ]
