function main(){
	try {
		exportXML = new ExportXML();
		casoDePruebaForm = document.forms['casoDePrueba'];
		ruta = casoDePruebaForm.elements['fileInput'];
		if (esPlanillaExcel(ruta.value)){
//			casoDePruebaForm.elements['exportxml'].innerHTML = exportXML.procesarPlanilla(ruta.value);
			exportXML.procesarPlanilla(ruta.value);
		}
		else {
			alert("Por favor debe seleccionar una planilla excel mediante el botón Examinar para poder generar el XML");
		}
	} catch (e) {
		alert (e);
	}
	
}

function esPlanillaExcel(ruta) {
	var validExts = new Array(".xlsx", ".xls");
	var fileExt = ruta;
	fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
	if (validExts.indexOf(fileExt) < 0) {
		alert("Archivo seleccionado invalido, las extensiones válidas son " +
	    validExts.toString());
	    return false;
	}else
		return true;
}

function validarBrowser() {
	IEx=document.all?1:0;//is IE
	if (IEx!=1) {
		alert("Por ahora solo funciona en IE, por favor abrir la aplicación en dicho browser para su correcta utilización.");
		return;
	}	
}