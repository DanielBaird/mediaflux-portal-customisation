
 # Styling a MediaFlux portal


 ## About this document #######################################

 #### Purpose

 This document describes the default web style applied to
 Mediaflux portals, and serves as a springboard for modifying
 the styles to produce unique portal experiences.

 Light modification is possible by changing colour and size 
 settings, and enough instruction is also provided for someone
 with some web design skills to perform deeper customisations.

 #### Audience

 Generally this document assumes you're familiar with the 
 basics of CSS and the HTML Document Object Model.  If you 
 learned HTML and CSS a while ago, an appendix at the end of 
 this document will give you a quick overview of the more 
 modern CSS used in this document.

 TODO: add appendix; get someone to look through and highlight
 anything they aren't too sure on; document in appendix.

 #### Source

 This document is written in a "literate" style, where the 
 source document is both live Sass/SCSS source that produces 
 the CSS, and a Markdown-formatted document describing the
 code.

 The source document is already valid SCSS, so CSS is produced
 by running it through the Sass compiler.

     /*
    The original source of the text you're reading is a SCSS formatted 
    file.  SCSS is a superset of CSS; it allows all valid CSS, but in 
    addition allows for a number of variables calculations that are 
    resolved by the SCSS compiler and turned into valid CSS.

    To alter the CSS, you should edit the SCSS source file and 
    recompile.  Visit the website:
    https://github.com/DanielBaird/mediaflux-portal-customisation
    for more information.
     */

 (The text above will be included in the output CSS to inform
 anyone browsing the CSS about the SCSS source.)

 The source is then transformed with a short shell script,
 which does two things:
 
 * finds lines starting with `//`, and removes those two 
   initial characters;
 * indents all other lines by four spaces.

 These two transformations produce a Markdown document which is
 then converted into a HTML document with a Markdown processor.

 ## Variables #################################################

 Much simple customisation of portal sites can be achieved by
 editing variables in this section.

 #### Overall page level variables

 Default the general page colours to to white background and 
 dark text (not quite black, to avoid harsh contrast).

    $page-background: #fff;
    $page-color: #333;

 when printing, reset text to black to avoid the blurry 
 "process" grey many printers use.

    $page-print-background: $page-background;
    $page-print-color: #000;

 The maximum width of the main content column is defined here
 as 60 root ems wide, which is roughly 120-150 letters.

    $column-max-width: 60rem;

 The standard background and text colour for the main content
 column.

    $content-background: #fff;
    $content-color: #000;

 Choose a shading colour for doing subtle shading within the
 content area (this is used for source code, blockquotes, etc) 
    $content-shading: transparentize($content-color, 0.95);

 #### Header related variables

 The height of the page header and the size of the heading 
 inside the page header.  If you update these values, make 
 sure the `$header-height` value is larger than the 
 `$header-text-size` value.

    $header-height: calc(3rem + 5vw);
    $header-text-size: calc(1rem + 1vw);

 Header colors

    $header-background: linear-gradient(to top, #000, #444);
    $header-content-color: red;

 It's preferable to use a vector format 
 like SVG for your site logo, but if you're using a pixel 
 format logo that you prefer doesn't get resized, set the
 `$resizeable-logo` variable to `false` and specify your logo
 size in the `$logo-height` and `$logo-width` variables.

 If `$resizeable-logo` is set to `true`, the logo will be 
 sized according to the header. 

    $resizable-logo: true;
    $logo-height: 65px;
    $logo-width: 65px;

 The height of the main navigation bar is set here using `rem`
 units, which are proportional to the standard text size.

    $navbar-height: 3rem;
    $navbar-text-size: 1rem;

 Navbar items have three states: normal, selected (the one 
 that matches the current content), and highlighted (for
 when the user's mouse is hovering over it).

    $navbar-background: #fcc;
    $navbar-content-color: #060;

    $navbar-highlight-background: $navbar-content-color;
    $navbar-highlight-content-color: $navbar-background;

    $navbar-current-background: $content-background;
    $navbar-current-content-color: $content-color;

 The size and colour of the page footer.

    $footer-height: 3rem;
    $footer-text-size: 1rem;

    $footer-background: $page-background;
    $footer-content-color: $page-color; 

 If you set `footer-fade` to true, the footer will appear 
 faded until the user hovers over it with their mouse.  This
 helps to reduce the visual clutter of the footer. Note however
 that mouse hover won't work on touch screens without a mouse,
 so choose colours with readable contrast even when faded to
 half opacity.

 Disable fade by setting this variable to `false`.

    $footer-fade: true;


 ## Setting sane defaults #####################################

 Web browsers don't agree in how to format many elements of a
 web page.
 
 Normalize.css is a third party project that provides a set
 of CSS rules that provides a consistent set of styles for
 all browsers.

 [necolas.github.io/normalize.css/](http://necolas.github.io/normalize.css/)

 In this case, to get Sass to import the Normalize.css source
 as inline css, `normalize.css` should already be renamed to 
 `normalize.scss` by an earlier step in the build process.

    @import "normalize.scss";

 ##### Font family default
 
 Use the OS's default font if we can.  OS default fonts are
 generally quite similar (humanist sans serifs with large 
 x-height and open counters) so this is unlikely to run into 
 any significant size differences, but will look familiar and 
 modern to users.

    html {
    	font-family: 
            -apple-system,       /* default macOS font for Safari/webkit */ 
            BlinkMacSystemFont,  /* default macOS font for Chrome/blink */
            "Segoe UI",          /* default Windows font */
            "Roboto",            /* default Android font */
            "Fira Sans",         /* default Mozilla font */
            "Droid Sans",        /* default older Android font */
            "Helvetica Neue",    /* everyone else */
            sans-serif;          /* Blackberry users, lol */
    }

 ##### Font size default

 Use the CSS calc() feature to give the HTML tag a font size 
 that grows as the width of the viewport grows. This helps 
 the portal to display nicely on phone screens.

 Requires `<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">`
 in the `head` of the page, or the page will zoom oddly on
 phone-sized screens.

    html {
    	font-size: 16px; /* for browsers that don't support calc() */
    	font-size: calc(16px + 0.25vw); /* grow font size on wider screen */
    	overflow-x: hidden; /* avoid odd widths on narrow screens */
    }

 This tag sets the default text and background colour for 
 normal display, and when printing.  Colours are described in 
 the Variables section.

    body {
        color: $page-color;
        background-color: $page-background;
    }
    @media print {
        body {
            color:$page-print-color;
            background: $page-print-background;
        }
    }

 ##### Heading size and spacing reset

 Set the font weight and size of all headings to be the same
 as their containers, and reset all heading margins and
 padding.

    h1, h2, h3, h4, h5, h6 {
        font-weight: inherit;
        font-size: inherit;
        margin: 0;
        padding: 0;
    }

 ##### Navigation spacing reset

 Navigation sections of a page usually occur in `ul` tags that 
 are inside `nav` tags.  So here we switch off padding,
 margin, and bullets for `ul` tags inside `nav` tags.

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

 ##### Body wrapper

 The `mf-body-wrapper` class is used on a `div` that wraps the 
 entire page content. You might use it to set a page width. In 
 this styling however it isn't used.
 
    .mf-body-wrapper {
    	// ...
    }

 ## Page header ###############################################

 All Mediaflux portal pages start with a `header` tag like
 this: `<header class="mf-header" role="banner">`. The `role`
 attribute identifies the tag as containing site-oriented 
 content rather than page-specific content.

 TODO: describe setting content in config file

 This header is the appropriate place to include any 
 institution-wide banners, navigation bars etc.

    .mf-header {
    	background: $header-background;
    	color: $header-content-color;
    	white-space: nowrap;
    	text-align: center;
    }


 The portal plugin will not automatically generate a heading 
 or logo, but those items are supplied in the sample portal 
 configuration, so styling for them are supplied here.

    .mf-heading {
    	color: inherit;
    	display: inline-block;
    	vertical-align: middle;
    	font-size: $header-text-size;
    	line-height: $header-height;
    	font-weight: 200; /* very light font weight */
        letter-spacing: 0.1ch; /* slightly airy letter spacing */
    }


 Check the notes in the *Page layout variables* section for 
 information about setting the size of the logo.

    .mf-header-logo {
    	display: inline-block;
    	vertical-align: middle;
    	margin: 0 1vw;
        @if ($resizable-logo) {
            max-height: $header-text-size;
            max-width: $header-text-size;
        } @else {
            height: $logo-height;
            width: $logo-width;        
        }
    }


 ## Page navigation ###########################################

 The main page navigation – between static pages, or 
 sub-collections of assets – is included in the page as a `nav`
 element with the class `mf-navbar`.

    .mf-navbar {
        font-size: $navbar-text-size;
    	background: $navbar-background;
    }

 Inside the `nav.mf-navbar` is a `div.mf-navbar-container`.
 This styling uses the `div` to set the display width for the
 navigation links.

    .mf-navbar-container {
    	max-width: $column-max-width;
    	margin: 0 auto;
    }

 Inside the `div.mf-navbar-container` is a `ul.mf-nav-list`.
 This contains one `li` for each nav link.  This styling uses
 a flexbox layout to stretch the navlinks across the width of
 the column.  On a wide display, they'll all have equal widths;
 on a narrow display, they'll take the space they need.

    .mf-nav-list {
    	display: flex;
    	flex-direction: row;
    	border: 1px solid transparentize($navbar-content-color, 0.66);
    	border-width: 0 1px;
    }
    .mf-nav-list li {
    	color: $navbar-content-color;
    	text-align: center;
    	flex-grow: 1;
    	line-height: $navbar-height;
    	transition: 0.25s;
    	&:hover {
    		background: $navbar-highlight-background;
    		color: $navbar-highlight-content-color;
    	}
    	&.mf-current-nav-item {
    		background: $navbar-current-background;
    		color: $navbar-current-content-color;
    	}
    	a {
    		color: inherit;
    		display: block;
    		text-decoration: none;
    	}
    }


 ## Page content ##############################################

 All portal pages use a wrapper div around the main content 
 with a `mf-page` class, so this set of styling applies to the
 content area on all page types.

    .mf-page {
    	background: $content-background;
    	color: $content-color;
    	max-width: $column-max-width;
    	margin: 0 auto;
    	padding: 2rem 1rem 3rem;
    }

 ## Footer ####################################################

 All Mediaflux portal pages end with a `footer` tag like this:
 `<footer class="mf-footer">`.  The content is supplied from
 the configuration file; this styling assumes that the footer
 content is a single line of text.

    .mf-footer {
    	background: $footer-background;
    	color: $footer-content-color;
    	font-size: $footer-text-size;
    	line-height: $footer-height;
    	text-align: center;
    	border-top: 1px solid $footer-content-color;
    	white-space: nowrap;

 This section allows the footer to fade in and out according
 to mouse hover, if the `$footer-fade` variable is set to 
 `true`.

        @if ($footer-fade) {
    		opacity: 0.5;
    		transition: 0.25s;
    		&:hover {
    			opacity: 1;
    		}
        }
    }

 ## Static page content #######################################

 Static pages are laid out as a heading, rendered as a `h1` tag
 like this: `<h1 class="mf-static-page-title" id="mf-page-title">`
 followed by the content in a `div` tag with a 
 `mf-static-page-content` class.

 The title is styled in a manner similar to a `h4` tag in the 
 content (the position and spacing of the title means its 
 significance is clear without having to make it any larger).
 
 Like the in-content headings, this styling uses the CSS 
 `calc(...)` function to scale along with the size of the 
 window.

    .mf-static-page-title {
    	font-size: 1.333rem; 
    	font-size: calc(1.333rem + 0.666vw); 
    	font-weight: 600;
    	padding: 1rem 0;
    }

 The content of a static portal page can be any HTML specified
 in the config file, so the rules below apply some generally 
 appropriate styles to standard HTML content. 

    .mf-static-page-content {

 Headings and paragraphs get padding and line spacing.

    	p {
    		line-height: 1.5;
    		padding: 0.5em 0;
    		margin: 0;
    	}

    	h1, h2, h3, h4, h5, h6 {
    		line-height: 1.2;
    		padding: 1em 0 0.5rem;
    		margin: 0;
    	}

 Heading sizes are calculated here starting with a "Perfect 
 Fourths" proportion of 4:3, essentially multiplying each 
 size by 1.333 to get the next.

 This web tool is a convenient way to generate scaled sizes:
 [type-scale.com](http://type-scale.com/?scale=1.333&font-family=BlinkMacSystemFont)

 `h5` and `h6` headings are both the same size as normal text;
 `h5`s are bolded, and `h6`s are italicised.
 
 The `calc(...)` function is used here to make the headings
 proportionally larger on large screens.  This means that as
 page size increases, heading size will increase over and 
 above the standard font size increase.  The effect of this
 is clean clear headings on a desktop, but still readable
 headings on phone screens.

    	h1 { font-size: 3.157rem; font-size: calc(3.157rem + 1.578vw); font-weight: 100; }
    	h2 { font-size: 2.369rem; font-size: calc(2.369rem + 1.184vw); font-weight: 200; }
    	h3 { font-size: 1.778rem; font-size: calc(1.778rem + 0.888vw); font-weight: 400; }
    	h4 { font-size: 1.333rem; font-size: calc(1.333rem + 0.666vw); font-weight: 600; }
    	h5 { font-size: 1.000rem; font-size: calc(1.000rem + 0.500vw); font-weight: 800; }
    	h6 { font-size: 1.000rem; font-size: calc(1.000rem + 0.500vw); font-style: italic; }

 Add some background shading to `code`, `pre` preformatted 
 text, and `kbd` keyboard input to help distinguish them from 
 normal text.

    	code, pre, kbd {
    		background: $content-shading;
    	}
    	code {
    		padding: 0.1em 0.33em;
    		border-radius: 0.2em;
    	}
    	pre {
    		max-width: 100%;
    		overflow: auto;
    		margin: 0;
    	}

 Blockquotes are indented, with background shading, a left 
 border, and big curly quotes.

    	blockquote {
    		margin: 0.5em 1em;
    		padding: 1em;
    		padding-left: 2em;
    		background: $content-shading;
    		border-left: 0.2em solid transparentize($content-color, 0.66);
    	}
    	blockquote > p:first-child {
    		padding-top: 0;
    	}

 For bigger quote marks, make this number higher.  To remove
 the quote marks, you can delete the following section of SCSS.

    	blockquote { position: relative; }
    	$blockquote-quote-size: 4;
    	blockquote:before, blockquote:after {
    		position: absolute;
    		top: 0.1em / $blockquote-quote-size;
    		opacity: 0.1;
    		font-size: 1em * $blockquote-quote-size;
    		font-family: cursive;
    		font-weight: bold;
    		font-style: italic;
    	}
    	blockquote:before {
    		content: '\201c'; /* left 66 quotes */ 
    		left: 0.1em / $blockquote-quote-size;
    	}
    	blockquote:after {
    		opacity: 0.05;
    		content: '\201d'; /* right 99 quotes */
    		right: 0.4em / $blockquote-quote-size;
    	}

 Bulletted lists are common in general content.  These rules
 control space between list items for normal lists and lists
 inside other lists.

    	ul, ol { padding: 0.25em 0 0.25em 0; }
    	ul ul, ol ol { padding: 0 0 0 1.5em; }
    	li {
    		padding: 0.1em 0;
    		list-style-position: inside;
    	}

 Set the progression of bullets to square, circle, disc, square.

    	li { list-style-type: square; }
    	li li { list-style-type: circle; }
    	li li li { list-style-type: disc; }
    	li li li li { list-style-type: square; }

 This final closing bracket is the end of the formatting rules
 for static page content.

    }


 ## Collection page content ###################################

    .mf-collection-bar {
    	border: 1px solid pink;
    	padding: 1em;
    }

    .mf-collection-sidebar {

    }




 ## Appendix: Sass and CSS refresher ##########################

 TODO
 
 * six-char colours and three-char colour shorthand
 * rem units
 * vw and vh units
 * calc(..)
 * transition
 
 
