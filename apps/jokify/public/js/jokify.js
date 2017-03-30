document.addEventListener("DOMContentLoaded", function(event) {

    var jokifier = document.getElementById('jokify');
    var joke = document.getElementById('joke');
    var nextJoke;

    function getNextJoke() {
        $.ajax({
            method: 'get',
            url: '/jokify/random'
        })
        .then((randomJoke) => {
            nextJoke = randomJoke;
        });
    }

    function jokify() {
        joke.innerHTML = nextJoke;

        var symbols = Array.from(document.querySelectorAll('.symbol'));
        symbols.forEach(symbol => {
            symbol.classList.remove('parabola');
            setTimeout(() => {
                symbol.classList.add('parabola');
            }, 100);
        });

        joke.classList.remove('animate');
        setTimeout(() => {
            joke.classList.add('animate');
        }, 100);

        getNextJoke();
    }

    jokifier.addEventListener('click', jokify);
    getNextJoke();
});
