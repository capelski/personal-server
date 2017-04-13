document.addEventListener('DOMContentLoaded', function(event) {

	// BOXES

	var initialOffsetThreshold = window.innerHeight * 0.65;
	var offsetThreshold = window.innerHeight * 1.5;

	Array.from(document.querySelectorAll('.box-content')).forEach(boxContent => {
		if (boxContent.offsetTop > initialOffsetThreshold) {
			boxContent.classList.add('pushed-down');
		}
	});

	window.onscroll = function() {
		Array.from(document.querySelectorAll('.box-content')).forEach(boxContent => {
			if (boxContent.offsetTop <= (window.pageYOffset + offsetThreshold)) {
				boxContent.classList.remove('pushed-down');
			}
		});
	};

	// FLIPPER

	var flipper = document.getElementById('flipper');
	var flipButton = document.getElementById('flip-button');

    flipButton.onclick = function() {
        flipper.classList.remove('block');
        flipper.classList.toggle('front-side');
        flipper.classList.toggle('back-side');
        flipButton.classList.toggle('open');
    };
});
