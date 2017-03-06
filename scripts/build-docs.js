#!/usr/bin/env node
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

// the "second line shebang" bit above will work if bash tries 
// executing this script.

// use shelljs for command line things
require('shelljs/global')

// ..except for commonmark
var cm = require('commonmark')

var fs = require('fs')

// (assumes running from same location as package.json)
var HTML_HEADER='doc-source/doc-includes/header.html'
var HTML_FOOTER='doc-source/doc-includes/footer.html'
var MD_SOURCE='doc-source'
var STATIC_SOURCE='doc-source/static'
var DEST='docs'

//
// Markdown compilation
//

// make some markdown tools
var reader = new cm.Parser()
var writer = new cm.HtmlRenderer()

// for each markdown file..
var mdDocs = ls('-R', MD_SOURCE + '/**/*.md')
var textInput = ''
var parsedInput = ''
var output = ''
var outFile = ''
mdDocs.forEach(function(mdFile) {
    outFile = mdFile.replace(MD_SOURCE + '/', DEST + '/')
    outFile = outFile.replace('.md','.html')
    // read in the md
    textInput = fs.readFileSync(mdFile, 'utf8')
    // process it to html
    parsedInput = reader.parse(textInput)
    output = writer.render(parsedInput)

    cp(HTML_HEADER, outFile)
    ShellString(output).toEnd(outFile)
    cat(HTML_FOOTER).toEnd(outFile)
    console.log(mdFile)
})

//
// Make the graphviz diagram of colour dependencies
//

// TODO
// compile the .dot file in doc-source into an SVG, and work out where to link it
// e.g once you have GraphViz installed:
//     dot -O -Tpng colourlinks.dot
// ..will produce colourlinks.dot.png, and
//     dot -O -Tsvg colourlinks.dot
// ..will produce colourlinks.dot.svg
console.log('Remember to come back to this and add GraphViz diagram compilation!')


// also copy any static doc stuff into the doc dir
cp('-R', STATIC_SOURCE + '/*', DEST)

exit()

