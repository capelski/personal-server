Heroku
	- Set .cat to be production
	- Set .xyz to be development

How to define multiple environment variables sets

Travis Azure
	
Some projects don't work on heroku

- Explain everything (readme.md)
	- Decribe how process.env overrides config.json; No objects; Only strings
- What with plugins?
- Update express?
- Skills-Matrix
	- Setup SEQUELIZE structure to access multiple dbs from apps

Sequelize stuff (namespace by app) ------------------------------

var db1sequelize = new Sequelize('db1', 'db1user','db1pass'...);

db1sequelize.define('User', {...})

db1sequelize.define('Group', {...})

var db2sequelize = new Sequelize('db2', 'db2user','db2pass'...);
