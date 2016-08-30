#!/usr/bin/env bash

# (assumes running from same location as package.json)

HTML_HEADER="styles/doc-includes/header.html"
HTML_FOOTER="styles/doc-includes/footer.html"
SOURCE="styles/sass/styles.scss"
CSSDEST="styles/css/styles.css"
DOCDEST="docs/styles.html"

## copy normalize.css
#
# unfortunately sass can't inline a plain css file, so as a
# preliminary step we have to copy the normalize.css file to 
# normalize.scss, so it gets inlined properly.
# the -n means don't overwrite an existing file.
cp -n node_modules/normalize.css/normalize.css styles/sass/normalize.scss


## actually do sass compilation
node-sass "$SOURCE" "$CSSDEST"


## turn the SCSS into Markdown
# use sed to:
#  - add four spaces to the start of any line that doesn't start with a slash
#  - remove any initial double slashes from the start of lines  
sed "s/^\([^\/]\)/    \1/" "$SOURCE" | sed "s/^\/\///" > "$SOURCE.md"


## compile Markdown
#
cat "$HTML_HEADER" > "$DOCDEST"
commonmark "$SOURCE.md" >> "$DOCDEST"
cat "$HTML_FOOTER" >> "$DOCDEST"







