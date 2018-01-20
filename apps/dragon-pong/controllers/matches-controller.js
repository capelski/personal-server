var matchesData = require('./matches.json');

function MatchesController() {

	function getAll(req, res, next) {
        return res.json(matchesData);
	}

	return {
		getAll
	};
}

module.exports = MatchesController();
