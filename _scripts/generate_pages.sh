#!/bin/bash

echo -n '📸 generating pages ...'
python _scripts/photos_to_yaml.py
echo -n '.'
python _scripts/galleries_to_yaml.py
echo -n '.'
python _scripts/guides_to_yaml.py
echo -n '.'
python _scripts/generate_metadata.py
echo ' done!'