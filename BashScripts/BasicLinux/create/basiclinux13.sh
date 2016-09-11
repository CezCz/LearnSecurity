#!/bin/bash
. $DIR/util.sh

echo "Step 13, head -1 headtail/A && tail -1 headtail/A"
sudo mkdir -p ${homedir}headtail
sudo touch ${homedir}headtail/A

echo "alpha" | sudo tee --append ${homedir}headtail/A > /dev/null
for (( c=1; c<=1845; c++ ))
do
   echo `cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(shuf -i 16-64 -n 1) | head -n 1` | sudo tee --append ${homedir}headtail/A > /dev/null
   printDot c
done
echo "omega" | sudo tee --append ${homedir}headtail/A > /dev/null
