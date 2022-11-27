#!/usr/bin/env bash

if [[ -n "$(command -v urbit)" ]]
then
  echo "Starting urbit via local binary at $(realpath $(which urbit))"
  mkdir -p data/urbit
  cd data/urbit
  urbit -F zod
elif [[ -n "$(command -v docker)" ]]
then
  image="tloncorp/urbit:v1.12"
  echo "Starting urbit via docker image: $image"
  docker image pull "$image"
  docker run --interactive --tty --rm --name=fakezod "--mount=$(pwd)/data/urbit:/urbit" "--publish=8080:8080" "$image" --fake zod
fi
