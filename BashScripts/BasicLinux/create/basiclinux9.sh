#!/bin/bash
. $DIR/util.sh

echo "Step 9, grep /home/basiclinux/grep/A -e \"password\", it might take a while"
sudo mkdir -p ${homedir}grep
sudo touch ${homedir}grep/A
for (( c=1; c<=1268; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/A > /dev/null
   printDot c
done
echo "password:ImagineScrollingThat" | sudo tee ${homedir}grep/A > /dev/null
for (( c=1; c<=2103; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/A > /dev/null
   printDot c
done
