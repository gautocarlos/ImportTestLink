//Definimos el constructor para la clase 
var Planilla = function (){ 
  this.IEx=document.all?1:0;//is IE      
  this.ObjetoXLS=new ActiveXObject("Excel.Application");//Objeto excel 
  /*Ruta harcodeada, podr�a subirse en otra ruta o permitir al usuario seleccionar una ruta*/
//  this.ruta = 'C:/Users/cargauto/Documents/Files/everis/ProyectoGobierno/Documentaci�n del proyecto/GOBTUC/DOE/Tabla_test_case.xls';
  /*Columnas que necesitamos leer*/
  //Ver si es necesario que sea un atributo de clase
  this.index = 2; //Primer fila con datos
  this.filaProcesada = 1; //Contiene el n�mero de la fila que se este procesando
  this.cantidadDeCasos = 0;
  this.cantidadPasos = 0;
  if (IEx!=1) {
	  alert("Por ahora solo funciona en IE");
  }
};

// Abre la planilla que contiene los casos a importar a TestLink
Planilla.Prototype.abrir = function (ruta){
	this.ObjetoXLS.Workbooks.OPEN(ruta,false,false);
};

Planilla.Prototype.leerRegistro = function (){
	this.procesarFila();
	registro = new Registro(this);
	registro.inicializar(this.getFilaProcesada());	
	return registro;
};

Planilla.Prototype.getFilaProcesada = function() {
	return this.filaProcesada;
};

Planilla.Prototype.procesarFila = function() {
	this.filaProcesada++;
};