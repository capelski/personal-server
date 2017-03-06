# Fractal pictures

The purpouse of this fractal pictures generator web page is to ilustrate many concepts I think that help making a web application better:

- JQuery is not really indispensable for acessing dom elements. It is included in the project because it is a Bootstrap requirement, but is not used in the applicaton code)
- If the DOM elements are not destroyed and recreated, they can be kept in a reference instead of retrieveing them everytime they are needed (in the application code: htmlNodes)
- A kind of MVC pattern is still possible in the client side and helps keeping the code clearer. In my case I separated the logic of the code in three sligthly different layers:
	
	+ Models: The objects that contain the data structures involved in providing the app functionality

	+ Services: Singleton instances that deal with model operations (creation included). Any interaction with the model must be done through the model's corresponding service. All the operations receive a model instance and, if required, additonal parameters. Ideally, if the instance of the model must be mutated inside an operation, that operation would return a new instance rather than mutating the received one

	+ Presentation: Layer that contains the code required to present the information to the user; in case of a web application, the code required to access and modify the DOM. Any code related with application's functionality must be placed in a service

- Any operation that may take time and freeze the screen must return a promise and run asynchronously. Until the promise finishes, the user must be informed that the application is taking time to deliver the result. In my case, I decided to use a pure CSS loader for that purpose.
- Vertically alignment of elements must be done through 'display: flex' CSS property instead of tables approach
- Responsive CSS classes must describe the invariant and smaller screen widths properties. Successive 'min-width' media queries must be used to specify the properties for bigger screen widths
- The global namespace must be kept as clean as possible; all the code should be run inside and IIFE and expose only the minimum necessary code (through the window, ideally). As a consequence, the event listeners must be added programatically instead of declaratively
- Animations should be implemented through CSS (adding, removing or toggling classes, with transitions if required) if possible:

	+ htmlNodes.fractalControls.classList.remove('show'); -> Show or hide the fractal controls
	+ target.classList.toggle('checked'); -> Fill/empty the sections from the input grid

- Use canvas for graphical representations; I'd never use it before and I wanted to try it. It turned out to be a great increase in performance
- Use modals for confirmation messages and/or additional steps to complete an action
- Style properties should be defined through CSS classes only instead of using id attributes. Id attributes should only be used to retrieve DOM elements through JavaScript