#!/bin/bash

echo "Step 6, cat cat/pass"
sudo mkdir -p ${homedir}cat/pass
echo "cat_in_boots" | sudo tee ${homedir}cat/pass/pass > /dev/null
