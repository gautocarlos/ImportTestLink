//Constructor
var ExportXML = function() {
	this.xmlFinal = null;
	this.planilla = new Planilla();
	this.cantidadPasos = 0;
	this.cantidadCasos = 0;
};

ExportXML.Prototype.getCantidadPasos = function() {
	return this.cantidadPasos;	
};

ExportXML.Prototype.incrementarCantidadPasos = function() {
	this.cantidadPasos++;	
};

ExportXML.Prototype.getCantidadCasos = function() {
	return this.cantidadCasos;	
};

ExportXML.Prototype.incrementarCantidadCasos = function() {
	this.cantidadCasos++;	
};

ExportXML.Prototype.getPlanilla = function() {
	return this.planilla;	
};

ExportXML.Prototype.setPlanilla = function(planilla) {
	this.planilla = planilla;	
};

ExportXML.Prototype.getXmlFinal = function() {
	return this.xmlFinal;	
};

ExportXML.Prototype.setXmlFinal = function(xmlFinal) {
	this.xmlFinal = xmlFinal;	
};

ExportXML.Prototype.appendXmlFinal = function(xml) {
	this.setXmlFinal(this.getXmlFinal + xml);
};

ExportXML.Prototype.inicioXML = function() {
	this.setXmlFinal("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
	this.appendXmlFinal("  <testcases>\n");
};

ExportXML.Prototype.inciarCasoDePrueba = function(titulo, resumen, precondiciones) {
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
ExportXML.Prototype.crearPasoEnCasoDePrueba = function(numeroPaso, paso, resultado) {
//	paso = (paso.split('\n')).join('<br />'); //Va en un método al final de todo 
//	resultado = (resultado.split('\n')).join('<br />');
	this.appendXmlFinal("        <step>\n          <step_number><![CDATA["+ numeroPaso +"]]></step_number>\n");
	this.appendXmlFinal("          <actions><![CDATA[" + paso + "]]></actions>\n");
	this.appendXmlFinal("          <expectedresults><![CDATA[" + resultado + "]]></expectedresults>\n");
	this.appendXmlFinal("          <execution_type></execution_type>\n");
	this.appendXmlFinal("        </step>\n");
};
	
ExportXML.Prototype.procesarPlanilla = function(ruta) {
	this.inicioXML();
	this.getPlanilla().abrir(ruta);
	registro = this.getPlanilla().leerRegistro();
	tituloAnterior = registro.getTitulo(); //Para el corte de control de generación de pasos de un caso 
	while (!registro.esVacio) {
        if (registro.getNumeroPaso() != 1){
            if ( !confirm("El caso de prueba de la fila = "+ i +" tiene un primer paso con step_number <> de 1.\n ¿Desea continuar de todos modos?") ) {
              alert("Por favor modifique el archivo de input y vuelva a realizar la carga.");
          	return;
            }                    
        }
        
	}
};