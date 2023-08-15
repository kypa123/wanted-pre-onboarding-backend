#!/bin/sh

# 최초 빌드 시 npm run seed를 통해 더미데이터 insert
if [ ! -f ".seed_complete" ]; then
  npm run seed
  touch .seed_complete
fi

npm start
