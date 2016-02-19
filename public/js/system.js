'use strict';
'use base';

// Function called when the page becomes loaded
$(document).ready(function() {
	initializePage();
})

/*
 * viewme
 *
 * This variable is set in the system.handlebars page. This refers to the
 * currently viewed system, which is definied using the handlebars template and
 * made available to this script.
 */

/*
 * The current array of systems being displayed.
 *
 * The item at location 0 should always be the central planet, with 1-4 being
 * the moons, if they are present. The moon at location 1 of this array will always
 * be the same moon identified in location 0 of the center planet's "moons"
 * array.
 */
var current_arr = [];
/* If the user should be clicking / tapping on things, this will identify the
 * location within the current_arr array of the item being clicked / tapped.
 */
var current_click = -1;
/*
 * This is similar to the above, but this stores the absolute index for the
 * selected item.
 */
var current_master_index = -1;
// Variable used for processing double clicks.
var wait_for_click = false;

// All the initialization stuff.
function initializePage() {
	$('#back').click(back_func);
	$('#new').click(new_func);
	circle();
	var currentZoom = 1.0;
	$('.planet').click(function() {

			//$(this).animate({ 'zoom': currentZoom += .5 }, 'slow');
			$(this).addClass('transition');
			jQuery.noConflict();
			$('#myModal').modal(); 

			});
	$.get('/ssys?id=' + viewme + '&moons=1', system_callback);
	$('.corner-0').click(populate_modal);
	$('.corner-1').click(populate_modal);
	$('.corner-2').click(populate_modal);
	$('.corner-3').click(populate_modal);
	$('.middle').click(populate_modal);
	$('#save-btn').click(save_modal);
	$('#modal-tab-text').click(modal_text);
	$('#modal-tab-color').click(modal_color);
}

function color_slider_change(e)
{
	console.log(h_to_rgb($(this).val()));
}

function modal_text(e)
{
	e.preventDefault();
	console.log('text pressed');
	$('#modal-color-edit').css('display', 'none');
	$('#modal-text-edit').css('display', 'block');
}

function modal_color(e)
{
	e.preventDefault();
	console.log('color pressed');
	$('#modal-color-edit').css('display', 'block');
	$('#modal-text-edit').css('display', 'none');
}

/*
 * Handle the information obtained from a GET request to the /ssys information
 * node. This information will be an array of planets, which will be stored
 * into current_arr for later use, and used to generate the display on the
 * system page.
 *
 * This function may also be used with current_arr as input in order to refresh
 * the display with updated information.
 */
function system_callback(response)
{
	console.log(response);
	current_arr = response;
	if (response.length > 0)
	{
		$('.middle').html(planet_html(response[0], 0));
		$('.middle').css('background', '#' + response[0].color);
		var i = 1;
		for (; i < response.length; i++)
		{
			$('.corner-' + (i-1)).html(planet_html(response[i], i));
			$('.corner-' + (i-1)).css('background', '#' + response[i].color);
			$('.corner-' + (i-1)).show();
		}
		for (; i < 4; i++)
		{
			$('.corner-' + (i-1)).hide();
		}
	}
	else
	{
		console.log('Response length was zero!');
	}
}

/*
 * Gets a chunk of HTML code for a planet which you would like to display.
 *
 * The JSON is of the planet / moon only, and the ID should be the planet's
 * location in the current_arr array.
 *
 * This function does not place the HTML anywhere, only generates it.
 */
function planet_html(json, id)
{
	return '<div>' + json.name + '</div><div id="ident" style="display:none;">' + id +
	'</div>';
}

/*
 * A misnomer. Actually handles clicks and double clicks.
 *
 * If the user single clicks, then this function redirects them to the system
 * page they clicked.
 *
 * If the user double clicks, then this function will display the edit modal,
 * populated with all the data on the planet or moon they double clicked.
 */
function populate_modal(e)
{
	e.preventDefault();
	console.log('modal stuff: ' + wait_for_click);
	var child = -1;
	current_click = $(this).find('#ident').text();
	if (current_click != 0)
	{
		child = current_arr[0].moons[current_click - 1];
		console.log('Selected child with ident ' + child);
		current_master_index = child;
	}
	else
	{
		current_master_index = viewme;
	}
	if (wait_for_click)
	{
		console.log('We waited, they came.');
		wait_for_click = false;
		$('#modal-title-input').val(current_arr[current_click].name);
		$('#modal-body-input').val(current_arr[current_click].body);
		$('#myModal').modal();
	}
	else
	{
		console.log('Start waiting.');
		wait_for_click = true;
		console.log('Wait for click: ' + wait_for_click);
		setTimeout(function()
			{
				console.log('timeout fired');
				if (wait_for_click)
				{
					wait_for_click = false;
					if (child != -1)
					{
						window.location.href = '/system/' + child;
					}
				}
			}, 300);
	}
}

/*
 * Saves the data which the user has input into the modal and refreshes the
 * page with the new information.
 */
function save_modal(e)
{
	current_arr[current_click].name = $('#modal-title-input').val();
	current_arr[current_click].body = $('#modal-body-input').val();
	console.log(h_to_rgb($('#modal-selected-color').val()));
	current_arr[current_click].color = h_to_rgb($('#modal-selected-color').val());
	system_callback(current_arr);
	var newplan = current_arr[current_click];
	newplan.index = current_master_index;
	$.post('/edit', newplan);
}

/*
 * Function for handling up navigation to the parent planet.
 */
function back_func(e)
{
	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-bottom-center",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "1000",
		"hideDuration": "1000",
		"timeOut": "1500",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};
	if (current_arr[0].parent != "-1")
	{
		window.location.href = '/system/' + current_arr[0].parent;
	}
	else
	{
		toastr.info("You're already at the top!");
	}
}

/*
 * Draws a circle.
 *
 * Does not seem like it should be necessary, although this function is
 * currently what centers the system, and so is absolutely necessary until CSS
 * replaces that function.
 */
function circle()
{
	var width = $(window).width() / 2;
	var height = $(window).height() * 6 / 10;
	console.log('first width: ' + width);
	if (width < height)
	{
		height = width;
	}
	else
	{
		width = height;
	}
	console.log('second width: ' + width);
	var loff = $('#circ').offset().left;
	var center = ($(window).width() - height)/ 2 - loff;

	$('#circ').css('height', height);
	$('#circ').css('width', height);
	$('#circ').css('top', height / 4);
	$('#circ').css('left', center);

  var title_height = $('.planet_title').height();
  var title_width = $('.planet_title').width();
	var title_y = height / 4 - title_height / 2;
  var title_x = ($(window).width() - title_width)/2 - loff;

  $('.planet_title').css('top', title_y);
  $('.planet_title').css('left', title_x);
	console.log('friendly firebats');
}

function h_to_rgb(hue)
{
	// Hue is in range [0, 359]
	// Using formula from Wikipedia
	var newh = hue / 60.0;
	// Saturation and Value are always both 100%
	var C = 1;
	var X = 1 - Math.abs((newh % 2) - 1);
	// These are each in a range [0, 1] for now.
	var r = 0;
	var g = 0;
	var b = 0;
	if (newh < 1)
	{
		r = C;
		g = X;
	}
	else if (newh < 2)
	{
		r = X;
		g = C;
	}
	else if (newh < 3)
	{
		g = C;
		b = X;
	}
	else if (newh < 4)
	{
		g = X;
		b = C;
	}
	else if (newh < 5)
	{
		r = X;
		b = C;
	}
	else if (newh < 6)
	{
		r = C;
		b = X;
	}
	// Get everything in range [0,255]
	r = Math.floor(r * 255);
	b = Math.floor(b * 255);
	g = Math.floor(g * 255);
	// Convert everything to hex
	r = ('00' + r.toString(16));
	g = ('00' + g.toString(16));
	b = ('00' + b.toString(16));
	r = r.substring(r.length - 2, r.length);
	g = g.substring(g.length - 2, g.length);
	b = b.substring(b.length - 2, b.length);
	return '' + r + g + b;
}

function new_func(e) {     

	console.log(current_arr.length-1);
	$.get("/system/"+current_arr.length-1,callBack);


}

