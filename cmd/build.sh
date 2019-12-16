#!/bin/sh

./cmd/pull.sh

./cmd/base.sh \
  -f ./docker/build.yml \
  $@ build
