FROM node:18.13.0

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start:docker"]