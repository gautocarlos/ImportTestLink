//Definimos el constructor para la clase 
function Planilla(){ 
  this.IEx=document.all?1:0;//is IE      
  this.ObjetoXLS=new ActiveXObject("Excel.Application");//Objeto excel 
  /*Ruta harcodeada, podría subirse en otra ruta o permitir al usuario seleccionar una ruta*/
//  this.ruta = 'C:/Users/cargauto/Documents/Files/everis/ProyectoGobierno/Documentación del proyecto/GOBTUC/DOE/Tabla_test_case.xls';
  /*Columnas que necesitamos leer*/
  //Ver si es necesario que sea un atributo de clase
  this.index = 2; //Primer fila con datos	  
  this.cantidadDeCasos = 0;
  this.cantidadPasos = 0;
  if (IEx!=1) {
	  alert("Por ahora solo funciona en IE");
  }
}

// Abre la planilla que contiene los casos a importar a TestLink
function abrir(ruta){
	this.ObjetoXLS.Workbooks.OPEN(ruta,false,false);
}

function leerRegistro(fila){
	registro = new Registro(this);
	registro.inicializar(fila);
	return registro; 
}

