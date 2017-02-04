#!/bin/bash
. $DIR/util.sh

echo "Step 14, head -1703 ~/headtail/B | tail -14 "
sudo mkdir -p ${homedir}headtail
sudo touch ${homedir}headtail/B

for (( c=1; c<=1689; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}headtail/B > /dev/null
   printDot c
done
printf "B\nE\nT\nA\nG\nA\nM\nM\nA\nD\nE\nL\nT\nA\n" |  sudo tee --append ${homedir}headtail/B > /dev/null
for (( c=1; c<=869; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}headtail/B > /dev/null
   printDot c
done
