document.addEventListener("DOMContentLoaded", function(event) {

    var viewport = document.getElementById('viewport');
    var jokifier = document.getElementById('jokify');
    var joke = document.getElementById('joke');
    var themes = ['blue-theme', 'green-theme', 'orange-theme', 'pink-theme', 'red-theme'];
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

    function randomColorize() {
        DOMTokenList.prototype.remove.apply(viewport.classList, themes);
        var nextTheme = themes[Math.round(Math.random() * (themes.length - 1))];
        viewport.classList.add(nextTheme);
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

        randomColorize();
        getNextJoke();
    }

    randomColorize();
    jokifier.addEventListener('click', jokify);
    getNextJoke();
});
