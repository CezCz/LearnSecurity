#!/bin/bash

echo "Step 7, cat cat/pass"
mkdir -p ${homedir}cat/A/pass
mkdir -p ${homedir}cat/B/pass
mkdir -p ${homedir}cat/C/pass
printf "conc" > ${homedir}cat/A/pass
printf "aten" > ${homedir}cat/A/pass
printf "ate\n" > ${homedir}cat/A/pass
