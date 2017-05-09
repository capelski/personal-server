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

function getAll (userId) {
	var selectedElements = elements.filter(element => element.public || (userId && userId === element.ownerId) );
	return selectedElements;
}

function getById (elementId) {
	var element = elements.find(element => element.id === elementId);
	return element;
}

module.exports = {
	getAll,
	getById
};
