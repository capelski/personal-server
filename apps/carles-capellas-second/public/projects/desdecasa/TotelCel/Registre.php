<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

	<head>

		<title>Enviant</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

	</head>

	<body>
		
		<?php
			$nom = $_POST['nom'];
			$correu = $_POST['correu'];
			$telf = $_POST['telefon'];
			$regim = $_POST['os1'];
	     	$acompanyants = $_POST['os'];
			$dataent = $_POST['datum1'];
			$datasor = $_POST['datum2'];
			$comentari = $_POST['comentari'];

			//E-mail per nosaltres

			$para = "desdecasavic@gmail.com";
			$asunto = 'Reserva TotelCel';
			
			$header = 'From: ' . $correu . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<html><body>';
			$mensaje .= '<h1>Dades de la reserva:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>R&egrave;gim:</strong> </td><td>" . $regim . "</td></tr>";
			$mensaje .= "<tr><td><strong>Acompanyants:</strong> </td><td>" . $acompanyants . "</td></tr>";
			$mensaje .= "<tr><td><strong>Data d'entrada:</strong> </td><td>" . $dataent . "</td></tr>";
			$mensaje .= "<tr><td><strong>Data de sortida:</strong> </td><td>" . $datasor . "</td></tr>";
			$mensaje .= "<tr><td><strong>Comentari:</strong> </td><td>" . $comentari . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "</body></html>";
			
			mail($para, $asunto, utf8_decode($mensaje), $header);


            $para = "cantonigros@gmail.com";
			$asunto = 'Reserva TotelCel';
			
			$header = 'From: ' . $correu . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<html><body>';
			$mensaje .= '<h1>Dades de la reserva:</h1>';
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Telefon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>R&egrave;gim:</strong> </td><td>" . $regim . "</td></tr>";
			$mensaje .= "<tr><td><strong>Acompanyants:</strong> </td><td>" . $acompanyants . "</td></tr>";
			$mensaje .= "<tr><td><strong>Data d'entrada:</strong> </td><td>" . $dataent . "</td></tr>";
			$mensaje .= "<tr><td><strong>Data de sortida:</strong> </td><td>" . $datasor . "</td></tr>";
			$mensaje .= "<tr><td><strong>Comentari:</strong> </td><td>" . $comentari . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "</body></html>";
			
			mail($para, $asunto, utf8_decode($mensaje), $header);



			//E-mail per l'usuari

			$para = $correu;
			$asunto = 'Reserva enviada';

			$header = 'From: ' . "apartaments.cantonigros@gmail.com" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<FONT STYLE="face: Arial; font-size: 15px; color: #000000; font-style: normal; text-decoration: none">';
			$mensaje .= "<p>Gr&agrave;cies! Acabem de rebre la teva reserva. Siusplau comprova que les teves dades s&oacute;n correctes:</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= '<table rules="all" style="border-color: #666;" cellpadding="15" align="center">';
			$mensaje .= "<tr style='background: #eee;'><td><strong>Nom i cognoms:</strong> </td><td>" . $nom . "</td></tr>";
			$mensaje .= "<tr><td><strong>E-mail:</strong> </td><td>". $correu . "</td></tr>";
			$mensaje .= "<tr><td><strong>Tel&egrave;fon:</strong> </td><td>" . $telf . "</td></tr>";
			$mensaje .= "<tr><td><strong>R&egrave;gim:</strong> </td><td>" . $regim . "</td></tr>";
			$mensaje .= "<tr><td><strong>Acompanyants:</strong> </td><td>" . $acompanyants . "</td></tr>";
			$mensaje .= "<tr><td><strong>Data d'entrada:</strong> </td><td>" . $dataent . "</td></tr>";
			$mensaje .= "<tr><td><strong>Data de sortida:</strong> </td><td>" . $datasor . "</td></tr>";
			$mensaje .= "<tr><td><strong>Comentari:</strong> </td><td>" . $comentari . "</td></tr>";
			$mensaje .= "</table>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>"; 
			$mensaje .= "<p> Et trucarem o t'enviarem un e-mail per confirmar la reserva tant bon punt comprovem que les dates est&agrave;n disponibles. </br> Moltes gr&agrave;cies per escollir els allotjaments TotelCel. Esperem que passis una bona estada i que ens recomanis als teus amics! </p>";
			$mensaje .= "<p>Per qualsevol dubte, contacta'ns.</p>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<br> </br>";
			$mensaje .= "<p>Atentament: TotelCel.</p>";
			$mensaje .= '<img src="http://desdecasacat.ipage.com/TotelCel/mailer.jpg" alt="TotelCel"/>';

			mail($para, $asunto, utf8_decode($mensaje), $header);	
			
		?>

<meta http-equiv="refresh" content="0;URL=http://desdecasacat.ipage.com/TotelCel/alta.png">


	</body>
	
</html>
