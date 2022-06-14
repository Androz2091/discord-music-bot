FROM node:lts

WORKDIR discord-music-bot

RUN apt update && apt install ffmpeg -y

COPY . .
RUN npm ci

CMD npm start

