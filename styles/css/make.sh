#!/usr/bin/env bash

echo 
echo "Turn the Sass source into CSS and HTML documentation."
echo
echo "Needs a Markdown compiler; assumes commonmark, but edit"
echo "this script to set an alternative."
echo 
#
# first install npm with your OS's packagein installer, e.g: brew install node
# then install CommonMark:  npm install -g commonmark
# then install LESS compiler: npm install -g less
#

MD_COMPILE_COMMAND="commonmark"
LESS_COMPILE_COMMAND="lessc"
HTML_HEADER="./_includes/header.html"
HTML_FOOTER="./_includes/footer.html"

if [ $# -eq 0 ] || [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
  echo "make.sh - takes LESS source, compiles to CSS.  Also extracts commented"
  echo "lines and uses a Markdown compiler to make them into nice HTML."
  echo 
  echo "Specify input file as first argument.  Outputs CSS and HTML."
  echo "Example: ./build.sh styles.less"
  echo "         (reads styles.less, creates styles.less.css and styles.less.html)"
  exit 1
fi


##
## step 1: compile the less
##
"$LESS_COMPILE_COMMAND" "$1" >> "$1.css"


##
## step 2: extract Markdown comments
##

# use sed to...
#    keep lines that start  |   remove the two    >  save to md
#      with two slashes,    |   slashes           >  output file.
sed -n -e "/^\/\//p" < "$1" | sed -e "s/^\/\///"  >  "$1.md"

echo "wrote: $1.md"


##
## step 3: compile markdown
##
touch "$1.html"
cat "$HTML_HEADER" >> "$1.html"
"$MD_CONVERT_COMMAND" "$1.md" >> "$1.html"
cat "$HTML_FOOTER" >> "$1.html"

echo "wrote: $1.html"