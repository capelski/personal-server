var authorization = require('../../../utils/authorization');

var elements = [{
	id: 1,
	name: 'Element 1',
	ownerId: 1,
	public: true
}, {
	id: 2,
	name: 'Element 2',
	ownerId: 1,
	public: false
}];

function getAll (req, res, next) {
	var selectedElements = elements.filter(sample => sample.public || (req.user && req.user.id === sample.ownerId) );
	return res.json(selectedElements);
}

function getById (req, res, next) {
	var sample = elements.find(sample => sample.id === parseInt(req.query.id));
	return res.json(sample);
}

module.exports = {
	getAll,
	getById
};
