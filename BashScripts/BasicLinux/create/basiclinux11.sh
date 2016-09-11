#!/bin/bash

echo "Step 11, cat -n /home/basiclinux/grep/C | grep -e \"^\s*1800\""
mkdir -p ${homedir}grep
touch ${homedir}grep/C
for (( c=1; c<=1799; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/B
done
echo "BankOfFranceFounded" >> ${homedir}grep/B
for (( c=1; c<=831; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/B
done
