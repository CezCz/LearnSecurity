#!/bin/bash

echo "Step 7, cat cat/pass"
sudo mkdir -p ${homedir}cat/A
sudo mkdir -p ${homedir}cat/B
sudo mkdir -p ${homedir}cat/C
printf "conc" | sudo tee ${homedir}cat/A/pass > /dev/null
printf "aten" | sudo tee ${homedir}cat/B/pass > /dev/null
printf "ate\n" | sudo tee ${homedir}cat/C/pass > /dev/null
