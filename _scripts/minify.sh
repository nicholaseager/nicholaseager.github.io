#!/bin/bash

echo -n '📸 minifying js ... '
rm js/board-min.js && uglifyjs js/board.js >> js/board-min.js
rm js/plugins-min.js && uglifyjs js/plugins/*.js >> js/plugins-min.js
echo 'done!'