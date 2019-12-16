#!/bin/sh
set -e

## This can't be done with user www-data and is obsolete regardless
## For production, app must be copied to /root/src
if [ ! -z "$(ls -A /root/. | grep src)" ]; then

  ## Using the condition with `-a` will evaluate it and throw an error
  ## Although the first condition fails. This way it won't throw errors
  cp -ru /root/src/* ${WORKDIR}/
  rm -rf /root/src

fi

npm install
npm run $@
