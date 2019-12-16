#!/bin/sh
read_var() {
  if [ -z "$1" ]; then
    echo "environment variable name is required" > /dev/stderr
    exit 1
  fi

  local ENV_FILE='.env'
  local VAR=$(grep $1 "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  if [ -z ${VAR[1]} ]; then
    echo "environment variable name $1 is required in .env" > /dev/stderr
    exit 1
  fi
  echo ${VAR[1]}
}

./cmd/compose.sh exec storage_mysql /usr/bin/mysqldump -u root --password=$(read_var MYSQL_ROOT_PASSWORD) --all-databases > ./storage_mysql/initdb/dump.sql
