Vue-personal-page
	- Prerendering
		- Afegir <nav> per tal que sortint els apartats a Google
	- Github link to projects
	- Add missing URLs for projects + fix the renamed repos
	- Without application traversal, the vue app name is selected, an the /** route captures everything
	- Modena-vue-app?
	- Afegir adreça de github

- Icon for the projects?
- Explain everything (readme.md)
- What with plugins?

- HTML Meta tags in all apps

- Make sass compilation config.json option

- If Vue routing app as default, knocks the rest?
	- Use hashbangs routing instead
	- CHeck whether Vue routing works in a public domain

- Projects
	skills-matrix

- How to deploy with Build Definitions in Azure?
	Check Travis-CI / Jenkins

- Enable browse apps from domain deliberatly (e.g. allow /jokify from .xyz)
	- Set which apps are allowed in config.json

- Setup SEQUELIZE structure to access multiple dbs from apps
	- Security: Each app can access only a corresponding database

SQL naming conventions ------------------------------------------------

- Tables and columns names -> Lower snake case (e.g. bank_account for class BankAccount)
- Singular names for tables (e.g. project instead of projects for class Project)
- Suffix many-to-many relations table with _map (e.g. user_permission_map for association between classes User and Permission)

Sequelize stuff ------------------------------------------------

var db1sequelize = new Sequelize('db1', 'db1user','db1pass'...);

db1sequelize.define('User', {...})

db1sequelize.define('Group', {...})

var db2sequelize = new Sequelize('db2', 'db2user','db2pass'...);
