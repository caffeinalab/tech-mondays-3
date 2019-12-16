#!/bin/sh

if [[ $@ == *"--build"* ]]; then
  ./cmd/pull.sh
fi

./cmd/compose.sh up $@
