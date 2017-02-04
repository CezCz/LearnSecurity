#!/bin/bash

echo "Step 2, man sl, sl [ -alFe ]"

if ! command -v foo >/dev/null 2>&1
then
  sudo apt-get install sl
fi
