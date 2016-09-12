#!/usr/bin/env node
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

// the "second line shebang" bit above will work if bash tries 
// executing this script.

// this is basically a lightly rewritten shell script.  It
// uses shellJS to replace all the shell commands.
require('shelljs/global')

// ..except for node-sass and commonmark
var sass = require('node-sass')
var cm = require('commonmark')

var fs = require('fs')

// (assumes running from same location as package.json)
var HTML_HEADER='styles/doc-includes/header.html'
var HTML_FOOTER='styles/doc-includes/footer.html'
var SOURCE='styles/sass/styles.scss'
var CSSDEST='styles/css/styles.css'
var DOCDEST='docs/styles.html'

// copy normalize.css into place
//
//  unfortunately sass can't inline a plain css file, so as a
//  preliminary step we have to copy the normalize.css file to 
//  normalize.scss, so it gets inlined properly.
//  The -n means don't overwrite an existing file.
cp('-n', 'node_modules/normalize.css/normalize.css', 'styles/sass/normalize.scss')

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
sed('-i', '^([^\/])', '    $1', markdown) // in js replace(), $1 is a backreference 
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




