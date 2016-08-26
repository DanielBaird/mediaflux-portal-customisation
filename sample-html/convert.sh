
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

