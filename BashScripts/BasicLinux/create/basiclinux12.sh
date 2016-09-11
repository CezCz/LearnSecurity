#!/bin/bash

echo "Step 12, grep -e \"^*.*;$\""
mkdir -p ${homedir}grep
touch ${homedir}grep/C
for (( c=1; c<=1204; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/C
done
echo "*int magic = 2321;" >> ${homedir}grep/C
for (( c=1; c<=2156; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/C
done
