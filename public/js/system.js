'use strict';
'use base';

$(document).ready(function() {
	initializePage();
})

var current_arr = [];
var current_click = -1;

function initializePage() {
	$('#back').click(back_func);
	$('#new').click(back_func);
	circle();
	var currentZoom = 1.0;
	$('.planet').click(function() {

			//$(this).animate({ 'zoom': currentZoom += .5 }, 'slow');
			$(this).addClass('transition');
			jQuery.noConflict();
			$('#myModal').modal(); 

			});
	$.get('/ssys?id=0&moons=1', system_callback);
	$('.corner-0').click(populate_modal);
	$('.corner-1').click(populate_modal);
	$('.corner-2').click(populate_modal);
	$('.corner-3').click(populate_modal);
	$('.middle').click(populate_modal);
	$('#save-btn').click(save_modal);
}

function system_callback(response)
{
	console.log(response);
	current_arr = response;
	if (response.length > 0)
	{
		$('.middle').html(planet_html(response[0], 0));
		for (var i = 1; i < response.length; i++)
		{
			$('.corner-' + (i-1)).html(planet_html(response[i], i));
		}
	}
	else
	{
		console.log('Response length was zero!');
	}
}

function planet_html(json, id)
{
	return '<div>' + json.name + '</div><div id="ident" style="display:none;">' + id +
	'</div>';
}

function populate_modal(id)
{
	current_click = $(this).find('#ident').text();
	$('#modal-title-input').val(current_arr[current_click].name);
	$('#modal-body-input').val(current_arr[current_click].body);
}

function save_modal(e)
{
	current_arr[current_click].name = $('#modal-title-input').val();
	current_arr[current_click].body = $('#modal-body-input').val();
	system_callback(current_arr);
}

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
	toastr.info('Navigate to same page with new information.');
}

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
	


