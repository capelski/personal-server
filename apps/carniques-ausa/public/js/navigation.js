var Navigation = {
	activeClass: '',
	activeTab: -1,
	addListeners: function () {

		$('#bars-button').on('click', function() {
			$('.navigation-bar').toggleClass('opened');
		});		

		$('.navigation-clickable').on('click', function() {
			if(!$(this).hasClass('dropdown-button')) {
				$('.navigation-bar').removeClass('opened');
			}
		});

		$('.dropdown-button').each(function(){
			$(this).on('click', function() {
				var $list = $(this).parent().children('.dropdown-list');
				Navigation.toggleVisibility($list);
			});
		});

		$('.dropdown-clickable').on('click', function() {
			Navigation.toggleVisibility($(this).parent());
			$('.navigation-bar').removeClass('opened');
		});
	},
	addTabHovers: function () {

		$('.navigation-bar a').on('mouseover', function() {
			$(this).addClass(Navigation.hoverClass);
		});

		$('.navigation-bar a').on('mouseout', function() {
			$(this).removeClass(Navigation.hoverClass);
		});
	},
	getActiveSection: function () {

		var sections = $('section');
		var scroll = $(window).scrollTop();
		var currentTab = 0;

		for(var i = 0; i < sections.length; ++i) {
			if($(sections[i]).offset().top < scroll + 50) {
				currentTab = i;
			}
		}

		return currentTab;
	},
	hideOnScroll: true,
	hoverClass: '',
	initialize: function() {

		Navigation.addListeners();
		Navigation.addTabHovers();
		Navigation.updateActiveTab();

		var mediaQuery = window.matchMedia("(min-width: 768px)");
		if(!mediaQuery.matches) {
			$(window).on('scroll', function() {
				Navigation.updateActiveTab();
			});
		}
	},
	toggleVisibility: function($element) {
		if($element.css('display') == 'none') {
			$element.show();
		} else {
			$element.hide();
		}
	},
	updateActiveTab: function (forceUpdate) {

		if(Navigation.hideOnScroll) {
			$('.navigation-left, .navigation-right, .navigation-small').removeClass('opened');
			$('.dropdown-list').hide(500);
		}

		var aux = Navigation.getActiveSection();
		if(Navigation.activeTab != aux || forceUpdate) {
			Navigation.activeTab = aux;
			$('#current-tab').html($($('.navigation-bar .navigation-left a')[Navigation.activeTab]).html());
		}
	}
};