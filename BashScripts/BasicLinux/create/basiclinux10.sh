#!/bin/bash
. $DIR/util.sh

echo "Step 10, grep /home/basiclinux/grep/B -e \"-2\\*2\""
sudo mkdir -p ${homedir}grep
sudo touch ${homedir}grep/B
for (( c=1; c<=3418; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/B > /dev/null
   printDot c
done
echo "-2*2=MathIsForMathematicans" | sudo tee --append ${homedir}grep/B > /dev/null
for (( c=1; c<=2541; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}grep/B > /dev/null
   printDot c
done
