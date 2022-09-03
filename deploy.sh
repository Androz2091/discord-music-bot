#!/usr/bin/env bash

docker --context for-the-boys compose pull

sleep 15

docker --context for-the-boys compose --env-file ./.env up -d
