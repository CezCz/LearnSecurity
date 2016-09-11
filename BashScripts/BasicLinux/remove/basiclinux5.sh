#!/bin/bash

echo "Step 5, ls list/pswd/privledges"
sudo rm "${homedir}list/pswd/privledges"

if [ -e ${homedir}list/pswd/privledges ] && ls -A ${homedir}list/pswd/privledges
then
  sudo rm -rf ${homedir}list/pswd
fi

if [ -e ${homedir}list/pswd/ ] && ls -A ${homedir}list/pswd/
then
  sudo rm -rf ${homedir}list/pswd
fi

if [ -e ${homedir}list ] && ls -A ${homedir}list
then
  sudo rm -rf ${homedir}list
fi
