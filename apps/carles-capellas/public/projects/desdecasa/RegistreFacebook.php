<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

	<head>

		<title>Enviant</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

	</head>

	<body>
		
		<?php
			$nom = $_POST['nom'];
			$adreca = $_POST['adreca'];
			$correu = $_POST['correu'];
			$telf = $_POST['telefon'];
	     	$modalitat = $_POST['os'];
			$pagament = $_POST['os0'];

			if ($modalitat == "Estandard")  $preu = "5";  
			else $preu = "9"; 
				
	
			//E-mail per nosaltres

			$para = "desdecasavic@gmail.com";
			$asunto = $nom . " (Facebook)";
			
			$header = 'From: ' . $correu . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<html><body>';
			$mensaje .= '<h1>Dades del nou membre:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>" . $pagament . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat . "</td></tr>";
			$mensaje .= "<tr><td><strong>Preu:</strong> </td><td>" . $preu . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "</body></html>";
			

			mail($para, $asunto, utf8_decode($mensaje), $header);

			//E-mail per l'usuari

			if ($pagament == "Metalic") {	
			$para = $correu;
			$asunto = 'Registre confirmat';

			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Felicitats! Ja formes part de la comunitat DesdeCasa. Siusplau comprova que les teves dades s&oacute;n 		 correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adre&ccedil;a:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>Met&agrave;l&middot;lic</td></tr>";
			$mensaje .= "<tr><td><strong>Preu:</strong> </td><td>" . $preu ."&euro;"."</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			$mensaje .= "<p> T'enviarem un e-mail quan tinguem el teu carnet apunt per concretar el dia que te'l portarem a casa. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";
			//$mensaje .= "<p></p>";
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: L'equip de DesdeCasa.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/imatges/mailer.png" alt="DesdeCasa"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);	
			print "<meta http-equiv=Refresh content=\"2 ; url=http://desdecasacat.ipage.com/imatges/FacebookRegistre.png\">"; 
			}
			else{
				
			$para = $correu;
			$asunto = 'Registre confirmat';

			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Felicitats! Ja formes part de la comunitat DesdeCasa. Siusplau comprova que les teves dades s&oacute;n 		 correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adre&ccedil;a:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>Targeta o Paypal</td></tr>";
			$mensaje .= "<tr><td><strong>Preu:</strong> </td><td>" . $preu ."&euro;"."</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			$mensaje .= "<p> Quan hagis completat el pagament t'enviarem un e-mail per concretar el dia que et portarem el carnet a casa. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";
			//$mensaje .= "<p></p>";
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: L'equip DesdeCasa.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/imatges/mailer.png" alt="DesdeCasa"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);	
			include "PagarFacebook.html";
			
			}
		?>



	</body>
	
</html>
