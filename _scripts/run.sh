#!/bin/bash

# Minify

echo -n '📸 minifying js ...'
rm js/board-min.js && uglifyjs js/board.js >>js/board-min.js
echo -n '.'
rm js/plugins-min.js && uglifyjs js/plugins/*.js >>js/plugins-min.js
echo ' done!'

# Generate Pages

echo -n '📸 generating pages ...'
python _scripts/photos_to_yaml.py
echo -n '.'
python _scripts/galleries_to_yaml.py
echo -n '.'
python _scripts/guides_to_yaml.py
echo -n '.'
python _scripts/generate_metadata.py
echo ' done!'

echo '📸 serving website ...'
bundle exec jekyll serve
