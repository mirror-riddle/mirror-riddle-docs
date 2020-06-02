#! /usr/bin/env bash

yarn build
tar -czf build.tar.gz build
scp build.tar.gz mirror-riddle.xyz:/tmp
rm build.tar.gz
ssh -t mirror-riddle.xyz 'cd /tmp; tar -xzf build.tar.gz; sudo rm -r /data/www/mirror-riddle-docs; sudo mv build /data/www/mirror-riddle-docs'
