var nextId = 4;
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

function create (publicData) {
	var public = {
		id: nextId++,
		name: publicData.name
	};
	publics.push(public);
	return public;
}

function deletePublic (publicId) {
	var public = publics.find(public => public.id === publicId);
	if (public) {
		publics = publics.filter(public => public.id !== publicId);
	}
	return public;
}

function getAll () {
	return publics;
}

function getById (publicId) {
	var element = publics.find(element => element.id === publicId);
	return element;
}

function update(updatedPublic) {
	var public = publics.find(element => element.id === updatedPublic.id);
	if (public) {
		public.name = updatedPublic.name;
	}
	return public;
}

module.exports = {
	create,
	delete: deletePublic,
	getAll,
	getById,
	update
};
