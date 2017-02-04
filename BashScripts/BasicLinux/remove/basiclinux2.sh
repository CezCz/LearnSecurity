#!/bin/bash

echo "Removing, Step 2, Deleting sl program from filesystem"

if command -v foo >/dev/null 2>&1
then
  sudo apt-get remove sl
fi
