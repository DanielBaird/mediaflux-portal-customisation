echo 'compiling CSS'

pushd components > /dev/null
lessc styles.less > styles.css
lessc styles-alt.less > styles-alt.css
popd > /dev/null

for SOURCE in *.source; do

	echo 'processing: ' $SOURCE

	cp $SOURCE $SOURCE.html.tmp

	pushd components > /dev/null

	echo '  - round 1'
	for COMPONENT in *.{html,css}; do
		echo '    - applying component: ' $COMPONENT
		awk "/^@$COMPONENT/{system(\"cat $COMPONENT\");next}1" ../$SOURCE.html.tmp > tmp
		mv tmp ../$SOURCE.html.tmp
	done

	echo '  - round 2'
	for COMPONENT in *.{html,css}; do
		echo '    - applying component: ' $COMPONENT
		awk "/^@$COMPONENT/{system(\"cat $COMPONENT\");next}1" ../$SOURCE.html.tmp > tmp
		mv tmp ../$SOURCE.html.tmp
	done

	popd > /dev/null

	cp $SOURCE.html.tmp $SOURCE.html

done
