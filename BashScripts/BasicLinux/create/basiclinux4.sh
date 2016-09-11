#!/bin/bash

echo "Step 4, ls list/pswd/.password:hiddencontent"
sudo mkdir -p "${homedir}list/pswd"
sudo touch "${homedir}list/pswd/.password:listcontent"
