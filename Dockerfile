FROM --platform=$BUILDPLATFORM node:lts

WORKDIR discord-music-bot

RUN apt update && apt install ffmpeg -y

COPY . .
RUN npm ci --force

CMD npm start

