#!/usr/bin/env bash

docker buildx build \
  --tag registry.digitalocean.com/mikes-images/dj-jimmy:latest \
  --platform linux/amd64 \
  --builder for-the-boys-builder \
  --push .
