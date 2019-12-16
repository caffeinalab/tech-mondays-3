#!/bin/sh
LETSENCRYPT_HOST=letsencrypt \
LETSENCRYPT_EMAIL=letsencrypt \
CI_REGISTRY=localhost \
CI_COMMIT_REF_NAME=development \
CI_PROJECT_PATH=tech-mondays-3 \
COMPOSE_PROJECT_NAME=tech-mondays-3 \
VIRTUAL_HOST=tech-mondays-3 \
docker-compose \
  $@
