// custom search based on the JSON representation of the data.

$(document).ready(function() {
	initializePage();
});

var current_arr = [];

function initializePage()
{
	$.get('/sysinfo', planet_callback);
	$('#search').click(search_click);
	$('#searchbar').on('input', search_input_changed);
	$('.systemplanet').click(planet_click);
	$('#new').click(new_click);
}

var search_toggle = false;

function planet_callback(response)
{
	current_arr = response;
	var newhtml = aggregate_planets(response);
	$('.listcontainer').html(newhtml);
	$('.systemplanet').click(planet_click);
}

function search_click(e)
{
	e.preventDefault();
	var popup = $('.popupsearch');
	if (search_toggle)
	{
		popup.css('bottom', 0);
		popup.css('display', 'none');
	}
	else
	{
		popup.css('display', 'block');
		popup.css('bottom', $('.footer').height() + 5);
		$('#searchbar').focus();
	}
	search_toggle = !search_toggle;
}

function search_input_changed(e)
{
	if ($(this).val() == "")
	{
		$('#title').text('Central Ideas');
	}
	else
	{
		$('#title').text('Search Results');
	}
	var url = '/sysinfo?query=' + $(this).val();
	console.log(url);
	$.get(url, planet_callback);
}

function get_planet_html(obj, id)
{
	var width = $('.listcontainer').width() / 2;
	var name = obj.planet.name;
	if (!name)
	{
		name = 'Unnamed System';
	}
	var html = '<div class="systemplanet" style="background: #' + obj.planet.color +
		';"><span>' + name + '</span><div class="id">' + obj.ind + '</div></div>'
	return html;
}

function aggregate_planets(obj_list)
{
	var html = "";
	var i = 0;
	var height = $('.listcontainer').width() / 2;
	for (; i < obj_list.length; i++)
	{
		var planet_html = get_planet_html(obj_list[i], i);
		if (i % 2 == 0)
		{
			html += '<div class="listrow">';
		}
		html += planet_html;
		if (i % 2 == 1)
		{
			html += '</div>';
		}
	}
	if (i % 2 == 1)
	{
		html += '<div class="planet_container"></div></div>';
	}
	return html;
}

function planet_click(e)
{
	e.preventDefault();
	var id = $(this).find('.id').text();
	console.log;
	window.location.href = '/system?sys=' + id;
}

function new_click(e)
{
	e.preventDefault();
	$.post('/add', function(result)
	{
		window.location.href = '/system?sys=' + result.id;
	});
}

