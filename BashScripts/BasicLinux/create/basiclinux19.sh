#!/bin/bash

echo "Step 19, rot3 cat cat filter/B | cut -d\"|\" -f3 | tr -d \"\\n\" | tr \"[A-Za-z]\" \"[X-ZA-Wx-za-w]\" "
sudo mkdir -p ${homedir}filter
sudo touch ${homedir}filter/B

passphrase='CaesarCipher'
encoded=$(printf $passphrase | tr '[A-Za-z]' '[D-ZA-Cd-za-c]')
length=$(printf $encoded | wc -c)
delimiter="|"

for ((counter=0; counter<length; counter++))
do
  for((column=0; column<5;column++))
  do
    if [ $column -eq 2 ]
    then
      printf ${encoded:$counter:1}$delimiter | sudo tee --append ${homedir}filter/B > /dev/null
    else
      printf $(cat /dev/urandom | tr -dc 'a-zA-Z' | fold -w 1 | head -n 1)$delimiter | sudo tee --append ${homedir}filter/B > /dev/null
    fi
  done
  printf "\n" | sudo tee --append ${homedir}filter/B > /dev/null
done
