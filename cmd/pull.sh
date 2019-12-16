#!/bin/sh

docker images \
  --filter=reference='registry.caffeina.co/devops/nador-images/*/*/*:latest' \
  | grep -v REPOSITORY \
  | awk '{print $1}' \
  | xargs -L1 docker pull
