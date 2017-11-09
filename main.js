// configuration settings
const menucolors = ['#66004f','#03696b','#445877','#6d6f72','#362170','#040b51','#7c307f'];
var menuwidth = 30
var contentheight = 180;
const menuiconurl = 'icons/';

// automatically calculated based on the above
var menuheightfirst;
var menuheight;
var contentwidth;

// core settings
var indexactive = -1;

function set_dimensions() {
	console.debug(contentwidth);
	console.debug($('body').width());
	console.debug($('body'));
}

// content_activate()
// 	Activates a given content menu
function content_activate(index) {
	// mark the current active menu for hotkeys
	indexactive = index;

	// set borders to black, and this one to its native colour
	$('.menublock').css('border-right', '1px solid black');
	$('#menublock' + index).css('border-right', '1px solid ' + menucolors[index]);

	// hide all content elements and re-display the new one
	$('.content').width('0vw').css('display', 'none').css('visibility', 'hidden');
	$('.content').children('a').children('figure').css('visibility', 'hidden');
	$('#content' + index).css('display', 'flex').css('visibility', 'visible');
	$('#content' + index).animate({ width: contentwidth }, 'normal', function() { 
		$(this).children('a').children('figure').css('visibility', 'visible') 
	});
}

// Setup heights and widths
$(document).ready(function() {
	menuheight = Math.round(contentheight / menu.length);

	// adjust the first menu for rounding if necessary
	if(menuheight * menu.length < contentheight) {
		menuheightfirst = menuheight + (contentheight - (menuheight * menu.length));
	} else if(menuheight * menu.length > contentheight) {
		menuheightfirst = menuheight - ((menuheight * menu.length) - contentheight);
	} else {
		menuheightfirst = menuheight;
	}

	contentwidth = $('body').width() - menuwidth;

	// add spacing for borders
	contentheight += (menu.length - 1);
});

// Create our menu structure
$(document).ready(function() {
	var menuobj = $('div.menu');

	// loop through adding each of our menus
	var i = 0;
	menu.forEach(function(element) {
		var menubordertop = (i == 0 ? 'none' : '1px solid black');
		var menublock = $('<div/>').attr('id', 'menublock' + i).addClass('menublock').height(i == 0 ? menuheightfirst : menuheight).width(menuwidth).css('border-top', menubordertop).css('background-color', menucolors[i]).data('index', i).appendTo(menuobj);

		menublock.mouseenter(function() {
			var index = $(menublock).data('index');
			content_activate(index);
		});

		// create each of the menu content divs
		var content = $('<div/>').attr('id', 'content' + i).addClass('content').height(contentheight).css('left', menuwidth).css('background-color', menucolors[i]).appendTo('body');

		element.forEach(function(element) {
			// 
			var contentlink = $('<a/>').addClass('contentlink').attr('href', element.url).appendTo(content);
			var contentfig = $('<figure/>').addClass('contentfig').appendTo(contentlink);

			// add image to figure if we have one
			if(typeof element.icon !== 'undefined') {
				$('<img/>').attr('src', menuiconurl + element.icon).appendTo(contentfig);
			}

				var contentcaption = $('<figcaption/>').addClass('contentcaption').appendTo(contentfig);
				$('<span/>').html(element.name).appendTo(contentcaption);
		});

		i++;
	});
});

// Add hotkeys, letters for menus, numbers for items within a menu
$(document).ready(function() {
	$('body').on("keydown", function(ev) {
		// a-...
		if(ev.keyCode >= 65 && ev.keyCode < (65 + menu.length)) {
			content_activate(ev.keyCode - 65);
		// 1-9
		} else if(ev.keyCode >= 49 && ev.keyCode <= 57 && indexactive >= 0) {
			var entry = ev.keyCode - 49;
			// validate we actually have a menu entry for that number
			if(typeof menu[indexactive][entry] !== 'undefined' && typeof menu[indexactive][entry].url !== 'undefined') {
				document.location = menu[indexactive][entry].url;
			}
		}
	});
});

