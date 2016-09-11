#!/bin/bash
. $DIR/util.sh

echo "Step 11, cat -n /home/basiclinux/grep/C | grep -e \"^\s*1800\""
sudo mkdir -p ${homedir}grep
sudo touch ${homedir}grep/C
for (( c=1; c<=1799; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/C > /dev/null
   printDot c
done
echo "BankOfFranceFounded" | sudo tee --append ${homedir}grep/C > /dev/null
for (( c=1; c<=831; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/C > /dev/null
   printDot c
done
