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
		<option id="1" value="1">Dilluns</option>
		<option id="2" value="2">Dimarts</option>
        <option id="3" value="3">Dimecres</option>
		<option id="4" value="4" selected="selected">Dijous</option>
        <option id="5" value="5">Divendres</option>
		<option id="6" value="6">Dissabte</option>
		<option id="0" value="0">Diumenge</option>
	</select> 
	<img src="../imatges/dj.png" alt="" width="328" height="17" />    
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
			<?php include 'FitxesR/Basset1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Basset2.html' ?></div></div>                
                
			<div id="CollapsiblePanel2" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/MagdaSubirana1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/MagdaSubirana2.html' ?></div></div>
                                
			<div id="CollapsiblePanel3" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LesGargoles1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LesGargoles2.html' ?></div></div>
                
			<div id="CollapsiblePanel4" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Crinyol1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Crinyol2.html' ?></div></div>       
       
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
			<?php include 'FitxesR/OperaBarroca1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/OperaBarroca2.html' ?></div></div>
            
			<div id="CollapsiblePanel8" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarStaAnna1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarStaAnna2.html' ?></div></div>            
            
            <div id="CollapsiblePanel9" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LaTavernaGruixut1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LaTavernaGruixut2.html' ?></div></div>
            
			<div id="CollapsiblePanel10" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CalFuste1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/CalFuste2.html' ?></div></div>
            
			<div id="CollapsiblePanel11" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElCaliu1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElCaliu2.html' ?></div></div>            
    
		</div>

		<div id="tab2" class="tab_content"><p>&nbsp; <!--Content--></p>
            
			<div id="CollapsiblePanel12" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElBohemi1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElBohemi2.html' ?></div></div>        
                
			<div id="CollapsiblePanel13" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Basset1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Basset2.html' ?></div></div>
            
            <div id="CollapsiblePanel14" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LesPockets1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LesPockets2.html' ?></div></div> 
            
            <div id="CollapsiblePanel15" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/DOVic1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/DOVic2.html' ?></div></div>                         
             
			<div id="CollapsiblePanel16" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Transilvania1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Transilvania2.html' ?></div></div>  
            
			<div id="CollapsiblePanel17" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/OperaBarroca1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/OperaBarroca2.html' ?></div></div>                        
      
			<div id="CollapsiblePanel18" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarStaAnna1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarStaAnna2.html' ?></div></div> 
            
            <div id="CollapsiblePanel19" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Teresona1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Teresona2.html' ?></div></div>        

			<div id="CollapsiblePanel20" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Tropicana1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Tropicana2.html' ?></div></div>
            
			<div id="CollapsiblePanel21" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElRefugi1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElRefugi2.html' ?></div></div> 

			<div id="CollapsiblePanel22" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElRebost1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElRebost2.html' ?></div></div> 
            
			<div id="CollapsiblePanel23" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElTast1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElTast2.html' ?></div></div>    
            
			<div id="CollapsiblePanel24" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Montapa1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Montapa2.html' ?></div></div>
            
            <div id="CollapsiblePanel25" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CalFuste1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/CalFuste2.html' ?></div></div>   
            
			<div id="CollapsiblePanel26" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElCaliu1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElCaliu2.html' ?></div></div>                                                                
        
		</div>    
        
		<div id="tab4" class="tab_content"><p>&nbsp; <!--Content--></p>
      
			<div id="CollapsiblePanel27" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarSolNou1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarSolNou2.html' ?></div></div>        
      
			<div id="CollapsiblePanel28" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CanBernat1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/CanBernat2.html' ?></div></div>  
    
			<div id="CollapsiblePanel29" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CafeteriaSucre1.html'?></div>
			<div class="CollapsiblePanelContent">
  			<?php include 'FitxesR/CafeteriaSucre2.html' ?></div></div>      
    
			<div id="CollapsiblePanel30" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Crinyol1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Crinyol2.html' ?></div></div>  

			<div id="CollapsiblePanel31" class="CollapsiblePanel">
            <div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LOccita1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LOccita2.html' ?></div></div>     

			<div id="CollapsiblePanel32" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarStaAnna1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarStaAnna2.html' ?></div></div> 
            
			<div id="CollapsiblePanel33" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/CanSileta1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/CanSileta2.html' ?></div></div>                                 
       
			<div id="CollapsiblePanel34" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/Montapa1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/Montapa2.html' ?></div></div> 
            
			<div id="CollapsiblePanel35" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/ElTast1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/ElTast2.html' ?></div></div>             

			<div id="CollapsiblePanel36" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LaTorrada1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LaTorrada2.html' ?></div></div>                    
            
			<div id="CollapsiblePanel37" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/OsonaBarCafeteria1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/OsonaBarCafeteria2.html' ?></div></div>
            
			<div id="CollapsiblePanel38" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/BarSofia1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/BarSofia2.html' ?></div></div>                         

			<div id="CollapsiblePanel39" class="CollapsiblePanel">
			<div class="CollapsiblePanelTab" tabindex="0">
			<?php include 'FitxesR/LaCanya1.html'?></div>
			<div class="CollapsiblePanelContent">
			<?php include 'FitxesR/LaCanya2.html' ?></div></div>             
            
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
		var CollapsiblePanel25 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel25", {contentIsOpen:false});
		var CollapsiblePanel26 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel26", {contentIsOpen:false});
		var CollapsiblePanel27 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel27", {contentIsOpen:false});
		var CollapsiblePanel28 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel28", {contentIsOpen:false});
		var CollapsiblePanel29 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel29", {contentIsOpen:false});
		var CollapsiblePanel30 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel30", {contentIsOpen:false});
		var CollapsiblePanel31 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel31", {contentIsOpen:false});
		var CollapsiblePanel32 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel32", {contentIsOpen:false});
		var CollapsiblePanel33 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel33", {contentIsOpen:false});
		var CollapsiblePanel34 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel34", {contentIsOpen:false});
		var CollapsiblePanel35 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel35", {contentIsOpen:false});
		var CollapsiblePanel36 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel36", {contentIsOpen:false});
		var CollapsiblePanel37 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel37", {contentIsOpen:false});
		var CollapsiblePanel38 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel38", {contentIsOpen:false});
		var CollapsiblePanel39 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel39", {contentIsOpen:false}); 						
	</script>

</div></body>

</html>
