'use strict';
'use base';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('#back').click(back_func);
	$('#new').click(back_func);
	
	var currentZoom = 1.0;
    $('.center_circle').click(function() {
      
      // $(this).animate({ 'zoom': currentZoom += .5 }, 'slow');
      $(this).addClass('transition');
      jQuery.noConflict();
      $('#myModal').modal(); 
        
    });

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

// function displayPopup(e)
// {
// 	$(this).hover(function(e) {
//     $('div#pop-up').show()
//       .css('top', e.pageY)
//       .css('left', e.pageX)
//       .appendTo('body');
//   }, function() {
//     $('div#pop-up').hide();
//   });
	

// }
	


