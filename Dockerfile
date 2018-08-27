FROM node:8.11.4-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
CMD npm start
EXPOSE 8080