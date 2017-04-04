document.addEventListener("DOMContentLoaded", function(event) {

    var viewport = document.getElementById('viewport');
    var jokifier = document.getElementById('jokify');
    var joke = document.getElementById('joke');
    var themes = ['blue-theme', 'green-theme', 'orange-theme', 'pink-theme', 'red-theme'];
    var emojis = ['laugh', 'poo', 'wink-tongue', 'boom', 'bomb', 'tada', 'halloween', 'dice'];
    var nextJoke = joke.innerHTML;

    function animateJoke() {
        joke.classList.remove('animate');
        setTimeout(() => {
            joke.classList.add('animate');
        }, 100);
    }

    function animateSymbols() {
        var symbols = Array.from(document.querySelectorAll('.symbol'));
        symbols.forEach(symbol => {
            DOMTokenList.prototype.remove.apply(symbol.classList, emojis);
            symbol.classList.add(emojis[Math.round(Math.random() * (emojis.length - 1))]);
            symbol.classList.remove('parabola');
            setTimeout(() => {
                symbol.classList.add('parabola');
            }, 100);
        });
    }

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
        randomColorize();
        animateSymbols();
        animateJoke();
        getNextJoke();
    }

    function randomColorize() {
        DOMTokenList.prototype.remove.apply(viewport.classList, themes);
        var nextTheme = themes[Math.round(Math.random() * (themes.length - 1))];
        viewport.classList.add(nextTheme);
    }

    jokifier.addEventListener('click', jokify);
    jokify();
});
