#!/usr/bin/env bash

root=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
base="$root/data/zod/base"

prefixes=(
  "|"
  "$"
  "%"
  ":"
  "."
  "-"
  "="
  "^"
  "~"
  ";"
  "?"
  "!"
  "/"
  "+"
);

suffixes=(
  "!"
  "#"
  "$"
  "%"
  "&"
  "*"
  "+"
  ","
  "-"
  "."
  "/"
  ":"
  ";"
  "<"
  "="
  ">"
  "?"
  "@"
  "^"
  "_"
  "|"
  "~"
);

to_escape=(
  "*"
  "?"
);

function esc {
  symbol="$1" # prefix or suffix
  if grep -q "$symbol" <<<"${to_escape[*]}"
  then echo "\\$symbol"
  else echo "$symbol"
  fi
}

if [[ -d "$base" ]]
then
  for pref in "${prefixes[@]}"
  do
    for suff in "${suffixes[@]}"
    do
      rune="$pref$suff"
      freq="$(grep --recursive --fixed-strings -- "$rune" $base/**/*.hoon | wc -l)"
      echo "$freq $rune"
    done
  done | sort -nr | sed '/^0/d'
fi
