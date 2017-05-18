var nextId = 4;
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

function create (restrictedData) {
	var restricted = {
		id: nextId++,
		name: restrictedData.name
	};
	restricteds.push(restricted);
	return restricted;
}

function deleteRestricted (restrictedId) {
	var restricted = restricteds.find(restricted => restricted.id === restrictedId);
	if (restricted) {
		restricteds = restricteds.filter(restricted => restricted.id !== restrictedId);
	}
	return restricted;
}

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
	create,
	delete: deleteRestricted,
	getAll,
	getById,
	update
};
