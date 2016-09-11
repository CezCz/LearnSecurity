#!/bin/bash

echo "Step 5, ls -l list/pswd/privledges -rw-r-----"
sudo mkdir -p "${homedir}list/pswd"
sudo touch "${homedir}list/pswd/privledges"
sudo chmod 640 "${homedir}list/pswd/privledges"
