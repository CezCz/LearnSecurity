#!/bin/bash

echo "Step 18, uniq filter/A | wc -l"
mkdir -p ${homedir}filter
touch ${homedir}filter/A

leet=0
while [ $leet -lt 1337 ]
do
  line=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1)
  if ! grep ${homedir}filter/A -e "$line"
  then
    for ((counter=0; counter<$(($RANDOM%10 + 1)); counter++))
    do
      printf "$line\n" >> ${homedir}filter/A
    done
    leet=$[$leet+1]
  fi
done
