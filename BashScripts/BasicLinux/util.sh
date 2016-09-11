#!/bin/bash

function removeFile {
  if [ -e "$1" ]; then
    sudo rm -rf "$1"
  fi
}

function removeDir {
  if [ -e "$1" ] && [ ! $(ls -A "$1") ]; then
    sudo rm -rf "$1"
  fi
}

function removeAll {
  if [ -e "$1" ]; then
    sudo rm -rf "$1"
  fi
}

function printDot {
  num=$1
  if ! ((num%20)); then
    printf "."
  fi
}
