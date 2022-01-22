function aleatorio(inferior,superior){
    numPosibilidades = superior - inferior + 1
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

function esta(caracter, miarray){
  //console.log("buscando ", caracter, " en ", miarray)
  for(var j=0;j<miarray.length;j++){
    if (caracter==miarray[j]){
		return true;
    }else{
		//console.log("el caracter ", caracter, " no es el valor del array ",miarray[j] )
	}
  }
  return false;
}

function estanTodas(arrayAciertos, mipalabra){
	for(var i=0; i<mipalabra.length; i++){
		if(!esta(mipalabra.charAt(i),arrayAciertos))
			return false;
	}
	return true;
}

////////////////////////////////////////////////////////////////////////////////
// PALABRAS
////////////////////////////////////////////////////////////////////////////////
var palabras = ['chipauak', 'tonati', 'tetl', 'ejecatl', 'kojkasapali', 'chicauak', 'tepostle', 'xochitl', 'miahuatl', 'tekolotl', 'totonik'];
var palabraEscogida = palabras[aleatorio(0,palabras.length-1)]
var aciertos = [];

//console.log(palabraEscogida);

function escribePalabra(palabra, arrayAciertos){
	//console.log("estoy en escribePalabra y arrat de aciertos es: " , arrayAciertos);
	var texto = '';
	for(var i=0; i<palabra.length; i++){
		texto += "<span>";
		var cActual = palabra.charAt(i);
		if(esta(cActual,arrayAciertos)){
			texto += cActual;
		}else{
			texto += '_';
		}
		texto += "</span>";
		//console.log(cActual)
	}
	$("#letras").html(texto);
}



////////////////////////////////////////////////////////////////////////////////
//// inicio todo!!!
////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	
	//creo los botones con las letras
	var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	for(i=0; i<letras.length; i++){
		//creo el span de la letra
		letraActual = $('<span class="botonletra">' + letras[i] + '</span>');
		letraActual.data("letra",letras[i]);
		//lo convierto en un botón
		letraActual.button();
		letraActual.click(function(){
			//traigo la letra pulsada
			var miletra = $(this).data("letra").toLowerCase()
			//miro si esa letra está en la palabra
			if(palabraEscogida.indexOf(miletra)!=-1){
				//si está, va para aciertos
				aciertos.push(miletra);
				escribePalabra(palabraEscogida, aciertos);
				//miro si ha ganado
				if(estanTodas(aciertos,palabraEscogida)){
					var caja = $('<div class="dialogletra" title="Has Ganado!!">Felicidades! has adivinado la palabra!!</div>');
					caja.dialog({
					modal: true,
					width: 600,
					buttons: {
						"Ok": function(){
							$(this).dialog("close");
						}
					}
					});	
				}
			}else{
				//no estaba
				numFallos++;
				dibujaAhorado(numFallos);
				//miro si se ha perdido
				if(numFallos==6){
					var caja = $('<div class="dialogletra" title="Has Perdido!!">Lo lamento!! la palabra era: ' + palabraEscogida + '</div>');
					caja.dialog({
					modal: true,
					width: 600,
					buttons: {
						"Ok": function(){
							$(this).dialog("close");
						}
					}
					});	
				}
			}
			//una vez pulsado el botón, lo desabilito y quito su evento click
			$(this).button("disable");
			$(this).unbind( "click" );
			
		})
		$("#botonesletras").append(letraActual);
	}
	
	//inicio el canvas
	dibujaAhorado(numFallos);
	
	//inicio las palabras
	escribePalabra(palabraEscogida, aciertos);
	
});

/////////////////////////////////
//CANVAS
/////////////////////////////////
function cargaContextoCanvas(idCanvas){
	var elemento = document.getElementById(idCanvas);
	if(elemento && elemento.getContext){
		var contexto = elemento.getContext('2d');
		if(contexto){
			return contexto;
		}
	}
	return false;
}
function borrarCanvas(contexto, anchura, altura){
	contexto.clearRect(0,0,anchura,anchura);
}
function dibujaHorca(ctx){
	ctx.fillStyle = '#462501';
	ctx.fillRect(64,9,26,937);
	ctx.fillRect(175,205,26,453);
	ctx.fillRect(64,205,136,15);
	ctx.fillRect(64,9,115,11);
	ctx.beginPath();
	ctx.moveTo(64,65);
	ctx.lineTo(64,80);
	ctx.lineTo(133,11);
	ctx.lineTo(118,11);
	ctx.fill();
}
function dibujaCabeza(ctx){
	var img = new Image();  
	img.onload = function(){
		ctx.fillStyle = '#f2d666';
		ctx.drawImage(img,150,38);
		ctx.fillRect(172,12,4,28);
	}  
	img.src = 'img/cara.png'; 
}
function dibujaCuerpo(ctx){
	var img = new Image();  
	img.onload = function(){
		ctx.fillStyle = '#f2d666';
		ctx.drawImage(img,150,38);
		ctx.fillRect(172,12,4,28);
	}  
	img.src = 'img/1.png'; 
}
function dibujaBrazoIzq(ctx){
	var img = new Image();  
	img.onload = function(){
		ctx.fillStyle = '#f2d666';
		ctx.drawImage(img,150,38);
		ctx.fillRect(172,12,4,28);
	}  
	img.src = 'img/2.png'; 
}
function dibujaBrazoDer(ctx){
	var img = new Image();  
	img.onload = function(){
		ctx.fillStyle = '#f2d666';
		ctx.drawImage(img,150,38);
		ctx.fillRect(172,12,4,28);
	}  
	img.src = 'img/4.png'; 
}
function dibujaPiernaIzq(ctx){
	var img = new Image();  
	img.onload = function(){
		ctx.fillStyle = '#f2d666';
		ctx.drawImage(img,150,38);
		ctx.fillRect(172,12,4,28);
	}  
	img.src = 'img/5.png'; 
}
function dibujaPiernaDer(ctx){
	var img = new Image();  
	img.onload = function(){
		ctx.fillStyle = '#f2d666';
		ctx.drawImage(img,150,38);
		ctx.fillRect(172,12,4,28);
	}  
	img.src = 'img/6.png'; 
}
////////////////////////////////////////////////////////
// GESTION DE FALLOS
////////////////////////////////////////////////////////
var numFallos = 0;
function dibujaAhorado(numerrores){
	var contexto = cargaContextoCanvas('canvasahorcado');
	if(contexto){
		dibujaHorca(contexto);
		if(numFallos>0){
			dibujaCabeza(contexto)
		}
		contexto.fillStyle = '#1f3e18';
		if(numFallos>1){
			dibujaCuerpo(contexto)
		}
		if(numFallos>2){
			dibujaBrazoIzq(contexto)
		}
		if(numFallos>3){
			dibujaBrazoDer(contexto)
		}
		if(numFallos>4){
			dibujaPiernaIzq(contexto)
		}
		if(numFallos>5){
			dibujaPiernaDer(contexto)
		}
		
	}
}