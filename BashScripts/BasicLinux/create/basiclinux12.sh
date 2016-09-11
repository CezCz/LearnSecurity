#!/bin/bash
. $DIR/util.sh

echo "Step 12, grep /home/basiclinux/grep/D -e \"^*.*;$"
sudo mkdir -p ${homedir}grep
sudo touch ${homedir}grep/D
for (( c=1; c<=1204; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/D > /dev/null
   printDot c
done
echo "*int magic = 2321;" | sudo tee --append ${homedir}grep/D > /dev/null
for (( c=1; c<=2156; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/D > /dev/null
   printDot c
done
