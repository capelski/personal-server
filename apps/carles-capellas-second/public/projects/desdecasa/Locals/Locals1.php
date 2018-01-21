<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php include 'Includes.html' ?>
	
<body><div id="mainbg">
            
	<?php include 'Header.html' ?>
 
	<p align="left">&nbsp;</p>
	<p align="left"><font color="#FFFFFF" size="3">Aquest són tots els establiments que formen part de DesdeCasa, amb els seus respectius descomptes. Tots els descomptes indicats  s'aplicaran quan es mostri la targeta de soci durant el pagament del compte. Per més informació sobre l'establiment i les condicions de cada descompte, clica les pestanyes.</font></p>
    <p align="left">&nbsp;</p>
    <div id="listado_estrenos"><div id="destacado"><div class="cartolina">
    <table width="100%" height="30px" ><tr><td><p align="center">
	
    <input type="submit" disabled="true"  name="button"  id="button" value="  Mostra per Dia  " />
	<select onchange="selectday()" id="Opcio" name="Opcio">
		<option id="7" value="7">- Seleccionar dia -</option>
		<option id="1" value="1" selected="selected">Dilluns</option>
		<option id="2" value="2">Dimarts</option>
        <option id="3" value="3">Dimecres</option>
		<option id="4" value="4">Dijous</option>
        <option id="5" value="5">Divendres</option>
		<option id="6" value="6">Dissabte</option>
		<option id="0" value="0">Diumenge</option>
	</select> 
	<img src="../imatges/dl.png" alt="" width="328" height="17" />    
    <input type="submit" name="button" onclick="window.location.href='LocalsAlf.php'" id="button" value="Mostra'ls tots alfabèticament" />
    <input type="submit" name="button" onclick="window.location.href='LocalsDte.php'"  id="button" value="Mostra'ls tots per descomptes" />
	
    </p></td></tr></table></div></div></div>
    
	<p align="center">&nbsp;</p>    
	<p align="center">&nbsp;</p>
    
	<ul class="tabs">
		<li><a href="#tab1"><img src="../imatges/Dinar.png" alt="" width="263" height="21" border="0"/></a></li>
    	<li><a href="#tab2"><img src="../imatges/Sopar.png" alt="" width="263" height="21" border="0" /></a></li>
		<li><a href="#tab4"><img src="../imatges/QualsevolHora.png" alt="" width="261" height="21" border="0" /></a></li>
	</ul>

	<div class="tab_container">
    
 		<div id="tab1" class="tab_content"><p>&nbsp; <!--Content--></p>
            
			<div id="CollapsiblePanel1" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElCeller1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElCeller2.html' ?></div></div>                
                
			<div id="CollapsiblePanel2" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Basset1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Basset2.html' ?></div></div>
                                
			<div id="CollapsiblePanel3" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/OperaBarroca1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/OperaBarroca2.html' ?></div></div>
                
			<div id="CollapsiblePanel4" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/MagdaSubirana1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/MagdaSubirana2.html' ?></div></div>       
       
			<div id="CollapsiblePanel5" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Transilvania1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Transilvania2.html' ?></div></div>        
        
			<div id="CollapsiblePanel6" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LOccita1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LOccita2.html' ?></div></div>
                
			<div id="CollapsiblePanel7" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LaTavernaGruixut1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LaTavernaGruixut2.html' ?></div></div>       
    
		</div>

		<div id="tab2" class="tab_content"><p>&nbsp; <!--Content--></p>
            
			<div id="CollapsiblePanel8" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElBohemi1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElBohemi2.html' ?></div></div>        
                
			<div id="CollapsiblePanel9" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Basset1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Basset2.html' ?></div></div>                         
       
			<div id="CollapsiblePanel10" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/OperaBarroca1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/OperaBarroca2.html' ?></div></div>    
        
			<div id="CollapsiblePanel11" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Transilvania1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Transilvania2.html' ?></div></div>           
      
			<div id="CollapsiblePanel12" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElTast1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElTast2.html' ?></div></div>        

			<div id="CollapsiblePanel13" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Montapa1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Montapa2.html' ?></div></div>  
        
		</div>    
        
		<div id="tab4" class="tab_content"><p>&nbsp; <!--Content--></p>
      
			<div id="CollapsiblePanel14" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarSolNou1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarSolNou2.html' ?></div></div>        
      
			<div id="CollapsiblePanel15" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CanBernat1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/CanBernat2.html' ?></div></div>  
    
			<div id="CollapsiblePanel16" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CafeteriaSucre1.html'?></div>
			<div class="CollapsiblePanelContent">
  			<?php include 'FitxesR/CafeteriaSucre2.html' ?></div></div>      
    
			<div id="CollapsiblePanel17" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LOccita1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LOccita2.html' ?></div></div>  

			<div id="CollapsiblePanel18" class="CollapsiblePanel">
            <div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CanSileta1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/CanSileta2.html' ?></div></div>     

			<div id="CollapsiblePanel19" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LaCanya1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LaCanya2.html' ?></div></div> 
            
			<div id="CollapsiblePanel20" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Montapa1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Montapa2.html' ?></div></div>                                 
       
			<div id="CollapsiblePanel21" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElTast1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElTast2.html' ?></div></div> 
            
			<div id="CollapsiblePanel22" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LaTorrada1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LaTorrada2.html' ?></div></div>             

			<div id="CollapsiblePanel23" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/OsonaBarCafeteria1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/OsonaBarCafeteria2.html' ?></div></div>                    
            
			<div id="CollapsiblePanel24" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarSofia1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarSofia2.html' ?></div></div>             
            
		</div>
        
	</div>

	<p>&nbsp;</p>

	<?php include 'Footer.html' ?>


	<script type="text/javascript">
		var CollapsiblePanel1 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel1", {contentIsOpen:false});
		var CollapsiblePanel2 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel2", {contentIsOpen:false});
		var CollapsiblePanel3 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel3", {contentIsOpen:false});
		var CollapsiblePanel4 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel4", {contentIsOpen:false});
		var CollapsiblePanel5 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel5", {contentIsOpen:false});
		var CollapsiblePanel6 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel6", {contentIsOpen:false});
		var CollapsiblePanel7 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel7", {contentIsOpen:false});
		var CollapsiblePanel8 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel8", {contentIsOpen:false});
		var CollapsiblePanel9 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel9", {contentIsOpen:false});
		var CollapsiblePanel10 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel10", {contentIsOpen:false});
		var CollapsiblePanel11 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel11", {contentIsOpen:false});
		var CollapsiblePanel12 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel12", {contentIsOpen:false});
		var CollapsiblePanel13 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel13", {contentIsOpen:false});
		var CollapsiblePanel14 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel14", {contentIsOpen:false});
		var CollapsiblePanel15 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel15", {contentIsOpen:false});
		var CollapsiblePanel16 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel16", {contentIsOpen:false});
		var CollapsiblePanel17 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel17", {contentIsOpen:false});
		var CollapsiblePanel18 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel18", {contentIsOpen:false});
		var CollapsiblePanel19 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel19", {contentIsOpen:false}); 
		var CollapsiblePanel20 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel20", {contentIsOpen:false}); 
		var CollapsiblePanel21 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel21", {contentIsOpen:false});
		var CollapsiblePanel22 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel22", {contentIsOpen:false}); 
		var CollapsiblePanel23 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel23", {contentIsOpen:false}); 
		var CollapsiblePanel24 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel24", {contentIsOpen:false}); 						
	</script>

</div></body>

</html>
