//Definimos el constructor para la clase registro. 
//Dicha clase contendrá un registro de la planilla de casos a importar 

var Registro = function(planilla){
	this.planilla = planilla;
	this.titulo = null; 
	this.resumen = null;
	this.precondiciones = null;
	this.numeroPaso = null;
	this.acciones = null;
	this.resultado = null;
};

Registro.Prototype.inicializar = function(fila){
	var planilla = this.getPlanilla();
    this.setTitulo(planilla.ActiveSheet.Cells(fila,1).Value);
    this.setResumen(planilla.ActiveSheet.Cells(fila,2).Value);
    this.setPrecondiciones(planilla.ActiveSheet.Cells(fila,3).Value);
    this.setNumeroPaso(planilla.ActiveSheet.Cells(fila,4).Value);
    this.setAcciones(planilla.ActiveSheet.Cells(fila,5).Value);
    this.setResultado(planilla.ActiveSheet.Cells(fila,6).Value);
};

// Getters

Registro.Prototype.getPlanilla = function(){
	return this.planilla;
};

Registro.Prototype.getTitulo = function(){
	return this.titulo;
};

Registro.Prototype.getResumen = function(){
	return this.resumen;
};

Registro.Prototype.getPrecondiciones = function(){
	return this.precondiciones;
};

Registro.Prototype.getNumeroPaso = function(){
	return this.numeroPaso;
};

Registro.Prototype.getAcciones = function(){
	return this.acciones;
};

Registro.Prototype.getResultado = function(){
	return this.resultado;
};

//Setters

Registro.Prototype.setPlanilla = function(planilla){
	this.planilla = planilla;
};

Registro.Prototype.setTitulo = function(titulo){
	this.titulo = titulo;
};

Registro.Prototype.getResumen = function(){
	return this.resumen;
};

Registro.Prototype.setPrecondiciones = function(precondiciones){
	this.precondiciones = precondiciones;
};

Registro.Prototype.setNumeroPaso = function(numeroPaso){
	this.numeroPaso = numeroPaso;
};

Registro.Prototype.setAcciones = function(acciones){
	this.acciones = acciones;
};

Registro.Prototype.setResultado = function(resultado){
	this.resultado = resultado;
};

Registro.Prototype.esVacio = function(fila){
	if (this.getTitulo() == null || this.getTitulo() == "") {
		return true;
	}
	return false;
};