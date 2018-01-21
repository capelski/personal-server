function toggleContact() {
	var visibility = $('.contact-container').css('display');
	if(visibility == 'none') {
		$('.contact-container').fadeIn({queue: false, duration: 'slow'});
		$('.contact-container').animate({ top: "60px" }, 'slow');
	} else {
		$('.contact-container').animate({ queue: false, top: "-250px", duration: 'slow'});
		$('.contact-container').fadeOut({duration: 'slow'});
	}
}
