$().ready(function(){

	$(window).on('resize', function() {
		equalizeHeight('.project-description');
	});
	$('#header.navbar a').on('click', function(){
		if($(this).data('toggle') != 'dropdown' && $('.navbar-collapse.collapse').hasClass('in')) {
			$('.navbar-collapse.collapse').removeClass('in');
		}
	});

	setTimeout(function(){
		Navigation.activeClass = 'palette-bg-2';
		Navigation.hoverClass = 'palette-bg-1';
		Navigation.initialize();
		$('button.button, button.form-control').on('mouseover', function() {
			$(this).removeClass('palette-bg-4');
			$(this).addClass('palette-bg-2');
		});
		$('button.button, button.form-control').on('mouseout', function() {
			$(this).removeClass('palette-bg-2');
			$(this).addClass('palette-bg-4');
		});
		equalizeHeight('.project-description');
	}, 500);
});

function translateCallback() {
	equalizeHeight('.project-description');
}