#!/usr/bin/env node
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

// the "second line shebang" bit above will work if bash tries 
// executing this script.

// this is basically a lightly rewritten shell script.  It
// uses shellJS to replace all the shell commands.
require('shelljs/global')
var fs = require('fs')

var baseDir = 'sample-html/'
var componentDir = baseDir + 'components/'

// list every *.source file in the html directory
var sourceFiles = ls(baseDir + '*.source')

// list every component file in the html/components directory
var compFiles = ls(componentDir + '*.html')

var tempResult = ''
var newTempResult = ''
var cmpContent = ''
var cmpName = ''
sourceFiles.forEach(function(srcFile) {
    process.stdout.write('processing ' + srcFile + '\n    ')

    newTempResult = fs.readFileSync(srcFile, 'utf8')

    do {
        tempResult = newTempResult
        process.stdout.write(' ')
        // apply each component to the newTempResult
        compFiles.forEach(function(cmpFile) {
            // get the filename
            cmpName = cmpFile.split('/').reverse()[0]
            process.stdout.write('.')
            cmpContent = fs.readFileSync(cmpFile, 'utf8')
            // find lines that start with a @, followed by this
            // component's filename, and nothing else
            var regex = RegExp('^@' + cmpName + '\\s*$', 'gm')
            newTempResult = newTempResult.replace(regex, '\n' + cmpContent + '\n')
        })
    } while (newTempResult !== tempResult)
    process.stdout.write('\n')

    // by now the newTempResult is the resolved content,
    // so write it out.
    fs.writeFileSync(srcFile + '.html', newTempResult);

})


/*

for SOURCE in *.source; do

	echo 'Processing' $SOURCE

	cp $SOURCE $SOURCE.html.tmp

	echo   "  - copying"
	pushd components > /dev/null

	printf "  - applying components: round"

	for i in `seq 1 6`; do
		printf " $i."
		for COMPONENT in *.{html,css}; do
			printf "."
			awk "/^@$COMPONENT/{system(\"cat $COMPONENT\");next}1" ../$SOURCE.html.tmp > tmp
			mv tmp ../$SOURCE.html.tmp
		done
	done
	echo

	popd > /dev/null

	echo   "  - finishing"
	mv $SOURCE.html.tmp $SOURCE.html

	echo
done

*/