 
 function pushFooter() {

 	var centerPadding = 20;
	$('#footer-pusher').css('padding-top', centerPadding + 'px'); 	 	
	$('#footer-pusher').css('padding-bottom', centerPadding + 'px'); 	 	

	$('#footer-pusher').css('margin-top', '0');
 	$('#footer-pusher').css('margin-bottom', '0');

 	var screenHeight = $(document).height();
 	var headerHeight = $('#header').height();
 	var pageHeight = $('#footer-pusher').height();
 	var footerHeight = $('#fixed-footer').height();

 	/*We add a last -1 to make it fit perfectly*/
 	var offset = screenHeight - headerHeight - pageHeight - footerHeight - 2*centerPadding - 1;
 	if(offset > 0) {
 		offset /= 2;
 		$('#footer-pusher').css('margin-top', offset + 'px');
 		$('#footer-pusher').css('margin-bottom', offset + 'px');
 	}
 }

 /*$(document).ready(function() {
	window.onresize = function(event) {
		pushFooter();
	};
	pushFooter();
 });*/