FROM node:alpine
WORKDIR discord-music-bot
RUN apk add ffmpeg

COPY . .
RUN npm install

CMD node .

