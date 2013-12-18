function crearXMLDesdeExcel()
{
  casoDePruebaForm = document.forms['casoDePrueba'];
  casoDePruebaForm.elements['exportxml'].innerHTML = LeerExcel();
};

function LeerExcel()
{
  var IEx=document.all?1:0;//is IE      
  var ObjetoXLS;//Objeto excel 
  var index = 2; //Primer fila con datos
  
  var cantidadDeCasos = 0;
  var cantidadPasos = 0;
        
  /*Columnas que necesitamos leer*/
  var name;
  var nameAnterior;
  var summary;  
  var preconditions;
  var step_number;
  var actions;
  var expectedresults;

  var i; //Iterador
//  var exportxml = ""; /*Variable que contiene el XML armado*/
  var xmlFinal; /*Variable que contiene el XML armado*/
   
  if (IEx==1)
  {
    try
    {            
      ObjetoXLS = new ActiveXObject("Excel.Application");
//      ruta = 'c:/Tabla_test_case.xls';
      ruta = 'C:/Users/cargauto/Documents/Files/everis/ProyectoGobierno/Documentación del proyecto/GOBTUC/DOE/Tabla_test_case.xls';      
      ObjetoXLS.Workbooks.OPEN(ruta,false,false);
      name = ObjetoXLS.ActiveSheet.Cells(index,1).Value;
      nameAnterior = name;
      summary = ObjetoXLS.ActiveSheet.Cells(index,2).Value;
      preconditions= ObjetoXLS.ActiveSheet.Cells(index,3).Value;
      step_number = ObjetoXLS.ActiveSheet.Cells(index,4).Value;
      actions = ObjetoXLS.ActiveSheet.Cells(index,5).Value;
      expectedresults = ObjetoXLS.ActiveSheet.Cells(index,6).Value;
      
      xmlFinal = inicioXML();  
//      alert(xmlFinal);
      
      //Mientras haya datos por leer
      for (i=index;name != null;)
      { 
    	/*Crea un caso de prueba*/
        xmlFinal = inciarCasoDePrueba(xmlFinal, name, summary, preconditions);
    	//Mientras sea el mismo caso, para crear varios pasos para casos que los tengan
//        alert(ObjetoXLS.ActiveSheet.Cells(i,1).Value);
        if (step_number != 1){
          if ( !confirm("El caso de prueba de la fila = "+ i +" tiene un primer paso con step_number <> de 1.\n ¿Desea continuar de todos modos?") ) {
            alert("Por favor modifique el archivo de input y vuelva a realizar la carga.");
        	return;
          }                    
        }
    	for (;nameAnterior == name;)
    	{
    	  xmlFinal = crearPasoEnCasoDePrueba(xmlFinal, step_number, actions, expectedresults);
    	  i++; //Ver de eliminar o cambiar.
    	  cantidadPasos++;

    	  //Inicio Leo un registro -- Factorizar en una función
    	  name= ObjetoXLS.ActiveSheet.Cells(i,1).Value;
          summary= ObjetoXLS.ActiveSheet.Cells(i,2).Value;
          preconditions= ObjetoXLS.ActiveSheet.Cells(i,3).Value;
          step_number = ObjetoXLS.ActiveSheet.Cells(i,4).Value;
          actions = ObjetoXLS.ActiveSheet.Cells(i,5).Value;
          expectedresults = ObjetoXLS.ActiveSheet.Cells(i,6).Value;
          //Fin Leo un registro
    	}
    	nameAnterior = name;
    	xmlFinal = finalizarCasoDePrueba(xmlFinal);
    	cantidadDeCasos++;

      }
      xmlFinal = finXML(xmlFinal);
      
      ObjetoXLS.Application.Quit();
//      xmlFinal = xmlFinal.replace('\n', '<br />');
//      xmlFinal = (xmlFinal.split('\n')).join('<br />'); //Funciona, reemplaza los saltos de línea por salto en html
      alert("Se procesaron: " + cantidadDeCasos + " casos de prueba y " + cantidadPasos + " Pasos de ejecución");      
    }
    catch (e){
      alert (e);
    }
    
    return xmlFinal;
  } else {
	  alert("Por ahora solo funciona en IE");
  }
       
} /* End function*/


/* Inicio XML*/
function inicioXML() {
  var exportxml;
  exportxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";  
  exportxml = exportxml + "  <testcases>\n";
  return exportxml; 
}

/* Crear caso de prueba*/
function inciarCasoDePrueba(exportxml, titulo, resumen, precondiciones) {
  //Convierte saltos de línea en <br />	
  resumen = (resumen.split('\n')).join('<br />');
  precondiciones = (precondiciones.split('\n')).join('<br />');
//  exportxml = exportxml + "    <testcase name=\"" + titulo + "\">\n    <node_order></node_order>\n    <externalid></externalid>\n    <version></version>\n";
  exportxml = exportxml + "    <testcase name=\"" + titulo + "\">\n";
  exportxml = exportxml + "      <node_order></node_order>\n";
  exportxml = exportxml + "      <externalid></externalid>\n";
  exportxml = exportxml + "      <version></version>\n";
  exportxml = exportxml + "      <summary><![CDATA[" + resumen + "]]></summary>\n"; 
  exportxml = exportxml + "      <preconditions><![CDATA[" + precondiciones + "]]></preconditions>\n";
//  exportxml = exportxml + "      <execution_type></execution_type>\n    <importance></importance>\n";
  exportxml = exportxml + "      <execution_type></execution_type>\n";
  exportxml = exportxml + "      <importance></importance>\n";
  exportxml = exportxml + "      <steps>\n";
  return exportxml; 
}

/* Crear caso de prueba*/
function finalizarCasoDePrueba(exportxml) {
  exportxml = exportxml + "      </steps>\n";
  exportxml = exportxml + "    </testcase>\n";
  return exportxml;
}

/* Crear paso dentro de un caso de prueba*/
function crearPasoEnCasoDePrueba(exportxml, numeroPaso, paso, resultado) {
  paso = (paso.split('\n')).join('<br />');
  resultado = (resultado.split('\n')).join('<br />');
  exportxml = exportxml + "        <step>\n          <step_number><![CDATA["+ numeroPaso +"]]></step_number>\n";
  exportxml = exportxml + "          <actions><![CDATA[" + paso + "]]></actions>\n";
  exportxml = exportxml + "          <expectedresults><![CDATA[" + resultado + "]]></expectedresults>\n";
  exportxml = exportxml + "          <execution_type></execution_type>\n";
  exportxml = exportxml + "        </step>\n";
  return exportxml;
}

/* Fin XML*/
function finXML(exportxml) {
	exportxml = exportxml + "  </testcases>\n";
	return exportxml;
}


/* ***********OBSOLETO*********** */
function crearXML()
{
  var casoDePruebaForm, titulo, resumen, precondiciones, numeroPaso, paso, resultado, exportxml;
  casoDePruebaForm = document.forms['casoDePrueba'];
  
  titulo = casoDePruebaForm.elements['titulo'].value;
  resumen = casoDePruebaForm.elements['resumen'].value;
  precondiciones = casoDePruebaForm.elements['precondiciones'].value;
  numeroPaso = casoDePruebaForm.elements['numeroPaso'].value;
  paso = casoDePruebaForm.elements['paso'].value;
  resultado = casoDePruebaForm.elements['resultado'].value;
  
  //exportxml = casoDePruebaForm.elements['exportxml'];
  
  /* Inicio conjunto de casos*/
  exportxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";  
  exportxml = exportxml + "  <testcases>\n";
  /* Inicio caso*/
  exportxml = exportxml + "    <testcase name=\"" + titulo + "\">\n    <node_order></node_order>\n    <externalid></externalid>\n    <version></version>\n";
  exportxml = exportxml + "    <summary><![CDATA[" + resumen + "]]></summary>\n"; 
  exportxml = exportxml + "    <preconditions><![CDATA[" + precondiciones + "]]></preconditions>\n";
  exportxml = exportxml + "    <execution_type></execution_type>\n    <importance></importance>\n";
  exportxml = exportxml + "    <steps>\n";
  /*Inicio Paso*/ 
  exportxml = exportxml + "      <step>\n          <step_number><![CDATA["+ numeroPaso +"]]></step_number>\n";
  exportxml = exportxml + "        <actions><![CDATA[" + paso + "</actions>\n";
  exportxml = exportxml + "        <expectedresults><![CDATA[" + resultado + "]]></expectedresults>\n";
  exportxml = exportxml + "        <execution_type></execution_type>\n";
  exportxml = exportxml + "      </step>\n";
  /*Fin Paso*/
  exportxml = exportxml + "    </steps>\n";
  /* Fin Caso*/
  exportxml = exportxml + "    </testcase>\n";
  exportxml = exportxml + "  </testcases>\n";
  /* Fin conjunto de casos*/
  casoDePruebaForm.elements['exportxml'].innerHTML = exportxml;
};
