document.addEventListener("DOMContentLoaded", function(event) {

	var initialOffsetThreshold = window.innerHeight * 0.65;
	var offsetThreshold = window.innerHeight * 1.5;

	document.querySelectorAll('.box-content').forEach(boxContent => {
		if (boxContent.offsetTop > initialOffsetThreshold) {
			boxContent.classList.add('pushed-down');
		}
	});

	window.onscroll = function() {
		document.querySelectorAll('.box-content').forEach(boxContent => {
			if (boxContent.offsetTop <= (window.pageYOffset + offsetThreshold)) {
				boxContent.classList.remove('pushed-down');
			}
		});
	};
});
