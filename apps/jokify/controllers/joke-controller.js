var jokesService = require('../services/joke-service');

function JokeController() {

	function indexView(req, res, next) {
		req.session.excludedIndexes = req.session.excludedIndexes || [];
		var randomJoke = jokesService.getRandomJoke(req.session.excludedIndexes);
		res.render('jokify-index', {
			joke: randomJoke
		});
	}

	function randomJoke(req, res, next) {
		req.session.excludedIndexes = req.session.excludedIndexes || [];
		var randomJoke = jokesService.getRandomJoke(req.session.excludedIndexes);
		res.json(randomJoke);
	}

	return {
		indexView,
		randomJoke
	};
}

module.exports = JokeController();
