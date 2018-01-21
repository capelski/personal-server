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
			$comentari = $_POST['comentari'];

			//E-mail per nosaltres

			$para = "desdecasavic@gmail.com";
			$asunto = "Contacte";
			
			$header = 'From: ' . $correu . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			$mensaje = '<html><body>';
			$mensaje .= '<p>Nom i Cognoms: ' . $correu .'</p>';
			$mensaje .= '<p>Correu: ' . $correu .'</p>';
			$mensaje .= '<p>Consulta: ' . $comentari .'</p>';
			$mensaje .= "</body></html>";
			
			mail($para, $asunto, utf8_decode($mensaje), $header);

		?>
<script>
alert ("Missatge enviat correctament!");
</script>
		<meta http-equiv="refresh" content="0;URL=index.php">

	</body>
	
</html>
