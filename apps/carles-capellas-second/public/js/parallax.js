var sectionsTop = [];
var mq = window.matchMedia( "(min-width: 768px)" );

$(document).ready(function() {

  $window = $(window);
  var windowScroll = $window.scrollTop();
  $window.scrollTop(0);
 
  $('[data-type="parallax-background"]').each(function(index) {

    var $scroll = $(this);
    sectionsTop.push($scroll[0].getBoundingClientRect().top);
                     
    $(window).scroll(function() {
      if(mq.matches) {
        var originalTop = sectionsTop[index];
        var slowDown = $scroll.data('slow-down');
        if(typeof(slowDown) == "undefined") {
          slowDown = 3;
        }
        var yPos = -(($window.scrollTop() - originalTop)/ slowDown);
        var coords = '0 '+ yPos + 'px';            
        $scroll.css({ backgroundPosition: coords });   
      }
    });
  });

  $window.scrollTop(windowScroll);
});

/* Create HTML5 element for IE */
document.createElement("section");