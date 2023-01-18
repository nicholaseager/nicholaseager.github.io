#!/bin/bash

rm js/board-min.js && uglifyjs js/board.js >> js/board-min.js
rm js/plugins-min.js && uglifyjs js/plugins/*.js >> js/plugins-min.js
python _scripts/photos_to_yaml.py &&
bundle exec jekyll serve