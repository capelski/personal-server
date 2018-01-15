ContentModule
.directive('curriculumSection', function() {
	return {
		templateUrl: 'templates/curriculum-section.html',
		scope: {
			section: '=',
			imageUrl: '='
		},
	};
})
.controller('CurriculumCtrl', ['$scope', function($scope) {
	$scope.$on('pageTranslated', function(event, args) {
	    $scope.curriculum = $scope.curriculumContent[args.language];
	});
	$scope.curriculumContent = {
		'ca' : {
			AcademicTraining: {
				Title: "Formació acadèmica",
				Items: [
					{
						Title : "Grau en Enginyeria Informàtica",		
						Description: "Facultat d'Informàtica de Barcelona, Universitat Politècnica de Catalunya",
						Timespan: "2011-2015"
					},
					{
						Title : "Cambridge First Certificate of English",	
						Description: "Cambridge ESOL Exam Centre ES439 (Barcelona)",
						Timespan: "Agost de 2011",
					},
					{
						Title : "Grau en Enginyeria Electrònica Industrial i Automàtica <em>(Primer any)</em>",		
						Description: "Escola Universitària d'Enginyeria Tècnica Industrial de Barcelona, Universitat Politècnica de Catalunya",
						Timespan: "2010-2011",
					}
				]
			},
			NonAcademicTraining: {
				Title: "Formació complementària",
				Items: [
					{
						Title : "Curs sobre Raspberry Pi (20 hores)",		
						Description: "AESS Estudiants (UPC)",
						Timespan: "Febrer de 2014"
					},
					{
						Title : "Curs de PHP Bàsic (40 hores)",		
						Description: "JEDI Junior Empresa (UPC)",
						Timespan: "Juny de 2013"
					},
					{
						Title : "Curs d'Introducció a Arduino (20 hores)",		
						Description: "AESS Estudiants (UPC)",
						Timespan: "Febrer de 2013"
					},
					{
						Title : "Curs de Seguretat Informàtica (20 hores)",		
						Description: "JEDI Junior Empresa (UPC)",
						Timespan: "Gener de 2013",
					},
					{
						Title : "Anglès d'Estiu IV (60 hores)",
						Description: "Escola d'Idiomes de la Universitat de Vic",
						Timespan: "Agost de 2008",
					}
				]
			},
			WorkExperience: {
				Title: "Experiència laboral",
				Items: [
					{
						Title : "Analista de Sistemes",
						Company: "<a class='white-anchor' href='http://http://tokiota.es/' target='_blank'>Tokiota</a>",		
						Description: "Desenvolupador de microserveis ASP.NET",
						Timespan: "Desembre de 2016 - Present"
					},
					{
						Title : "Programador .NET - SharePoint",		
						Company: "<a class='white-anchor' href='http://www.itequia.com/ca' target='_blank'>Itequia</a>",		
						Description: "Desenvolupament d'aplicacions per Microsoft SharePoint. Diversos llenguatges (C#, Powershell, SQL, Javascript, etc.) i metodologia àgil SCRUM.",
						Timespan: "Març de 2015 - Desembre de 2016"
					},
					{
						Title : "Programador .NET - MVC",
						Company: "<a class='white-anchor' href='http://www.itequia.com/ca' target='_blank'>Itequia</a>",		
						Description: "Desenvolupament de projectes MVC de la plataforma ASP.NET de Microsoft. Diversos llenguatges (C#, Javascript, HTML, etc.) i metodologia àgil SCRUM.",
						Timespan: "Juliol de 2014 - Setembre de 2014"
					}
				]
			},
			Download : "Descarregar"
		},
		'es' : {
			AcademicTraining: {
				Title: "Formación académica",
				Items: [
					{
						Title : "Grado en Ingeniería Informática",		
						Description: "Facultad de Informática de Barcelona, Universidad Politécnica de Cataluña",
						Timespan: "2011-2015"
					},
					{
						Title : "Cambridge First Certificate of English",	
						Description: "Cambridge ESOL Exam Centre ES439 (Barcelona)",
						Timespan: "Agosto de 2011",
					},
					{
						Title : "Grado en Ingeniería Electrónica Industrial i Automática <em>(Primer año)</em>",		
						Description: "Escuela Universitaria de Ingeniería Técnica Industrial de Barcelona, Universidad Politécnica de Cataluña",
						Timespan: "2010-2011",
					}
				]
			},
			NonAcademicTraining: {
				Title: "Formación complementaria",	
				Items: [
					{
						Title : "Curso sobre Raspberry Pi (20 horas)",		
						Description: "AESS Estudiants (UPC)",
						Timespan: "Febrero de 2014"
					},
					{
						Title : "Curso de PHP Básico (40 horas)",		
						Description: "JEDI Junior Empresa (UPC)",
						Timespan: "Junio de 2013"
					},
					{
						Title : "Curso de Introducción a Arduino (20 horas)",		
						Description: "AESS Estudiants (UPC)",
						Timespan: "Febrero de 2013"
					},
					{
						Title : "Curso de Seguridad Informática (20 horas)",		
						Description: "JEDI Junior Empresa (UPC)",
						Timespan: "Enero de 2013",
					},
					{
						Title : "Inglés de Verano IV (60 horas)",
						Description: "Escuela de Idiomas de la Universidad de Vic",
						Timespan: "Agosto de 2008",
					}
				]
			},
			WorkExperience: {
				Title: "Experiencia laboral",
				Items: [
					{
						Title : "Analista de Sistemas",
						Company: "<a class='white-anchor' href='http://http://tokiota.es/' target='_blank'>Tokiota</a>",		
						Description: "Desarrollador de microservicios ASP.NET",
						Timespan: "Diciembre de 2016 - Presente"
					},
					{
						Title : "Programador .NET - SharePoint",		
						Company: "<a class='white-anchor' href='http://www.itequia.com/es' target='_blank'>Itequia</a>",		
						Description: "Desarrollo de aplicaciones para Microsoft SharePoint. Distintos lenguajes (C#, Powershell, SQL, Javascript, etc.) i metodología ágil SCRUM.",
						Timespan: "Marzo de 2015 - Diciembre de 2016"
					},
					{
						Title : "Programador .NET - MVC",
						Company: "<a class='white-anchor' href='http://www.itequia.com/es' target='_blank'>Itequia</a>",		
						Description: "Desarrollo de proyectos MVC de la plataforma ASP.NET de Microsoft. Distintos lenguajes (C#, Javascript, HTML, etc.) i metodología ágil SCRUM.",
						Timespan: "Julio de 2014 - Septiembre de 2014"
					}
				]
			},
			Download : "Descargar"
		},
		'en' : {
			AcademicTraining: {
				Title: "Academic training",
				Items: [
					{
						Title : "Computer Engineering Degree",		
						Description: "Barcelona School of Informatics, Polytechnic University of Catalonia",
						Timespan: "2011-2015"
					},
					{
						Title : "Cambridge First Certificate of English",	
						Description: "Cambridge ESOL Exam Centre ES439 (Barcelona)",
						Timespan: "August of 2011",
					},
					{
						Title : "Industrial and Automatic Electronic Engineering Degree <em>(First year)</em>",		
						Description: "Barcelona College of Industrial Engineering (EUETIB), Polytechnic University of Catalonia",
						Timespan: "2010-2011",
					}
				]
			},
			NonAcademicTraining: {
				Title: "Additional training",
				Items:  [
					{
						Title : "Raspberry Pi course (20 hours)",		
						Description: "AESS Estudiants (UPC)",
						Timespan: "February of 2014"
					},
					{
						Title : "Basic PHP course (40 hours)",		
						Description: "JEDI Junior Empresa (UPC)",
						Timespan: "June of 2013"
					},
					{
						Title : "Arduino Introduction course (20 hours)",		
						Description: "AESS Estudiants (UPC)",
						Timespan: "February of 2013"
					},
					{
						Title : "Information Security course (20 hours)",		
						Description: "JEDI Junior Empresa (UPC)",
						Timespan: "January of 2013",
					},
					{
						Title : "Summer English IV (60 hours)",
						Description: "University of Vic Languages School",
						Timespan: "August of 2008",
					}
				]
			},
			WorkExperience: {
				Title: "Work experience",
				Items: [
					{
						Title : "System Analyst",
						Company: "<a class='white-anchor' href='http://http://tokiota.es/' target='_blank'>Tokiota</a>",		
						Description: "ASP.NET Microservices developer",
						Timespan: "December 2016 - Present"
					},
					{
						Title : ".NET Programmer - SharePoint",		
						Company: "<a class='white-anchor' href='http://www.itequia.com/ca' target='_blank'>Itequia</a>",		
						Description: "Micrsoft SharePoint applications development. Diferent languages (C#, Powershell, SQL, Javascript, etc.) and SCRUM agile methodolgy.",
						Timespan: "March 2015 - December 2016"
					},
					{
						Title : ".NET Programmer - MVC",
						Company: "<a class='white-anchor' href='http://www.itequia.com/ca' target='_blank'>Itequia</a>",		
						Description: "Microsoft ASP.NET MVC framework projects development. Diferent languages (C#, Javascript, HTML, etc.) and SCRUM agile methodolgy.",
						Timespan: "July 2014 - September 2014"
					}
				]
			},
			Download : "Download"
		}	
	}
	$scope.curriculum = $scope.curriculumContent['ca'];
	$scope.ImagesUrls = [
		"images/curriculum/academic-training.png",
		"images/curriculum/additional-training.png",
		"images/curriculum/work-experience.png"
	];
	$scope.downloadResume = function() {
		//window.open('pdfs/cv-' + $scope.currentLanguage + '.pdf');
		window.open('pdfs/cv.pdf');
	};
}]);