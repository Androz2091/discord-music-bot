FROM node:alpine

# Install the build essentials (gcc, g++, ffmpeg, python3)
RUN apk add --update alpine-sdk python3 py3-pip

WORKDIR discord-music-bot
COPY . .

# Install dependencies
RUN yarn

CMD yarn start
