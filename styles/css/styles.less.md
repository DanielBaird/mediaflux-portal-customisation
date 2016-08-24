 ## About this document #######################################
 ...um
 ## Variables #################################################
 ...um
 ## Setting sane defaults #####################################
 #### Box sizing
 Set box-sizing to border-box at the html level, and tells
 everything else to inherit.  This approach is discussed here:
 https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
 A simple explanation of box sizing: https://css-tricks.com/box-sizing/
 #### Margin and padding
 Set all margins and padding to 0. "Default" margins is a
 common source of surprising gaps in your page layout.
 #### Font size and weight
 Set the font size and weight on the html tag, and set
 everything else to inherit from its parent.
 This will take away the bold on headings, and sets the font
 size for headings and form elements.
 The font size of subscript and superscript text just got set
 to inherit; restore the expected smaller size for those tags.
