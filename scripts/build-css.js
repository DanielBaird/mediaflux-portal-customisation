#!/usr/bin/env node
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

// the "second line shebang" bit above will work if bash tries 
// executing this script.

// this is basically a lightly rewritten shell script.  It
// uses shellJS to replace all the shell commands.
require('shelljs/global')

// ..except for node-sass and commonmark which are a bit harder
// to find paths for, so for the sass and markdown stuff this
// script uses the JS libraries directly.
var sass = require('node-sass')
var cm = require('commonmark')

var fs = require('fs')

// assume this script is running from same place as package.json
var HTML_HEADER='doc-source/doc-includes/header.html'
var HTML_FOOTER='doc-source/doc-includes/footer.html'
var SOURCE='styles/sass/styles.scss'
var CSSDEST='styles/css/styles.css'
var DOCDEST='docs/styles.html'

// Copying normalize.css is no longer needed, as normalize has
// been directly included in the Sass source file.
// // copy normalize.css into place
// //
// //  unfortunately sass can't inline a plain css file, so as a
// //  preliminary step we have to copy the normalize.css file to 
// //  normalize.scss, so it gets inlined properly.
// //  The -n means don't overwrite an existing file.
// cp('-n', 'node_modules/normalize.css/normalize.css', 'styles/sass/normalize.scss')

//
// Sass SCSS compilation
//
var result = sass.renderSync({ file: SOURCE })
var css = result.css.toString('utf8')
// write the css to our output file
ShellString(css).to(CSSDEST)

//
// Markdown compilation
//

// starting with the source, use sed to make a temp markdown file:
//   - add four spaces to the start of any line that doesn't start with a slash
//   - remove any initial double slashes from the start of lines  
cp(SOURCE, SOURCE + '.md')
var markdown = find(SOURCE + '.md')[0]
// find lines starting with a character that isn't a forward
// slash, and insert four spaces at the start of the line.
sed('-i', '^([^\/])', '    $1', markdown) // in js replace(), $1 is a backreference 
// find lines starting with two forward slashes, and remove 
// the slashes.
sed('-i', '^\/\/', '', markdown)

// make some markdown tools
var reader = new cm.Parser()
var writer = new cm.HtmlRenderer()
// read in the md
var textInput = fs.readFileSync(markdown, 'utf8')
// process it to html
var parsedInput = reader.parse(textInput)
var html = writer.render(parsedInput)

// we're done with the temp markdown file now
rm(markdown)

// now build our doc..
cp(HTML_HEADER, DOCDEST)
ShellString(html).toEnd(DOCDEST)
cat(HTML_FOOTER).toEnd(DOCDEST)


// TODO: no need to keep this hack, remove it
cp(CSSDEST, DOCDEST.replace('styles.html','cats.css'))
