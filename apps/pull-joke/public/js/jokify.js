document.addEventListener("DOMContentLoaded", function(event) {

    var jokifier = document.getElementById('jokify');
    var joke = document.getElementById('joke');
    var nextJoke;

    function getNextJoke() {
        $.ajax({
            method: 'get',
            url: '/pull-joke/random'
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
            }, 10);
        });

        document.querySelector('.joke').classList.remove('animate');
        setTimeout(() => {
            document.querySelector('.joke').classList.add('animate');
        }, 10);

        getNextJoke();
    }

    jokifier.addEventListener('click', jokify);
    getNextJoke();
});
