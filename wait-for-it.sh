#!/usr/bin/env bash
# Use this script to wait for a service to be ready

set -e

TIMEOUT=15
STRICT=false
HOST="database"
PORT="5432"

usage() {
  echo "Usage: $0 host:port [-t timeout] [--strict]"
  exit 1
}

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -t|--timeout)
    TIMEOUT="$2"
    shift # past argument
    shift # past value
    ;;
    --strict)
    STRICT=true
    shift # past argument
    ;;
    *)
    # default case: it could be the host:port argument
    HOSTPORT="$1"
    shift # past argument
    ;;
esac
done

if [[ -z "$HOSTPORT" ]]; then
    usage
fi

HOST=$(echo $HOSTPORT | cut -d: -f1)
PORT=$(echo $HOSTPORT | cut -d: -f2)

for i in `seq $TIMEOUT` ; do
  nc -z "$HOST" "$PORT" >/dev/null 2>&1
  result=$?
  if [[ $result -eq 0 ]]; then
    exit 0
  fi
  sleep 1
done

if $STRICT; then
  echo "Timeout occurred, PostgreSQL is not ready after $TIMEOUT seconds"
  exit 1
fi

exit 0
