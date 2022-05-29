FROM node:alpine
WORKDIR /discord-music-bot

COPY . .
RUN npm install --legacy-peer-deps

CMD yarn start

