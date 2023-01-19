#!/bin/bash

echo -n '📸 generating pages...'
python _scripts/photos_to_yaml.py && python _scripts/galleries_to_yaml.py
echo ' done!'