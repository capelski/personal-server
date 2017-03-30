document.addEventListener("DOMContentLoaded", function(event) {

	var jokifier = document.getElementById('jokify');

	jokifier.addEventListener('click', function() {
		var symbols = Array.from(document.querySelectorAll('.symbol'));
        symbols.forEach(symbol => {
          symbol.classList.remove('parabola');
          setTimeout(() => {
            symbol.classList.add('parabola');
          }, 10);
        });
        document.querySelector('.joke').classList.remove('animate');
        setTimeout(() => {
          document.querySelector('.joke').classList.add('animate');
        }, 10);
	});
});
