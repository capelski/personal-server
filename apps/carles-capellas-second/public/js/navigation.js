var Navigation = {
	activeClass: '',
	activeTab: -1,
	addButtonListeners: function () {
		$('.navigation-small #button').on('click', function() {
			$('.navigation-left, .navigation-right, .navigation-small').toggleClass('opened');
		});
		$('.navigation-bar a').on('click', function() {
			if($(this).hasClass('dropdown-item')) {
				Navigation.toggleVisibility($(this).parent());
			}
			if(!$(this).parent().hasClass('dropdown-button')) {
				$('.navigation-left, .navigation-right, .navigation-small').removeClass('opened');			
			}
		});
	},
	addDropdownListeners: function () {
		$('.dropdown .dropdown-button').each(function(){
			$(this).on('click', function() {
				var $list = $(this).parent().children('.dropdown-list');
				Navigation.toggleVisibility($list);
			});
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
			if($(sections[i]).offset().top < scroll + 20) {
				currentTab = i;
			}
		}
		return currentTab;
	},
	hideOnScroll: true,
	hoverClass: '',
	initialize: function() {
		Navigation.addButtonListeners();
		Navigation.addDropdownListeners();
		Navigation.addTabHovers();
		Navigation.updateActiveTab();
		$(window).on('scroll', function() {
			Navigation.updateActiveTab();
		});
	},
	toggleVisibility: function($element) {
		if($element.css('display') == 'none') {
			$element.show(500);
		} else {
			$element.hide(500);
		}
	},
	updateActiveTab: function (forceUpdate) {
		if(Navigation.hideOnScroll) {
			$('.navigation-left, .navigation-right, .navigation-small').removeClass('opened');
			$('.dropdown-list').hide(500);
		}
		var aux;
		if(Navigation.activeTab != (aux = Navigation.getActiveSection()) || forceUpdate) {
			var mediaQuery = window.matchMedia("(min-width: 768px)");
			Navigation.activeTab = aux;
			if(mq.matches) {
				$('.navigation-bar a').removeClass(Navigation.activeClass);
				$($('.navigation-bar a')[Navigation.activeTab]).addClass(Navigation.activeClass);	
			} else {
				$('#current-tab').html($($('.navigation-bar a')[Navigation.activeTab]).html());
			}
		}
	}
};

