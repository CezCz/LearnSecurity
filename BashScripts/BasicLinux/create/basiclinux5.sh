#!/bin/bash

echo "Step 5, ls -l list/privledges -rw-r-----"
sudo mkdir -p "${homedir}list"
sudo touch "${homedir}list/privledges"
sudo chmod 640 "${homedir}list/privledges"
