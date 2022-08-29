#!/usr/bin/env bash

# export NEXUS_ROBOT_CONFIG="`cat $1 | jq '@json'`"

docker --context for-the-boys compose pull

sleep 15

docker --context for-the-boys compose --env-file ./.env up -d
