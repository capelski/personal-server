- Prior to push, ftp!

- Modify assets name after repositories renamings

- Rename responsive-do-vic to do-vic-responsive

- What with plugins?

- favicon.ico
	- Done in jokify, fractal

- Make sass compilation config.json option
- Allow Vue building from apps folder?

- If Vue routing app as default, knocks the rest?
	- Use hashbangs routing instead

http://localhost:3000/carles-capellas-first?page=cv
	- If missing the final '/', urls don't work
	- Use RegExp to find the app name

- Enable browse apps from domain deliberatly (e.g. allow /jokify from .xyz)
	- Set which apps are allowed in config.json

- HTML Meta tags in all apps

- Transpiler: Add .babelrc file and install presets
- Hardcoded URLs in Views should come from server side
- Page titles
- Popup to avoid accidental deletes
- CSS Loaders for AJAX calls
- Add toastr to display errors
- Put tracer everywhere
- Adapt tracer stackLevel for multiple apps
- JSLint + use strict
- Setup SEQUELIZE structure to access multiple dbs from apps
	- Security: Each app can access only a corresponding database
- Generic error handler: If 404 -> Error
- Passport: Securize access through namespace

SQL naming conventions ------------------------------------------------

- Tables and columns names -> Lower snake case (e.g. bank_account for class BankAccount)
- Singular names for tables (e.g. project instead of projects for class Project)
- Suffix many-to-many relations table with _map (e.g. user_permission_map for association between classes User and Permission)

Sequelize stuff ------------------------------------------------

var db1sequelize = new Sequelize('db1', 'db1user','db1pass'...);

db1sequelize.define('User', {...})

db1sequelize.define('Group', {...})

var db2sequelize = new Sequelize('db2', 'db2user','db2pass'...);
