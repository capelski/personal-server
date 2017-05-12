var publics = [{
	id: 1,
	name: 'Public element 1'
}, {
	id: 2,
	name: 'Public element 2'
}, {
	id: 3,
	name: 'Public element 3'
}];

function getAll () {
	return publics;
}

function getById (publicId) {
	var element = publics.find(element => element.id === publicId);
	return element;
}

module.exports = {
	getAll,
	getById
};
