'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('#back').click(back_func);
	$('#new').click(back_func);
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


