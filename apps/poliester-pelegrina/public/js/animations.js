    
/*Adaptem l'alçada de la divisió en funció del contingut de la classe wrapper*/
function adaptPageHeight() {

    var screenHeight, emptySpace, difference;

    var headerHeight = $('.Header').css('height'); /*Altura de la capçalera*/
    var wrapperHeight = $('.Wrapper').css('height'); /*Altura del Wrapper*/
    var footerHeight = $('.Footer').css('height'); /*Altura del peu de pàgina*/

    $('.Footer').css('margin-top', '0px');
    $('.Wrapper').css('margin-top', '0px');

    screenHeight = $(window).height();

    /*Eliminem el 'px' de les variables per poder tractar-les numèricament*/
    headerHeight = headerHeight.substring(0, headerHeight.length - 2);
    wrapperHeight = wrapperHeight.substring(0, wrapperHeight.length - 2);
    footerHeight = footerHeight.substring(0, footerHeight.length - 2);        

    /*Calculem l'espai que queda entre la capçalera i el peu de pàgina*/
    emptySpace = screenHeight - parseInt(headerHeight, 10) - parseInt(footerHeight, 10);
    /*Transformem l'alçada de la divisió wrapper a número*/
    wrapperHeight = parseInt(wrapperHeight, 10); 

    //$('.RightHeader').prepend(screenHeight + '-' + wrapperHeight + ' ');  

    if(wrapperHeight < emptySpace) {
        
        difference = emptySpace - wrapperHeight;
        /*Quan la pàgina es carrega, el Wrapper està buit; desplaçem el footer tot el que toca*/
        if(wrapperHeight == 0) {

            $('.Footer').css('margin-top', difference + 'px');

        /*Si el wrapper no està buit, centrem el wrapper horitzontalment*/
        } else {

            difference = difference / 2;
            $('.Footer').css('margin-top', difference + 'px');
            $('.Wrapper').css('margin-top', difference + 'px');

        }        

    }

}

function configurePage() {

    placeWrapper();
    adaptPageHeight();

}

/*Inserta en la divisió wrapper el contingut de la pestanya que correspongui*/
function loadTab(tab, fadeOutTime, fadeInTime) { /*No faig servir el segon paràmetre*/

    var defaultFadeOutTime = 900;
    var defaultFadeInTime = 1000;
    var tabId;

    /*El segon paràmatre de la funció serveix per reduir el fadeOut quan la pàgina es carrega per primera vegada.
    La resta de crides a la funció no passen el segon paràmetre assumint el temps de fadeOut per defecte*/
    fadeOutTime = typeof fadeOutTime !== 'undefined' ? fadeOutTime : defaultFadeOutTime;
    fadeInTime = typeof fadeInTime !== 'undefined' ? fadeInTime : defaultFadeInTime;

    /*Fem despareixer el contingut actual*/
    $('.InnerWrapper').fadeOut(fadeOutTime);    
    tabId = '#' + tab.split('.')[0];

    /*Un cop buida la pàgina, carreguem contingut demanat per l'usuari*/
    setTimeout(function() {

        $('.InnerWrapper').css('display', 'none');        
        $(tabId).fadeIn(fadeInTime);        
        adaptTabSize(tabId);

        /*$.post(tab, null, function(data) {

            $('.Wrapper').empty();
            $('.Wrapper').html(data);
            $('.InnerWrapper').fadeIn(fadeInTime);
            adaptTabSize();

        })*/

    }, fadeOutTime);

}

/*Adapta l'alçada de la pàgina en funció de l'alçada de la pestanya actual*/
function adaptTabSize(tabId) {

    var wrapperHeight, wrapperUp, wrapperDown;

    wrapperHeight = $(tabId).css('height');
    wrapperUp = $(tabId).css('padding-top');
    wrapperDown = $(tabId).css('padding-bottom');

    wrapperHeight = wrapperHeight.substring(0, wrapperHeight.length - 2);
    wrapperUp = wrapperUp.substring(0, wrapperUp.length - 2);
    wrapperDown = wrapperDown.substring(0, wrapperDown.length - 2);

    wrapperHeight = parseInt(wrapperHeight, 10) + parseInt(wrapperUp, 10) + parseInt(wrapperDown, 10);

    $('.Wrapper').css('height', wrapperHeight);
    $('.Wrapper').css('min-height', wrapperHeight);
    $('.Wrapper').css('max-height', wrapperHeight);
    adaptPageHeight();

}

function placeWrapper() {

	/*Obtenim l'amplada de la pàgina i n'eliminem els dos últimes caracters (px)*/
    var wrapperWidth = $('.Wrapper').css('width');
    wrapperWidth = wrapperWidth.substring(0, wrapperWidth.length - 2);

    /*Calculem l'espai que ha de quedar a les bandes de la divisió central*/
    var screenWidth = $(window).width();
    var sideSpace = (screenWidth - wrapperWidth) / 2;
    if(sideSpace < 0) sideSpace = 0;

    /*Centrem la divisió principal al mig de la pàgina en funció de la seva mida*/
    $('.Wrapper').css('margin-left', sideSpace);
    $('.Wrapper').css('margin-right', sideSpace);

}

/*Cada cop que es modifica la mida del navegador, reconfigurem la pagina*/
window.onresize = configurePage;