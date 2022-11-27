#!/usr/bin/env bash

name="zod"
snapshot="fresh-zod"

if [[ -n "$(command -v urbit)" ]]
then
  echo "Starting urbit via local binary at $(realpath $(which urbit))"
  mkdir -p data/urbit
  cd data/urbit
  if [[ -d "$snapshot" ]]
  then
    rm -rf "$name"
    cp -r "$snapshot" "$name"
    urbit zod
  else
    echo "Booting a new urbit, press ctrl-d immediately after it finishes booting then re-run this script to quickly restart from a fresh snapshot"
    urbit -F "$name" -c "$snapshot"
  fi
elif [[ -n "$(command -v docker)" ]]
then
  image="tloncorp/urbit:v1.12"
  echo "Starting urbit via docker image: $image"
  docker image pull "$image"
  docker run --interactive --tty --rm --name=fakezod "--mount=$(pwd)/data/urbit:/urbit" "--publish=8080:8080" "$image" --fake zod
fi
