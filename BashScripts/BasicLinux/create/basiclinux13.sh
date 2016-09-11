#!/bin/bash

echo "Step 13, cat headtail/file "
mkdir -p ${homedir}headtail
touch ${homedir}headtail/A

echo "alpha" >> ${homedir}headtail/A
for (( c=1; c<=1845; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/A
done
echo "omega" >> ${homedir}headtail/A
