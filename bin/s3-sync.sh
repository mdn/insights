#!/bin/bash

if [[ -z "$1" ]]; then
    echo "Bucket name required"
    exit 1
fi

CACHE="--cache-control max-age=2629800" # 1 month
ARGS="--acl public-read --delete ${@:2}"

echo "Copying dist folder to $1"
aws s3 sync dist/ s3://$1/ ${CACHE} ${ARGS}
