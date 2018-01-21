<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

	<head>
    	<link rel="Shortcut Icon"  href="http://desdecasacat.ipage.com/favicon.ico" /> 	
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<title>Millors Ofertes - DesdeCasa</title>
		  <meta name="keywords" content="desdecasa,descomptes,vic,Vic,ofertes,restaurants,bars,osona,Osona" />
        <meta name="description" content="Aconsegueix descomptes exclusius als bars i restaurants de Vic. Ofertes dels establiments de la capital d'Osona." />
		<link href="estil.css" rel="stylesheet" type="text/css" media="screen" />
		<link href='http://fonts.googleapis.com/css?family=Karla' rel='stylesheet' type='text/css'>
        <link href="Ofertes/ofertes.css" media="screen" rel="stylesheet">
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
	<script src="Ofertes/ofertes.js"></script>

	<!-- Demo only -->	<link href="Ofertes/demo.css" media="screen" rel="stylesheet">
	<style>
		/* Dimensions set via css in MovingBoxes version 2.2.2+ */
		#slider { width: 800px; }
		#slider li { width: 300px; }
	</style>
	<script>
	$(function(){

		$('#slider').movingBoxes({
			/* width and panelWidth options deprecated, but still work to keep the plugin backwards compatible
			width: 500,
			panelWidth: 0.5,
			*/
			startPanel   : 1,      // start with this panel
			wrap         : true,   // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
			buildNav     : true,   // if true, navigation links will be added
			navFormatter : function(){ return "&#9679;"; } // function which returns the navigation text for each panel
		});

	});
	</script>
        
	</head>
	
    <body><div id="mainbg">
	
		<?php include 'Header.html' ?>

		<!-- Contingut de la pàgina -->
 
		<p>&nbsp;</p> 
		<p>&nbsp;</p>
        
		<div id="wrapper">

		<!-- MovingBoxes Slider -->
		<ul id="slider">

			<li><img src="Ofertes/1.png" alt="picture"></li>

			<li><img src="Ofertes/2.png" alt="picture"></li>

			<li><img src="Ofertes/3.png" alt="picture"></li>

			<li><img src="Ofertes/4.png" alt="picture"></li>
	
			<li><img src="Ofertes/5.png" alt="picture"></li> 

			<li><img src="Ofertes/6.png" alt="picture"></li> 
            
            <li><img src="Ofertes/7.png" alt="picture"></li>

		</ul> <!-- end Slider #1 -->

		</div> <!-- end wrapper -->

		<p>&nbsp;</p>
	
		<!-- Peu de pàgina -->
		
		<div id="main">
       <div id="buttons2"> 
      	<ul>
        <li><font face="Georgia, Times New Roman, Times, serif"><a href="https://twitter.com/DesdeCasa_cat" title="" target="_blank" class="active"><strong></strong></a></font></li>
        <li><font face="Georgia, Times New Roman, Times, serif"><a href="Anunciat.php" title=""><strong>Vols anunciar-te?</strong></a></font></li>
        <li><font face="Georgia, Times New Roman, Times, serif"><a href="Contacte.php" title=""><strong>Contacta'ns</strong></a></font></li>
        <li><font face="Times New Roman, Times, serif"><a href="Legal.php" title=""><strong>Av&iacute;s legal</strong></a></font></li>
        <li><font face="Times New Roman, Times, serif"><a href="http://www.facebook.com/DesdeCasa.cat" title="" target="_blank"><strong> </strong></a></font></li>
      	</ul>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
</div>
        </div>
	    </div>
        </div>
		
		
		<!-- Google Analitycs -->
		
		<script type="text/javascript">

			var _gaq = _gaq || [];
  			_gaq.push(['_setAccount', 'UA-25082308-1']);
  			_gaq.push(['_trackPageview']);

  			(function() {
    			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  			})();

		</script>
		
	</body>
	
</html>
