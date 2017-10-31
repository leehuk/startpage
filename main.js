const menu = [

{
	'title': 'Productivity',
	'content': [
	{'name': 'Test', 'url': 'https://www.example.com'},
	{'name': 'Test', 'url': 'https://www.example.com'},
	{'name': 'Test', 'url': 'https://www.example.com'},
	{'name': 'Test', 'url': 'https://www.example.com'},
	{'name': 'Test', 'url': 'https://www.example.com'},
	{'name': 'Test', 'url': 'https://www.example.com'},
	{'name': 'Test', 'url': 'https://www.example.com'}
	]
},
{
	'title': 'Productivity',
	'content': []
},
{
	'title': 'Productivity',
	'content': []
}];

const menucolors = ['#3399ff','#cc6699','#ff9933','#b82e8a'];

$(document).ready(function() {
	var menuheightr = Math.round(100/menu.length);
	var menuheight = menuheightr + 'vh';
	var menuheightf = (menuheightr < 100) ? ((100 - (menuheightr * (menu.length - 1))) + 'vh') : menuheight;

	var menuobj = $('<div/>').addClass('menu').appendTo('body');

	var i = 0;
	menu.forEach(function(element) {
		var menublock = $('<div/>').addClass('menublock').css('background-color', menucolors[i]).height(i == 0 ? menuheightf : menuheight).data('index', i).appendTo(menuobj);

		menublock.mouseenter(function(ev) {
			var index = $(menublock).data('index');

			// hide all content elements and re-display the new one
			$('.content').css('display', 'none').css('visibility', 'hidden');
			$('#content' + index).css('display', 'flex').css('visibility', 'visible');

			$('.menuborderleft').css('background-color', menucolors[index]);
			$('.menubordertop').css('background', 'linear-gradient(to right, ' + menucolors[index] +  ', black)');
			
		});

		var menutitle = $('<div/>').addClass('menutitle').appendTo(menublock);
		var menutitlespan = $('<span/>').html(element.title).appendTo(menutitle);

		var content_disp = i == 0 ? 'flex' : 'none';
		var content_visb = i == 0 ? 'visible' : 'hidden';
		var content = $('<div/>').attr('id', 'content' + i).addClass('content').css('display', content_disp).css('visibility', content_visb).appendTo('body');

		element.content.forEach(function(element) {
			var contentitem = $('<span>').addClass('contentitem').appendTo(content);
			$('<a/>').attr('href', element.url).html(element.name).appendTo(contentitem);
		});

		i++;
	});

	$('<div/>').addClass('menuborderleft').css('background-color', menucolors[0]).appendTo('body');
	$('<div/>').addClass('menubordertop').css('background', 'linear-gradient(to right, ' + menucolors[0] + ', black)').appendTo('body');
});

