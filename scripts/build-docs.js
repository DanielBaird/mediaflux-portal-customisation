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
var SOURCE='doc-source'
var DEST='docs'

//
// Markdown compilation
//

// make some markdown tools
var reader = new cm.Parser()
var writer = new cm.HtmlRenderer()

// for each markdown file..
var mdDocs = ls('-R', SOURCE + '/**/*.md')
var textInput = ''
var parsedInput = ''
var output = ''
var outFile = ''
mdDocs.forEach(function(mdFile) {
    console.log(mdFile)
    outFile = mdFile.replace(SOURCE + '/', DEST + '/')
    outFile = outFile.replace('.md','.html')
    // read in the md
    textInput = fs.readFileSync(mdFile, 'utf8')
    // process it to html
    parsedInput = reader.parse(textInput)
    output = writer.render(parsedInput)

    cp(HTML_HEADER, outFile)
    ShellString(output).toEnd(outFile)
    cat(HTML_FOOTER).toEnd(outFile)
})

exit()


// // read in the md
// var textInput = fs.readFileSync(markdown, 'utf8')
// // process it to html
// var parsedInput = reader.parse(textInput)
// var html = writer.render(parsedInput)

// // we're done with the temp markdown file now
// rm(markdown)

// // now build our doc..
// cp(HTML_HEADER, DOCDEST)
// ShellString(html).toEnd(DOCDEST)
// cat(HTML_FOOTER).toEnd(DOCDEST)


// // TODO: no need to keep this hack, remove it
// cp(CSSDEST, DOCDEST.replace('styles.html','cats.css'))
