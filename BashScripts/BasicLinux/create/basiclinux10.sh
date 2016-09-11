#!/bin/bash

echo "Step 10, grep /home/basiclinux/grep/B -e \"-2*2\""
mkdir -p ${homedir}grep
touch ${homedir}grep/B
for (( c=1; c<=3418; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/B
done
echo "-2*2=MathIsForMathematicans" >> ${homedir}grep/B
for (( c=1; c<=2541; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/B
done
