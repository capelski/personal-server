<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

	<head>

		<title>...</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

	</head>

	<body>
		
		<?php

			$modalitat = $_POST['os'];

			$para = "desdecasavic@gmail.com";
			$asunto = "Feedback";
			
			$header = 'From: ' . "info@desdecasa.cat" ." \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			
			
			$mensaje = $modalitat ;
			
			
 
			mail($para, $asunto, utf8_decode($mensaje), $header);

		?>
        
        <meta http-equiv="refresh" content="0;URL=AltaResposta.php">

	</body>
	
</html>
