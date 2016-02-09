'use strict';

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

var userarr = [
	{
		"user": "albert",
		"pass": "supersecure"
	},
	{
		"user": "asdf",
		"pass": "fdsa"
	},
];

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('#register').click(reg_func);
	$('#login').click(on_login);
}

function reg_func(e)
{
	toastr.info('Welcome to Catchi!');
}

function on_login(e)
{
	e.preventDefault();
	var user = $('#email').val();
	var pass = $('#pass').val();
	var found = false;

	for (var i = 0, len=userarr.length; i < len; i++)
	{
		if (user == userarr[i].user)
		{
			if (pass == userarr[i].pass)
			{
				toastr.success('Welcome back!');
				found = true;
			}
		}
	}

	if (!found)
	{
		toastr.error('Username and password combination not valid.');
	}
}

