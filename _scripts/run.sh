#!/bin/bash

# Minify JS
echo '📸 minifying js ...'
rm js/board-min.js && uglifyjs js/board.js >> js/board-min.js
rm js/plugins-min.js && uglifyjs js/plugins/*.js >> js/plugins-min.js

# Download Database
echo '📸 downloading data ...'
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=0" -O "_data/photos.csv"
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=1653272967" -O "_data/galleries.csv"

# Generate Pages
echo '📸 generating pages ...'
python _scripts/photos_to_yaml.py && python _scripts/galleries_to_yaml.py

# Serve Website
echo '📸 serving website ...'
bundle exec jekyll serve