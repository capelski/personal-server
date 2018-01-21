<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    
<head>
    	<link rel="Shortcut Icon"  href="http://desdecasacat.ipage.com/favicon.ico" /> 	
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anuncia't - DesdeCasa</title>
      <meta name="keywords" content="desdecasa,descomptes,vic,Vic,ofertes,restaurants,bars,osona,Osona" />
        <meta name="description" content="Aconsegueix descomptes exclusius als bars i restaurants de Vic. Ofertes dels establiments de la capital d'Osona." />
        <link href="estil.css" rel="stylesheet" type="text/css" media="screen" />
        <link href='http://fonts.googleapis.com/css?family=Karla' rel='stylesheet' type='text/css'>
<script type="text/javascript">
function MM_validateForm() { //v4.0
  if (document.getElementById){
    var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
    for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=document.getElementById(args[i]);
      if (val) { nm=val.name; if ((val=val.value)!="") {
        if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
          if (p<1 || p==(val.length-1)) errors+='- El camp '+nm+' ha de contenir una adreça electrònica vàlida.\n';
        } else if (test!='R') { num = parseFloat(val);
          if (isNaN(val)) errors+='- '+nm+'  ha de contenir un número.\n';
          if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
            min=test.substring(8,p); max=test.substring(p+1);
            if (num<min || max<num) errors+='- El camp '+nm+' ha de contenir un nombre entre '+min+' i '+max+'.\n';
      } } } else if (test.charAt(0) == 'R') errors += '- El camp '+nm+' és obligatori.\n'; }
    } if (errors) alert('Han aparegut els següents errors:\n'+errors);
    document.MM_returnValue = (errors == '');
} }
        </script>
</head>
	
<body><div id="mainbg">

        <?php include 'Header.html'?>
    
		<!-- Contingut de la pàgina -->
		<p align="center">&nbsp;</p>
		<table width="100%" border="0">
		  <tr>
		    <td colspan="3"><p><font color="#FFFFFF" size="3" face="Karla">Omple el següent formulari per contactar amb nosaltres en cas de voler-te anunciar. Hi ha la possibilitat d'anunciar-te a la web, a les targetes, oferint descomptes als nostres socis, etc... Estem oberts a propostes. Et contestarem tant aviat com sigui possible. Gràcies per la teva paciència.</font>
	        </p>
	        <p>&nbsp;</p></td>
	      </tr>
		  <tr>
		    <td width="11%"><p>&nbsp;</p>
<p>&nbsp;</p></td>
		    <td width="58%"><form id="form1" method="post" action="ContacteAccio.php">
		      <table width="100%" border="0">
		        <tr>
		          <td width="27%"><font color="#FFFFFF" size="3" face="Karla">Nom i Cognoms:</font></td>
		          <td width="73%"><label for="textfield"></label>
	              <input name="nom" type="text" id="nom" size="47" maxlength="47" /></td>
	            </tr>
		        <tr>
		          <td><font color="#FFFFFF" size="3" face="Karla">Correu:</font></td>
		          <td><input name="correu" type="text" id="correu" size="47" maxlength="47" /></td>
	            </tr>
		        <tr>
		          <td><font color="#FFFFFF" size="3" face="Karla">Comentari:</font></td>
		          <td><label for="textarea2"></label>
	              <textarea name="comentari" id="comentari" cols="36" rows="5"></textarea></td>
	            </tr>
		        <tr>
		          <td colspan="2" align="center"><input name="button" type="submit" id="button" onclick="MM_validateForm('nom','','R','correu','','RisEmail','comentari','','R');return document.MM_returnValue" value="Enviar" /></td>
	            </tr>
	          </table>
	        </form></td>
		    <td width="31%">  <img src="imatges/Anuncia't.gif" alt="" width="125" align="middle" height="195" /></td>
	      </tr>
		  </table>
          
		<p>&nbsp;</p>

	<?php include 'Footer.html' ?>
		
</div></body>
	
</html>
