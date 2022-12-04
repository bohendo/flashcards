#!/usr/bin/env bash

root=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
data="$root/data"
name="zod"
fresh="fresh"
reset="${2:-"false"}" # or "true" to reset all persistent data to fresh state

if [[ "$1" == "--reset" ]]
then reset="true"
fi

if [[ -n "$(command -v urbit)" ]]
then
  echo "Starting urbit via local binary at $(realpath $(which urbit))"
  mkdir -p "$data"
  cd "$data"
  if [[ -d "$fresh" ]]
  then
    if [[ "$reset" == "true" ]]
    then
      echo "Deleting all data for $name"
      sleep 3 # give user a sec to ctrl-c if this was a mistake
      rm -rfv "$name"
      cp -r "$fresh" "$name"
    fi
    urbit zod
  else
    echo "Booting a new urbit to use as a quick-start fresh.."
    echo "Once this ship boots, run the following commands then hit ctrl-d to exit the console"
    echo "~zod:dojo> |mount %base" # generic boilerplate (like what you get after `git init`)
    echo "~zod:dojo> |mount %garden" # this desk serves landscape so the server I guess?
    echo "~zod:dojo> |mount %landscape" # landscape gui I think
    echo "~zod:dojo> |mount %bitcoin" # bitcoin wallet app
    echo "~zod:dojo> |mount %webterm" # in-browser dojo terminal app
    echo "~zod:dojo> <ctrl-d>"
    echo "Then, re-run this script to start a fresh zod ship from the generated fresh"
    echo
    sleep 3 # give the user a sec to read the message above
    urbit -F "$name" -c "$fresh" # warning: takes ~2 minutes & lots of cpu
  fi

elif [[ -n "$(command -v docker)" ]]
then
  image="tloncorp/urbit:v1.12"
  echo "Starting urbit via docker image: $image"
  # docker image pull "$image"
  docker run --interactive --tty --rm --name=fakezod "--mount=type=bind,src=$data,dst=/urbit" "--publish=8080:80" "$image" urbit zod

else
  echo "Neither urbit nor docker is installed, can't start a fake ship" && exit 1
fi
