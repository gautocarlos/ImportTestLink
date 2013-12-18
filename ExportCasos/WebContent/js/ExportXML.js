//Constructor
//ExportXML = function() {
function ExportXML() {
	this.xmlFinal = "";
	this.planilla = new Planilla();
	this.cantidadPasos = 0;
	this.cantidadCasos = 0;
};

ExportXML.prototype.getCantidadPasos = function() {
	return this.cantidadPasos;	
};

ExportXML.prototype.incrementarCantidadPasos = function() {
	this.cantidadPasos++;	
};

ExportXML.prototype.getCantidadCasos = function() {
	return this.cantidadCasos;	
};

ExportXML.prototype.incrementarCantidadCasos = function() {
	this.cantidadCasos++;	
};

ExportXML.prototype.getPlanilla = function() {
	return this.planilla;	
};

ExportXML.prototype.setPlanilla = function(planilla) {
	this.planilla = planilla;	
};

ExportXML.prototype.getXmlFinal = function() {
	return this.xmlFinal;	
};

ExportXML.prototype.getXmlDescarga = function() {
//    return new Blob(this.getXmlFinal(), {type: 'application/xml'});
  return new Blob([this.getXmlFinal()], {type: 'application/xml'});
};

ExportXML.prototype.setXmlFinal = function(xmlFinal) {
	this.xmlFinal = xmlFinal;	
};

ExportXML.prototype.appendXmlFinal = function(xml) {
//	this.formatearXML();
	this.setXmlFinal(this.getXmlFinal() + xml);
};

ExportXML.prototype.inicioXML = function() {
	this.setXmlFinal("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
	this.appendXmlFinal("  <testcases>\n");
};

ExportXML.prototype.inciarCasoDePrueba = function(titulo, resumen, precondiciones) {
	resumen = this.formatearSaltosDeLineaXML(resumen);
	precondiciones = this.formatearSaltosDeLineaXML(precondiciones);	
	this.appendXmlFinal("    <testcase name=\"" + titulo + "\">\n");
	this.appendXmlFinal("      <node_order></node_order>\n");
	this.appendXmlFinal("      <externalid></externalid>\n");
	this.appendXmlFinal("      <version></version>\n");
	this.appendXmlFinal("      <summary><![CDATA[" + resumen + "]]></summary>\n");
	this.appendXmlFinal("      <preconditions><![CDATA[" + precondiciones + "]]></preconditions>\n");
	this.appendXmlFinal("      <execution_type></execution_type>\n");
	this.appendXmlFinal("      <importance></importance>\n");
	this.appendXmlFinal("      <steps>\n");
	};

	/* Crear paso dentro de un caso de prueba*/
ExportXML.prototype.crearPasoEnCasoDePrueba = function(numeroPaso, paso, resultado) {
	paso = this.formatearSaltosDeLineaXML(paso);
	resultado = this.formatearSaltosDeLineaXML(resultado);
	this.appendXmlFinal("        <step>\n          <step_number><![CDATA["+ numeroPaso +"]]></step_number>\n");
	this.appendXmlFinal("          <actions><![CDATA[" + paso + "]]></actions>\n");
	this.appendXmlFinal("          <expectedresults><![CDATA[" + resultado + "]]></expectedresults>\n");
	this.appendXmlFinal("          <execution_type></execution_type>\n");
	this.appendXmlFinal("        </step>\n");
	this.incrementarCantidadPasos();
};

/* Finalizar caso de prueba*/
ExportXML.prototype.finalizarCasoDePrueba = function () {
	this.appendXmlFinal("      </steps>\n");
	this.appendXmlFinal("    </testcase>\n");
	this.incrementarCantidadCasos();
};

ExportXML.prototype.finXML = function() {
	this.appendXmlFinal("  </testcases>\n");
//	this.formatearXML();
};

//Convierte los saltos de carro para que qeuden correctos
ExportXML.prototype.formatearSaltosDeLineaXML = function(cadenaXML) {
	cadenaXML = (cadenaXML.split('\n')).join('<br />');
	return cadenaXML;
};

ExportXML.prototype.crearCasoDePrueba = function(registro) {
	tituloAnteriorCaso = registro.getTitulo();
	name = registro.getTitulo();
	this.inciarCasoDePrueba(registro.getTitulo(),registro.getResumen(), registro.getPrecondiciones());
	while (tituloAnteriorCaso == name)
	{		
		this.crearPasoEnCasoDePrueba(registro.getNumeroPaso(), registro.getAcciones(), registro.getResultado());
		this.getPlanilla().procesarFila();
		registro = this.getPlanilla().leerRegistro();		
		name =  registro.getTitulo();		
	}
	// Retorna a la fila anterior que no se procesó realmente
	//this.getPlanilla().decrementarFilaProcesada(); 
	this.finalizarCasoDePrueba();	
};



ExportXML.prototype.procesarPlanilla = function(ruta) {
	this.inicioXML();
	this.getPlanilla().abrir(ruta);
	registro = this.getPlanilla().leerRegistro();
	tituloAnterior = registro.getTitulo(); //Para el corte de control de generación de pasos de un caso 
	while (!registro.esVacio()) {
        if (registro.getNumeroPaso() != 1){
            if ( !confirm("El caso de prueba de la fila = "+ i +" tiene un primer paso con step_number <> de 1.\n ¿Desea continuar de todos modos?") ) {
              alert("Por favor modifique el archivo de input y vuelva a realizar la carga.");
          	return;
            }                    
        }
        // Debería haber sólo un método que cree los casos de prueba y llame al resto de 
        //Métodos complementarios
        this.crearCasoDePrueba(registro);
        registro = this.getPlanilla().leerRegistro();        
	}
	
	this.getPlanilla().cerrarPlanilla();
	this.finXML();
	alert("Se procesaron: " + this.getCantidadCasos() + " casos de prueba y " + this.getCantidadPasos() + " Pasos de ejecución");
	this.descargarXML();
	return this.getXmlFinal();
};

ExportXML.prototype.descargarXML = function() {
//    var reader = new FileReader();
    contenidoEnBlob = this.getXmlDescarga();
    nombreArchivo = 'CasosDePrueba.xml';
//    reader.readAsDataURL(contenidoEnBlob);    
    window.navigator.msSaveOrOpenBlob(contenidoEnBlob, nombreArchivo); // Now the user will have the option of clicking the Save button and the Open button.
};

