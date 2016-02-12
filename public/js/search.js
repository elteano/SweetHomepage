// custom search based on the JSON representation of the data.

$(document).ready(function() {
	$.get('/sysinfo', planet_callback);
	$('#search').click(search_click);
	$('#searchbar').on('input', search_input_changed);
});

var search_toggle = false;

function planet_callback(response)
{
	console.log(response);
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
	}
	search_toggle = !search_toggle;
}

function search_input_changed(e)
{
	var url = '/sysinfo?query=' + $(this).val();
	console.log(url);
	$.get(url, planet_callback);
}

