#!/bin/bash

echo "Step 4, remove list/pswd/.password:hiddencontent"
sudo rm -f "${homedir}list/pswd/.password:listcontent"

if [ -e ${homedir}list/pswd/ ] && ls -A ${homedir}list/pswd/
then
  sudo rm -rf ${homedir}list/pswd
fi

if [ -e ${homedir}list ] && ls -A ${homedir}list
then
  sudo rm -rf ${homedir}list
fi
