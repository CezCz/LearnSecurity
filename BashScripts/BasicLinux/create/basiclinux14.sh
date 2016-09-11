#!/bin/bash

echo "Step 14, cat headtail/A | head -1704 | tail -14 "
mkdir -p ${homedir}headtail
touch ${homedir}headtail/A

for (( c=1; c<=1689; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/A
done
printf "B\n
E\n
T\n
A\n
G\n
A\n
M\n
M\n
A\n
D\n
E\n
L\n
T\n
A\n"
for (( c=1; c<=869; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` >> ${homedir}grep/A
done
