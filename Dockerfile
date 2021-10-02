FROM node:alpine
WORKDIR discord-music-bot
RUN apk add ffmpeg

COPY . .
RUN npm install --legacy-peer-deps

CMD yarn start

