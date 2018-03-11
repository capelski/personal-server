var fs = require('fs');
var path = require('path');

var titles = {
	ca: {
		cv: 'Curriculum Vitae',
		main: 'Inici',
		'not-found': 'Error',
		'not-ready': 'En construcció',
		projects: 'Projectes'
	},
	es: {
		cv: 'Curriculum Vitae',
		main: 'Inicio',
		'not-found': 'Error',
		'not-ready': 'En construcción',
		projects: 'Proyectos'
	},
	en: {
		cv: 'Curriculum Vitae',
		main: 'Home',
		'not-found': 'Error',
		'not-ready': 'Under construction',
		projects: 'Projects'
	}
};

var headerContent = {
    ca: [ 'Curriculum Vitae', 'Projectes', 'Sobre mi', 'Idioma', 'Català', 'Castellà', 'Anglès' ],
    es: [ 'Curriculum Vitae', 'Proyectos', 'Sobre mi', 'Idioma', 'Catalán', 'Castellano', 'Inglés' ],
    en: [ 'Curriculum Vitae', 'Projects', 'About me', 'Language', 'Catalan', 'Spanish', 'English' ]
};

var footerContent = {
    ca: [ 'Idiomes: ' ],
    es: [ 'Idiomas: ' ],
    en: [ 'Languages: ' ]
};

var content = {
	cv: {
		ca: [
			"Formació Acadèmica",
	
			"Grau en Enginyeria Informàtica <em>(En curs)</em>",		
			"Facultat d'Informàtica de Barcelona, Universitat Politècnica de Catalunya",
			"2011-Actualitat",
			"Grau en Enginyeria Electrònica Industrial i Automàtica <em>(Primer any)</em>",		
			"Escola Universitària d'Enginyeria Tècnica Industrial de Barcelona, Universitat Politècnica de Catalunya",
			"2010-2011",	
			"Batxillerat Tecnològic (LOGSE)",		
			"Institut Jaume Callís, Vic",
			"2008-2010",	
			"Educació Secundària Obligatòria",	
			"Institut Jaume Callís, Vic",
			"2004-2008",	
	
			"Formació No Acadèmica",
			
			"Curs sobre Raspberry Pi (20 hores)",
			"AESS Estudiants (UPC)",
			"Febrer de 2014",
			"Curs de PHP Bàsic (40 hores)",
			"JEDI Junior Empresa (UPC)",
			"Juny de 2013",
			"Curs d'Introducció a Arduino (20 hores)",
			"AESS Estudiants (UPC)",
			"Febrer de 2013",		
			"Curs de Seguretat Informàtica (20 hores)",
			"JEDI Junior Empresa (UPC)",
			"Gener de 2013",		
			"Cambridge First Certificate of English",
			"Cambridge ESOL Exam Centre ES439 (Barcelona)",
			"Agost de 2011",		
			"Anglès d'Estiu IV (60 hores)",
			"Escola d'Idiomes de la Universitat de Vic",
			"Agost de 2008",
	
			"Experiència Laboral",
	
			"Programador .NET",
			"Programador de diversos llenguatges (C#, Javascript, HTML, Bootstrap) dins el framework .NET de Microsoft a la consultoria tecnològica <a class=\"black-a\" href=\"http://www.itequia.com/\" target=\"_blank\">Itequia</a>. Metodologia de treball SCRUM",
			"Estiu de 2014",
	
			"Programador web i Emprenedor",
			"Desenvolupament web i gestió del projecte <a class=\"black-a\" href=\"projects/desdecasa/index.php\" target=\"_blank\">www.desdecasa.cat</a>.<br/> Disseny i desenvolupament de les pàgines web <a class=\"black-a\" href=\"http://www.restaurant-­do-­vic.cat\" target=\"_blank\">www.restaurant-­do-­vic.cat</a> i <a class=\"black-a\" href=\"http://www.poliesterpelegrina.cat\" target=\"_blank\">www.poliesterpelegrina.cat</a>",
			"2012-2014",
	
			"Programador Visual Basic",
			"500 hores de desenvolupament d'un programa de rentat industrial encarregat per l'empresa Proquimia S.A. en el marc del Treball de Recerca de Batxillerat",
			"2010-2011",
	
			"Descarregar"
		],
		es: [
			"Formación Academica",
	
			"Grado en Ingeniería Informática <em>(En curso)</em>",		
			"Facultad de Informática de Barcelona, Universidad Politécnica de Cataluña",
			"2011-Actualitad",
			"Grado en Ingeniería Electrónica Industrial i Automática <em>(Primer año)</em>",		
			"Escuela Universitaria de Ingeniería Técnica Industrial de Barcelona, Universidad Politécnica de Cataluña",
			"2010-2011",	
			"Bachillerato Tecnológico (LOGSE)",		
			"Instituto Jaume Callís, Vic",
			"2008-2010",	
			"Educación Secundaria Obligatoria",	
			"Instituto Jaume Callís, Vic",
			"2004-2008",	
	
			"Formación No Academica",
			
			"Curso sobre Raspberry Pi (20 horas)",
			"AESS Estudiants (UPC)",
			"Febrero de 2014",
			"Curso de PHP Básico (40 horas)",
			"JEDI Junior Empresa (UPC)",
			"Junio de 2013",
			"Curso de Introducción a Arduino (20 horas)",
			"AESS Estudiants (UPC)",
			"Febrero de 2013",		
			"Curso de Seguridad Informática (20 horas)",
			"JEDI Junior Empresa (UPC)",
			"Enero de 2013",		
			"Cambridge First Certificate of English",
			"Cambridge ESOL Exam Centre ES439 (Barcelona)",
			"Agosto de 2011",		
			"Inglés de Verano IV (60 horas)",
			"Escuela de Idiomas de la Universidad de Vic",
			"Agosto de 2008",
	
			"Experiencia Laboral",
	
			"Programador .NET",
			"Programador de distintos lenguajes (C#, Javascript, HTML, Bootstrap) dentro del framework .NET de Microsoft en la consultoria tecnológica <a class=\"black-a\" href=\"http://www.itequia.com\" target=\"_blank\">Itequia</a>. Metodologia de trabajo SCRUM",
			"Verano de 2014",
			
			"Programador web i Emprendedor",
			"Desarrollo web y gestión del proyecto <a class=\"black-a\" href=\"projects/desdecasa/index.php\" target=\"_blank\">www.desdecasa.cat</a>.<br/> Diseño i desarrollo de las páginas web <a class=\"black-a\" href=\"http://www.restaurant-­do-­vic.cat\" target=\"_blank\">www.restaurant-­do-­vic.cat</a> y <a class=\"black-a\" href=\"http://www.poliesterpelegrina.cat\" target=\"_blank\">www.poliesterpelegrina.cat</a>",
			"2012-2014",
	
			"Programador Visual Basic",
			"500 horas de desarrollo de un programa de lavado industrial encargado por la empresa Proquimia S.A. en el marco del Treball de Recerca de Bachillerato",
			"2010-2011",
	
			"Descargar"
		],
		en: [
			"Academic Training",
	
			"Computer Engineering Degree <em>(In progress)</em>",		
			"Barcelona School of Informatics, Polytechnic University of Catalonia",
			"2011-Nowadays",
			"Industrial and Automatic Electronic Engineering Degree <em>(First year)</em>",		
			"Barcelona College of Industrial Engineering (EUETIB), Polytechnic University of Catalonia",
			"2010-2011",	
			"Technological General Certificate of Education (LOGSE)",
			"Jaume Callís Institute, Vic",
			"2008-2010",	
			"General Certificate of Secondary Education",	
			"Jaume Callís Institute, Vic",
			"2004-2008",	
	
			"Non-academic Training",
			
			"Raspberry Pi course (20 hours)",
			"AESS Estudiants (UPC)",
			"February of 2014",
			"Basic PHP course (40 hours)",
			"JEDI Junior Empresa (UPC)",
			"June of 2013",
			"Arduino Introduction course (20 hours)",
			"AESS Estudiants (UPC)",
			"February of 2013",		
			"Information Security course (20 hours)",
			"JEDI Junior Empresa (UPC)",
			"January of 2013",		
			"Cambridge First Certificate of English",
			"Cambridge ESOL Exam Centre ES439 (Barcelona)",
			"August of 2011",	
			"Summer English IV (60 hours)",
			"University of Vic Languages School",
			"August of 2008",
	
			"Work Experience",
	
			".NET Programmer",
			"Multiple languages (C#, Javascript, HTML, Bootstrap) programmer in .NET Microsoft framework for <a class=\"black-a\" href=\"http://www.itequia.com/\" target=\"_blank\">Itequia</a> technology consulting. Working with SCRUM methodolgy",
			"Summer of 2014",
	
			"Web Programmer and Entrepreneur",
			"Web development and management of the <a class=\"black-a\" href=\"projects/desdecasa/index.php\" target=\"_blank\">www.desdecasa.cat</a> project.<br/> Design and development of the websites <a class=\"black-a\" href=\"http://www.restaurant-­do-­vic.cat\" target=\"_blank\">www.restaurant-­do-­vic.cat</a> and <a class=\"black-a\" href=\"http://www.poliesterpelegrina.cat\" target=\"_blank\">www.poliesterpelegrina.cat</a>",
			"2012-2014",
	
			"Visual Basic Programmer",
			"500 hours development of a industrial laundry program for Proquimia S.A. inside the context of GCE's 'Treball de Recerca'",
			"2010-2011",
	
			"Download"
		]
	},
	main: {
		ca: [
			"Enginyer informàtic i dissenyador web. Vull ajudar-te a desenvolupar les teves idees, envia'm un correu i parlem-ne!",
			"Consulta la meva formació acadèmica i experiència professional en aquest apartat. També pots descarregar-te el meu Curriculum Vitae en format PDF.",
			"Aquí trobaràs un llistat d'alguns dels projectes en els que he treballat, tant en l'àmbit acadèmic com en iniciatives pròpies.",
			"En aquesta secció pots accedir a diferents tipus de contingut personal que tinc penjat a internet i descobrir que faig en el meu temps lliure."
		],
		es: [
			"Ingeniero informático i diseñador web. Quiero ayudarte a desarrollar tus ideas, mandame un correo y hablemos de ellas!",
			"Consulta mi formación académica i experiencia profesional en este apartado. Tambien puedes descaregarte mi Curriculum Vitae en formato PDF.",
			"Aquí encontrarás un listado de algunos de los proyectos en els que he trabajado, tanto en el ámbito acadèmico com en iniciativas propias.",
			"En esta sección puedes acceder a distintos tipos de contenido personal que tengo colgados a internet y descubrir que hago en mi tiempo libre."
		],
		en: [
			"Computer engineer and web designer. I want to help you developing your ideas, send me a mail and let's talk about them!",
			"Check out my academic training and profesional experience in this section. You can also download my Curriculum Vitae in PDF format.",
			"Here you will find a list with some of the projects I have been working on, in both academic area and personal initiatives.",
			"In this section you can access diferent type of personal content I host on the internet and discover what I do with my free time."
		]
	},
	'not-found': {
		ca: [
			"La pàgina que busques no existeix"
		],
		es: [
			"La página que buscas no existe"
		],
		en: [
			"The page you are looking for doesn't exist"		
		]
	},
	'not-ready': {
		ca: [
			"La pàgina que busques està en procés de construcció"
		],
		es: [
			"La página que buscas está en proceso de construcción"
		],
		en: [
			"The page you are looking for is under construction"		
		]
	},
	projects: {
		ca: [
			"Desdecasa",
			"15 de Juny de 2012 - 31 de Desembre de 2013",
			"Iniciativa pròpia, juntament amb Eudald Bover, per promocionar la restauració a la ciutat de Vic. La pàgina web oferia informació gratuïta dels establiments i, adicionalment, els usuaris que es feien la targeta de soci obtenien descomptes en tots els locals associats a la pàgina.",
	
			"Restaurant D.O. Vic",
			"13 d'Abril de 2013 - Actualitat",
			"Primera versió de la pàgina web del restaurant Denominació d'Origen Vic per encàrrec del propietari del local. Permet consultar informació útil del restaurant, fer reserves i descarregar els menús del local.",
	
			"Poliesters Pelegrina",
			"12 de Març de 2014 - Actualitat",
			"Pàgina web de l'empresa Poliester Germans Pelegrina S.C.P., a petició dels fundadors amb l'objectiu de tenir presència a internet després de més de 20 anys d'activitat en el negoci.",
	
	
			"Gestor de comandes",
			"Primavera del 2014",
			"Aplicació Android que permet definir els productes que es venen en un establiment i gestionar comandes de clients. Desenvolupada mitjançant App Inventor 2 per una assignatura de la enginyeria informàtica."
		],
		es: [
			"Desdecasa",
			"15 de Junio de 2012 - 31 de Diciembre de 2013",
			"Iniciativa propia, junto con Eudald Bover, para promocionar la restauración en la ciudad de Vic. La página web ofrecía información gratuita de los establecimientos y, adicionalmente, los usuarios que se hacian la tarjeta de socio obtenían descuentos en todos los locales asociados a la página.",
	
			"Restaurante D.O. Vic",
			"13 de Abril de 2013 - Actualidad",
			"Primera versión de la página web del restaurante Denominación de Origen Vic por encargo del propietario del local. Permite consultar información útil del restaurante, hacer reservas y descaregar los menús del local.",
	
			"Poliesters Pelegrina",
			"12 de Marzo de 2014 - Actualidad",
			"Página web de la empresa Poliester Germans Pelegrina S.C.P., a petición de los fundadores con el objetivo de tener presencia en internet después de mas de 20 años de actividad en el negocio.",
	
	
			"Gestor de pedidos",
			"Primavera del 2014",
			"Aplicación Android que permite definir los productos que se venden en un establecimiento y gestionar pedidos de clientes. Desarrollada mediante App Inventor 2 para una asignatura de la ingenieria informática."
		],
		en: [
			"Desdecasa",
			"June 15th, 2012 - December 31st, 2013",
			"Own initiative, together with Eudald Bover, to stimulate the economy of the restaurants in Vic. The web page ofered free information of the establishments and, additionally, the users who got the partner card obtained discounts in all the locals associated to the page.",
	
			"D.O. Vic Restaurant ",
			"April 13th, 2013 - Nowadays",
			"First version of the restaurant D.O. Vic website, commissioned by the owner of the establishment. Allows consulting useful information of the restaurant, make reservations and download the menus of the local.",
	
			"Pelegrina Poliesters",
			"March 12th, 2014 - Nowadays",
			"Web page of the company Poliester Germans Pelegrina S.C.P. by request of the founders in order to have presence on internet after more than 20 years in the market.",
	
			"Orders manager",
			"Spring of 2014",
			"Android application that allows to define the products sold in an establishment and manage client orders. Developed with App Inventor 2 for a subject of the informatics degree."
		]
	}
};

function PagesController() {

	function resolve(req, res, next) {
		var navigation = req.session.navigation = req.session.navigation || {};
		navigation.language = req.query.language || navigation.language || 'ca';
		navigation.page = req.query.page || 'main';

		var filePath = path.resolve(__dirname, '..', 'views', navigation.page + '.ejs')
		if (!fs.existsSync(filePath)) {
			navigation.page = 'not-found';
		}

		res.render('index', {
			page: navigation.page,
			rawPage: navigation.page,
			title: titles[navigation.language][navigation.page],
			content: content[navigation.page][navigation.language],
			footerContent: footerContent[navigation.language],
			headerContent: headerContent[navigation.language],
			language: navigation.language
		});
	}

	return {
		resolve
	};
}

module.exports = PagesController();
