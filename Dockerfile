FROM node:16

WORKDIR /usr/src/bot

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci

CMD ["npm","start"]
