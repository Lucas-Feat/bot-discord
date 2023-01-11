FROM node:16

WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
