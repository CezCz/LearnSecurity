#!/bin/bash

echo "Step 3, removing /home/basiclinux/list/pswd//pass word:listcontent from filesystem"
sudo rm -f "${homedir}list/pswd/pass word:listcontent"

if [ -e ${homedir}list/pswd/ ] && ls -A ${homedir}list/pswd/
then
  sudo rm -rf ${homedir}list/pswd
fi

if [ -e ${homedir}list ] && ls -A ${homedir}list
then
  sudo rm -rf ${homedir}list
fi
