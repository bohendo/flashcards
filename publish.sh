#!/usr/bin/env bash


file="$1"
url="$2"

if [[ -z "$file" || -z "$url" ]]
then echo "provide the file to upload as the 1st arg & the url to upload to as the 2nd arg"
fi

if [[ ! -f "$file" ]]
then echo "File does not exist at $file"
fi

echo "Uploading file at $file to url $url"
echo
echo curl --request POST --header 'content-type: application/octet-stream' --upload-file $file $url
echo
sleep 2 # give the user a sec to ctrl-c if the above doesn't look right

curl --request POST --header 'content-type: application/octet-stream' --upload-file "$file" "$url"
