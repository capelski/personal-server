- modena-vue-app
- Explain everything (readme.md)
	- Decribe how process.env overrides config.json; No objects; Only strings
- Add page transitions to vue-personal-page
- Add missing Erasmus cities to vue-personal-page
- Projects
	skills-matrix, videocall
- What with plugins?
- Update express?
- Skills-Matrix
	- Setup SEQUELIZE structure to access multiple dbs from apps

Sequelize stuff (namespace by app) ------------------------------

var db1sequelize = new Sequelize('db1', 'db1user','db1pass'...);

db1sequelize.define('User', {...})

db1sequelize.define('Group', {...})

var db2sequelize = new Sequelize('db2', 'db2user','db2pass'...);
