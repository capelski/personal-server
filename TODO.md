Vue-personal-page
	- Transitions

- Extract code from app publisher

- Erasmus cities...

- Explain everything (readme.md)
- What with plugins?

- Update express?

- Make sass compilation config.json option

- Projects
	skills-matrix, videocall

- How to deploy with Build Definitions in Azure?
	Check Travis-CI / Jenkins

- Skills-Matrix
	- Setup SEQUELIZE structure to access multiple dbs from apps

SQL naming conventions ------------------------------------------------

- Tables and columns names -> Lower snake case (e.g. bank_account for class BankAccount)
- Singular names for tables (e.g. project instead of projects for class Project)
- Suffix many-to-many relations table with _map (e.g. user_permission_map for association between classes User and Permission)

Sequelize stuff ------------------------------------------------

var db1sequelize = new Sequelize('db1', 'db1user','db1pass'...);

db1sequelize.define('User', {...})

db1sequelize.define('Group', {...})

var db2sequelize = new Sequelize('db2', 'db2user','db2pass'...);
