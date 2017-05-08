var authorization = require('../../../utils/authorization');

var samples = [{
	id: 1,
	name: 'Kratos'
}, {
	id: 2,
	name: 'Zeus'
}];

function getAll (req, res, next) {
	return res.json(samples);
}

function getById (req, res, next) {
	var sample = samples.find(sample => sample.id === parseInt(req.query.id));
	return res.json(sample);
}

module.exports = {
	getAll,
	getById
};
