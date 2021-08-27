FROM node:alpine

RUN apk add openssh ffmpeg git
RUN git clone https://github.com/lracicot/discord-music-bot.git

WORKDIR discord-music-bot

RUN npm install

CMD node .

