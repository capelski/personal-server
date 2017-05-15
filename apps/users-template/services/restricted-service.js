var restricteds = [{
	id: 1,
	name: 'Restricted element 1'
}, {
	id: 2,
	name: 'Restricted element 2'
}, {
	id: 3,
	name: 'Restricted element 3'
}];

function getAll () {
	return restricteds;
}

function getById (restrictedId) {
	var restricted = restricteds.find(restricted => restricted.id === restrictedId);
	return restricted;
}

function update(updatedRestricted) {
	var restricted = restricteds.find(element => element.id === updatedRestricted.id);
	if (restricted) {
		restricted.name = updatedRestricted.name;
	}
	return restricted;
}

module.exports = {
	getAll,
	getById,
	update
};
