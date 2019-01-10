#!/bin/bash

PKG_VERSION=`node -p "require('./package.json').version"`

# compile files
rm -rf ./dist

npm run compile

#
(cd ./releases && tar -cvzf "shel-core-${PKG_VERSION}.tar.gz" ../dist)





