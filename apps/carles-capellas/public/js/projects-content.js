ContentModule
.directive('project', function() {
	return {
		templateUrl: 'templates/project.html',
		scope: {
			project: '=source',
			index: '=',
			link: '=',
			imageUrl: '='
		},
	};
})
.controller('ProjectsCtrl', ['$scope', function($scope) {
	$scope.$on('pageTranslated', function(event, args) {
	    $scope.projects = $scope.projectsContent[args.language];
	});
	$scope.projectsContent = {
		'ca': {
			ProjectList: [
				{
					Name: "RaspMedia",
					Timespan: "Primavera de 2014",
					Description: "Servidor multimèdia basat en Raspberry Pi, controlat remòtament mitjançant un dispositiu Android. Desenvolupat amb Node.js, Android Studio i Raspbian per l'assignatura PTI del Grau en Enginyeria Informàtica.",
				},
				{
					Name: "Poliesters Pelegrina",
					Timespan: "Març de 2014 - Actualitat",
					Description: "Pàgina web de l'empresa Poliester Germans Pelegrina S.C.P., a petició dels fundadors amb l'objectiu de tenir presència a internet després de més de 20 anys d'activitat en el negoci.",
				},
				{
					Name: "Gestor de comandes",
					Timespan: "Primavera de 2014",
					Description: "Aplicació Android que permet gestionar les comandes dels clients d'un establiment. Desenvolupada mitjançant App Inventor 2 per l'assignatura IDI del Grau en Enginyeria Informàtica."
				},
				{
					Name: "Restaurant D.O. Vic",
					Timespan: "Abril de 2013 - Actualitat",
					Description: "Pàgina web del restaurant Denominació d'Origen Vic per encàrrec del propietari del local. Permet consultar informació útil del restaurant, fer reserves i descarregar els menús del local.",
				},
				{
					Name: "Desdecasa",
					Timespan: "Juny de 2012 - Desembre de 2013",
					Description: "Pàgina web desenvolupada per iniciativa pròpia (juntament amb Eudald Bover) que oferia informació i descomptes dels bars i restaurants de Vic.",
				},
				{
					Name: "TCM: Dosificació de detergent",
					Timespan: "Juny de 2009 - Febrer de 2012",
					Description: "Programa per Windows que permetia administrar màquines de dosificació de detergent en bugaderies industrials. Desenvolupat amb Visual Basic 6.0 en el context del Treball de Recerca de Batxillerat."
				}
			]
		},
		'es': {
			ProjectList: [
				{
					Name: "RaspMedia",
					Timespan: "Primavera de 2014",
					Description: "Servidor multimedia basado en Raspberry Pi, controlado remotamente mediante un dispositivo Android. Desarrollado con Node.js, Android Studio i Raspbian para la asignatura PTI de la ingenieria informática.",
				},
				{
					Name: "Poliesters Pelegrina",
					Timespan: "Marzo de 2014 - Actualidad",
					Description: "Página web de la empresa Poliester Germans Pelegrina S.C.P., a petición de los fundadores con el objetivo de tener presencia en internet después de mas de 20 años de actividad en el negocio.",
				},
				{
					Name: "Gestor de pedidos",
					Timespan: "Primavera de 2014",
					Description: "Aplicación Android que permite gestionar los pedidos de los clientes de un establecimiento. Desarrollada mediante App Inventor 2 para la asignatura IDI de la ingenieria informática."
				},
				{
					Name: "Restaurante D.O. Vic",
					Timespan: "Abril de 2013 - Actualidad",
					Description: "Página web del restaurante Denominación de Origen Vic por encargo del propietario del local. Permite consultar información útil del restaurante, hacer reservas y descaregar los menús del local.",
				},
				{
					Name: "Desdecasa",
					Timespan: "Junio de 2012 - Diciembre de 2013",
					Description: "Página web desarrollada por iniciativa propia (junto con Eudald Bover) que ofrecía información y descuentos de los bares y restaurantes de Vic.",
				},
				{
					Name: "TCM: Dosificación de detergente",
					Timespan: "Junio de 2009 - Febrero de 2012",
					Description: "Programa para Windows que permitía administrar máquinas de dosificación de detergente en lavanderías industriales. Desarrollado con Visual Basic 6.0 en el contexto del 'Treball de Recerca' de Bachillerato."
				}
			]
		},
		'en': {
			ProjectList: [
				{
					Name: "RaspMedia",
					Timespan: "Spring 2014",
					Description: "Media server based on Raspberry Pi, remotely controlled by an Android device. Developed with Node.js, Android Studio and Raspbian for the subject PTI of the informatics degree.",
				},
				{
					Name: "Pelegrina Poliesters",
					Timespan: "March 2014 - Nowadays",
					Description: "Web page of the company Poliester Germans Pelegrina S.C.P. by request of the founders in order to have presence on internet after more than 20 years in the market."
				},
				{
					Name: "Orders manager",
					Timespan: "Spring 2014",
					Description: "Android application that allows to manage the client orders of any establishment. Developed with App Inventor 2 for the subject IDI of the informatics degree."
				},
				{
					Name: "D.O. Vic Restaurant ",
					Timespan: "April 2013 - Nowadays",
					Description: "Restaurant D.O. Vic website, commissioned by the owner of the establishment. Allows consulting useful information of the restaurant, make reservations and download the menus of the local."
				},
				{
					Name: "Desdecasa",
					Timespan: "June 2012 - December 2013",
					Description: "Web page developed on own initiative (together with Eudald Bover) that ofered free information and discounts of the bars and restaurants in Vic city."
				},
				{
					Name: "TCM: Detergent dosing",
					Timespan: "June 2009 - February 2012",
					Description: "Windows program for managing detergent dosage machines in industrial laundries. Developed with Visual Basic 6.0 for the GCE's 'Treball de Recerca'."
				}
			]
		}
	}
	$scope.projects = $scope.projectsContent['ca'];
	$scope.ImagesUrls = [
		"images/projects-logos/raspmedia.png",
		"images/projects-logos/poliesters.png",
		"images/projects-logos/gestor.png",
		"images/projects-logos/dovic.png",
		"images/projects-logos/desdecasa.png",
		"images/projects-logos/tcm.png"
	];
	$scope.ProjectLinks = [
		"projects/raspmedia.pdf",
		"http://www.poliesterpelegrina.cat",
		"projects/GestorDeComandes.zip",
		"http://www.restaurant-do-vic.cat",
		"projects/desdecasa/index.php",
		"projects/tcm.pdf"
	];
}]);