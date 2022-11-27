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
    echo "Booting a new urbit to use as a quick-start snapshot.."
    echo "Once this ship boots, run the following commands then hit ctrl-d to exit the console"
    echo "~zod:dojo> |mount %base" # generic boilerplate (like what you get after `git init`)
    echo "~zod:dojo> |mount %garden" # landscape server
    echo "~zod:dojo> |mount %landscape" # landscape gui
    echo "~zod:dojo> |mount %bitcoin" # bitcoin wallet app
    echo "~zod:dojo> |mount %webterm" # in-browser dojo terminal app
    echo "~zod:dojo> <ctrl-d>"
    echo "Then, re-run this script to start a fresh zod ship from the generated snapshot"
    echo
    sleep 3 # give the user a sec to read the message above
    urbit -F "$name" -c "$snapshot" # warning: takes ~2 minutes & lots of cpu
  fi
elif [[ -n "$(command -v docker)" ]]
then
  image="tloncorp/urbit:v1.12"
  echo "Starting urbit via docker image: $image"
  docker image pull "$image"
  docker run --interactive --tty --rm --name=fakezod "--mount=$(pwd)/data/urbit:/urbit" "--publish=8080:8080" "$image" --fake zod
fi
