
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

 #### Colour setting variables

 Default to white background and dark text (not quite black, to
 avoid harsh contrast).

    $page-background: #fff;
    $page-color: #333;

 when printing, reset text to black to avoid the blurry 
 "process" grey many printers use.

    $page-print-background: $page-background;
    $page-print-color: #000;

 #### Page Layout variables

 The maximum width of the main content column is defined here
 as 60 root ems wide, which is roughly 120-150 letters.

    $column-max-width: 60rem;

 The height of the page header and the size of the heading 
 inside the page header.  If you update these values, make 
 sure the `$header-height` value is larger than the 
 `$header-text-size` value.

    $header-height: calc(3rem + 5vw);
    $header-text-size: calc(1rem + 1vw);

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

 The background of the navbar, and the navbar's text and border
 colour.
    $navbar-background: #fcc;
    $navbar-content-color: #060;

 TODO: navbar highlight colour and selected colour, should use content colour mobved up from below.

 The standard background and text colour for the content.  The
 currently selected item in the navbar uses this background
 too, so it looks like a selected "tab".
    $content-background: #ccf;
    $content-color: #600;


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
    	background-image: linear-gradient(to top, #000, #444);
    	color: #fff;
    	white-space: nowrap;
    	text-align: center;
    }


 The portal plugin will not automatically generate a heading 
 or logo, but those items are supplied in the sample portal 
 configuration, so styling for them are supplied here.

    .mf-heading {
        TODO: color from variable;
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
    	transition: 0.5s;
    	&:hover {
    		background-image: linear-gradient(to top, #9cf, #cef);
    	}
    	&.mf-current-nav-item {
    		background: white;
    	}
    	a {
    		color: inherit;
    		display: block;
    		text-decoration: none;
    	}
    }


// page -------------------------------------------------------

    .mf-page {
    	max-width: $column-max-width;
    	margin: 0 auto;
    	padding: 2rem 0 3rem;
    }

// footer -----------------------------------------------------

    .mf-footer {
    	opacity: 0.5;
    	text-align: center;
    	border-top: 1px solid #ccc;
    	line-height: 3;
    	white-space: nowrap;
    	transition: 0.5s;
    	&:hover {
    		opacity: 1;
    	}
    }

// static page items ------------------------------------------

    .mf-static-page-title {
    	font-size: 2rem;
    	padding: 1rem 0;
    }

    .mf-static-page-content {

    	code, pre {
    		background: #eee;
    	}
    	code {
    		padding: 0.1em 0.33em;
    		border-radius: 0.2em;
    	}
    	pre {
    		max-width: 100%;
    		overflow: auto;
    	}

    	p {
    		line-height: 1.5;
    		padding: 0.5em 0;
    	}

    	h1, h2, h3, h4, h5, h6 {
    		line-height: 1.2;
    		padding: 1em 0 0.5rem;
    	}

    	ul { padding: 0.25em 0 0.25em 0; }
    	ul ul { padding: 0 0 0 1.5em; }
    	li {
    		padding: 0.1em 0;
    		list-style-position: inside;
    	}
    	li { list-style-type: square; }
    	li li { list-style-type: circle; }
    	li li li { list-style-type: disc; }
    	li li li li { list-style-type: square; }

 perfect fourth: http://type-scale.com/?scale=1.333&font-family=BlinkMacSystemFont

 Use calc to scale the headings proportionally larger if you're on a big screen
 Write this up later..

    	h1 { font-size: 3.157rem; font-size: calc(3.157rem + 1.578vw); font-weight: 100; }
    	h2 { font-size: 2.369rem; font-size: calc(2.369rem + 1.184vw); font-weight: 200; }
    	h3 { font-size: 1.778rem; font-size: calc(1.778rem + 0.888vw); font-weight: 400; }
    	h4 { font-size: 1.333rem; font-size: calc(1.333rem + 0.666vw); font-weight: 600; }
    	h5 { font-size: 1.000rem; font-size: calc(1.000rem + 0.500vw); font-weight: 800; }
    	h6 { font-size: 1.000rem; font-size: calc(1.000rem + 0.500vw); font-style: italic; }

    }


// collection page --------------------------------------------

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
 
 

