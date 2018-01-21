<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

	<head>

		<title>Enviant</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

	</head>

	<body>
		
		<?php
		
			//Dades del que fa el regal
			
			$nom = $_POST['nom'];
			$adreca = $_POST['adreca'];
			$correu = $_POST['correu'];
			$telf = $_POST['telefon'];
	     	$modalitat = $_POST['os'];
			$pagament = $_POST['os0'];
			
			//Dades de la persona que rep el regal
			
			$nom2 = $_POST['nom2'];
			$adreca2 = $_POST['adreca2'];
			$correu2 = $_POST['correu2'];
			$telf2 = $_POST['telefon2'];
	     	$modalitat2 = $_POST['os2'];
			
			$enviament = $_POST['radio'];
			
			if ($modalitat2 == "Estandard")  $preu = "5";  
			else $preu = "9"; 


			//Dos carnets
			if ($modalitat != "Cap")
			{
				//Calculem el preu total
				if ($modalitat == "Estandard") $preu = $preu + 4;
				else $preu = $preu + 7.2;
				
			//E-mail per nosaltres

			$para = "desdecasavic@gmail.com";
			$asunto = 'Carnet + Regal';
			
			$header = 'From: ' . $correu . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<html><body>';
			$mensaje .= '<h1>Dades del nou membre:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca2 .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat2 . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= '<h1>Carnet de la persona que fa el regal:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat . "</td></tr>";
			$mensaje .= "<tr><td><strong>Preu total:</strong> </td><td>" . $preu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>" . $pagament . "</td></tr>";
			$mensaje .= "<tr><td><strong>Enviament:</strong> </td><td>" . $enviament . "</td></tr>";
			$mensaje .= "</table>";			
			$mensaje .= "</body></html>";			
			
			mail($para, $asunto, utf8_decode($mensaje), $header);

			//E-mail per l'usuari

			//Dos carnets + pagament metàl·lic
			if ($pagament == "Metalic")
			 {	
			$para = $correu;
			$asunto = 'Carnet+Regal confirmat';

			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<br> </br>";
			$mensaje .= "<p> Hola! Hem rebut la teva sol&middot;licitud de regal. Comprova que les dades que ens has proporcionat  s&oacute;n correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adre&ccedil;a:</strong> </td><td>" . $adreca2 .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat2 . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= 'Aquestes s&oacute;n les teves dades de soci:';
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>Met&agrave;l&middot;lic</td></tr>";
			$mensaje .= "<tr><td><strong>Preu total: </strong></td><td>" . $preu. "</td></tr>";	
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			$mensaje .= "<p> T'enviarem un e-mail o et trucarem quan tinguem els carnets apunt per concretar el dia que te'ls portarem a casa. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: L'equip de DesdeCasa.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/imatges/mailer.png" alt="DesdeCasa"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);			
			include "Alta.php"; 
			}
			else
			{	
			// Dos carnets + Pagament Targeta
			$para = $correu;
			$asunto = 'Carnet+Regal confirmat';

			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<br> </br>";
			$mensaje .= "<p> Hola! Hem rebut la teva sol&middot;licitud de regal. Comprova que les dades que ens has proporcionat  s&oacute;n correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adre&ccedil;a:</strong> </td><td>" . $adreca2 .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat2 . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= '<h1>Aquestes s&oacute;n les teves dades de soci:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td> Targeta o PayPal </td></tr>";
			$mensaje .= "<tr><td><strong>Preu total: </strong></td><td>" . $preu. "</td></tr>";	
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			if($enviament="Remitent"){
			$mensaje .= "<p> Quan hagis completat el pagament t'enviarem un e-mail o et trucarem per concretar el dia que et portarem els carnets a casa. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";}
			else
			{
			$mensaje .= "<p> Quan hagis completat el pagament enviarem el carnet regal a casa del destinatari, i et portarem el teu. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";				
			}
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: L'equip DesdeCasa.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/imatges/mailer.png" alt="DesdeCasa"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);	
			if($preu=="9")	$modalitat="2x Estandard";
			if($preu=="12.20")	$modalitat="Estandard + Premium";
			if($preu=="13")	$modalitat="Premium + Estandard";
			if($preu=="16.20")	$modalitat="2x Premium";						
			include "PagarRegal.html";
						
			}
			
			}
		
			//Nomes un carnet
		
			else
			{
				
			//E-mail per nosaltres

			$para = "desdecasavic@gmail.com";
			$asunto = 'Regal per: ' . $nom2;
			
			$header = 'From: ' . $correu . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<html><body>';
			$mensaje .= '<h1>Dades del nou membre:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca2 .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Preu:</strong> </td><td>" . $preu . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= '<h1>Dades de la persona que fa el regal:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adreca:</strong> </td><td>" . $adreca .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>" . $pagament . "</td></tr>";
			$mensaje .= "<tr><td><strong>Enviament:</strong> </td><td>" . $enviament . "</td></tr>";
			$mensaje .= "</table>";			
			$mensaje .= "</body></html>";			
			
			mail($para, $asunto, utf8_decode($mensaje), $header);

			//E-mail per l'usuari


			//Nomes un carnet, pagant en metalic
			if ($pagament == "Metalic")
			 {	
			$para = $correu;
			$asunto = 'Regal confirmat';

			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<br> </br>";
			$mensaje .= "<p> Hola! Hem rebut la teva sol&middot;licitud de regal. Comprova que les dades que ens has proporcionat  s&oacute;n correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adre&ccedil;a:</strong> </td><td>" . $adreca2 .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>Met&agrave;l&middot;lic</td></tr>";
			$mensaje .= "<tr><td><strong>Preu:</strong> </td><td>" . $preu ."&euro;"."</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			$mensaje .= "<p> T'enviarem un e-mail o et trucarem quan tinguem el carnet apunt per concretar el dia que te'l portarem a casa. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: L'equip de DesdeCasa.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/imatges/mailer.png" alt="DesdeCasa"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);	
			include "Alta.php";  // header( "Location: index.html");
			}
			else
			{	
			//Un carnet, targeta
			$para = $correu;
			$asunto = 'Registre confirmat';

			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<br> </br>";
			$mensaje .= "<p> Hola! Hem rebut la teva sol&middot;licitud de regal. Comprova que les dades que ens has proporcionat  s&oacute;n correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Adre&ccedil;a:</strong> </td><td>" . $adreca2 .  "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Modalitat:</strong> </td><td>" . $modalitat2 . "</td></tr>";
			$mensaje .= "<tr><td><strong>Pagament:</strong> </td><td>Targeta o Paypal</td></tr>";
			$mensaje .= "<tr><td><strong>Preu:</strong> </td><td>" . $preu ."&euro;"."</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			if($enviament="Remitent"){
			$mensaje .= "<p> Quan hagis completat el pagament t'enviarem un e-mail o et trucarem per concretar el dia que et portarem el carnet a casa. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";}
			else
			{
			$mensaje .= "<p> Quan hagis completat el pagament enviarem el carnet a casa del destinatari. Moltes gr&agrave;cies per confiar en el nostre servei. Esperem que et sigui &uacute;til i que ens recomanis als teus amics! </p>";				
			}
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: L'equip DesdeCasa.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/imatges/mailer.png" alt="DesdeCasa"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);	
			$modalitat = $modalitat2;			
			include "Pagar.html";						
			}
			
			}
		?>



	</body>
	
</html>
