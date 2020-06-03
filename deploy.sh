#! /usr/bin/env bash

docsPath="/data/www/mirror-riddle-docs"

echo "-------------git pull------------"
git pull
echo "-------------yarn buid-----------"
yarn build
echo "-------------replace statics-----"
sudo rm -r $docsPath
sudo cp -r build $docsPath
