#!/bin/bash

echo -n '📸 downloading database ...'
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=0" -O "_data/photos.csv"
echo -n '.'
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=1653272967" -O "_data/galleries.csv"
echo -n '.'
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=1477561361" -O "_data/gear.csv"
echo -n '.'
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=1788831756" -O "_data/testimonials.csv"
echo -n '.'
wget --quiet "https://docs.google.com/spreadsheets/d/180-UYA8NahsW9S2zW0tsEhek75cd4Q2MDrFnTFeT9Dg/export?format=csv&gid=1937712754" -O "_data/films.csv"
echo -n '.'
echo ' done!'
