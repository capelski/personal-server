var security = require('../../../utils/security');

var elements = [{
	id: 1,
	name: 'Element 1',
	ownerId: 1,
	public: true,
	restricted: false
}, {
	id: 2,
	name: 'Element 2',
	ownerId: 1,
	public: false,
	restricted: false
}, {
	id: 3,
	name: 'Element 3',
	ownerId: 1,
	public: true,
	restricted: true
}];

function getAll () {
	return elements;
}

function getAllUserFiltered (user) {
	var selectedElements = elements.filter(element => element.public || (user && user.id === element.ownerId) );
	return selectedElements;
}

function getById (elementId) {
	var element = elements.find(element => element.id === elementId);
	return element;
}

function getByIdUserFiltered (elementId, user) {
	var element = getById(elementId);

	if (element && (
		(!element.public && (!user || user.id !== element.ownerId)) ||
		(element.restricted && !security.hasUserPermission(user, 'view-restricted'))
	)) {
		throw 'You are not allowed to view the element';
	}

	return element;
}

module.exports = {
	getAll,
	getAllUserFiltered,
	getById,
	getByIdUserFiltered
};
