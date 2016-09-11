#!/bin/bash

echo "Step 6, cat cat/pass"
if [ -e ${homedir}cat/pass/pass ]
then
  sudo rm ${homedir}cat/pass/pass > /dev/null
fi

if [ -e ${homedir}cat/pass ] && ls -A ${homedir}cat/pass
then
  sudo rm -rf ${homedir}cat/pass
fi
