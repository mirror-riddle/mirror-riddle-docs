#! /usr/bin/env bash

git pull
yarn build
sudo rm -r /data/www/mirror-riddle-docs
sudo cp -r build /data/www/mirror-riddle-docs
