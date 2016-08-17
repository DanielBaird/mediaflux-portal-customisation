echo 'compiling CSS'

cd /home/barry/Public/jcu/mediaflux-portal-customisation/sample-html
pushd components > /dev/null
lessc styles.less > styles.css
lessc styles-alt.less > styles-alt.css
popd > /dev/null

for SOURCE in *.source; do

	echo 'processing: ' $SOURCE

	cp $SOURCE $SOURCE.html.tmp

	pushd components > /dev/null

	for i in `seq 1 6`; do
	echo "  - round $i"
	for COMPONENT in *.{html,css}; do
		echo '    - applying component: ' $COMPONENT
		awk "/^@$COMPONENT/{system(\"cat $COMPONENT\");next}1" ../$SOURCE.html.tmp > tmp
		mv tmp ../$SOURCE.html.tmp
	done
	done

	popd > /dev/null

	cp $SOURCE.html.tmp $SOURCE.html

done

