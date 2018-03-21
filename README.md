# modena

Node.js Express 4 server based on my [azure-express](https://github.com/L3bowski/azure-express) template I use to host my personal page and other projects.

Considerations:

- Views: Express view engine will search for view files in each app 'views' folder. Therefore, if two views are named the same in different apps, one of the apps (the one which is exposed later in the routing algorithm) will retrieve the view from the other app
- Static content / assets: All the URLs for static content must start with a slash ('/'). This way the static content will be successfully retrieved regardless the url has a trailing slash or not (e.g. localhost/app and localhost/app/ will both work correctly). The URLs must also be namespaced, in order to isolate the static content for each app.
- Default app