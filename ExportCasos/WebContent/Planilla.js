//Definimos el constructor para la clase 
Planilla = function (){ 
  this.IEx=document.all?1:0;//is IE      
  this.ObjetoXLS=new ActiveXObject("Excel.Application");//Objeto excel 
  /*Ruta harcodeada, podría subirse en otra ruta o permitir al usuario seleccionar una ruta*/
//  this.ruta = 'C:/Users/cargauto/Documents/Files/everis/ProyectoGobierno/Documentación del proyecto/GOBTUC/DOE/Tabla_test_case.xls';
  /*Columnas que necesitamos leer*/
  //Ver si es necesario que sea un atributo de clase
  this.index = 2; //Primer fila con datos
  this.filaProcesada = 2; //Contiene el número de la fila que se este procesando
  this.cantidadDeCasos = 0;
  this.cantidadPasos = 0;
  if (this.IEx!=1) {
	  alert("Por ahora solo funciona en IE");
  }
};

// Abre la planilla que contiene los casos a importar a TestLink
Planilla.prototype.abrir = function (ruta){
	this.ObjetoXLS.Workbooks.OPEN(ruta,false,false);
};

Planilla.prototype.leerRegistro = function (){
//	this.procesarFila();
	registro = new Registro(this);
	registro.inicializar(this.getFilaProcesada());	
	return registro;
};

Planilla.prototype.getFilaProcesada = function() {
	return this.filaProcesada;
};

Planilla.prototype.decrementarFilaProcesada = function() {
	this.filaProcesada--;
};

Planilla.prototype.procesarFila = function() {
	this.filaProcesada++;
};

Planilla.prototype.getObjetoXLS = function() {
	return this.ObjetoXLS;
};

Planilla.prototype.cerrarPlanilla = function() {
	this.getObjetoXLS().Application.Quit();
	
};