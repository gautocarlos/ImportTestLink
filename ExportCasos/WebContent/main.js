function main(ruta){	
	exportXML = new ExportXML();	
	casoDePruebaForm = document.forms['casoDePrueba'];
	casoDePruebaForm.elements['exportxml'].innerHTML = exportXML.procesarPlanilla(ruta);
}