FROM node:alpine

# Install the build essentials (gcc, g++, ffmpeg, python3)
RUN apk add --update alpine-sdk python2 python3
RUN alias python="python3"

WORKDIR discord-music-bot
COPY . .

# Install dependencies
RUN yarn

CMD yarn start
