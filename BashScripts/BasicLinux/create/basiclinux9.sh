#!/bin/bash

echo "Step 9, grep /home/basiclinux/grep/A -e \"password\""
mkdir -p ${homedir}grep
touch ${homedir}grep/A
for (( c=1; c<=1268; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/A
done
echo "password:ImagineScrollingThat" >> ${homedir}grep/A
for (( c=1; c<=2103; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/A
done
