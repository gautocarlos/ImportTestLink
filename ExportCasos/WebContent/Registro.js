//Definimos el constructor para la clase registro. 
//Dicha clase contendrá un registro de la planilla de casos a importar 

Registro = function(planilla){
	this.planilla = planilla;
	this.titulo = null; 
	this.resumen = null;
	this.precondiciones = null;
	this.numeroPaso = null;
	this.acciones = null;
	this.resultado = null;
};

Registro.prototype.inicializar = function(fila){
	planilla = this.getPlanilla().getObjetoXLS();
    this.setTitulo(planilla.ActiveSheet.Cells(fila,1).Value);
    this.setResumen(planilla.ActiveSheet.Cells(fila,2).Value);
    this.setPrecondiciones(planilla.ActiveSheet.Cells(fila,3).Value);
    this.setNumeroPaso(planilla.ActiveSheet.Cells(fila,4).Value);
    this.setAcciones(planilla.ActiveSheet.Cells(fila,5).Value);
    this.setResultado(planilla.ActiveSheet.Cells(fila,6).Value);
};

// Getters

Registro.prototype.getPlanilla = function(){
	return this.planilla;
};

Registro.prototype.getTitulo = function(){
	return this.titulo;
};

Registro.prototype.getResumen = function(){
	return this.resumen;
};

Registro.prototype.getPrecondiciones = function(){
	return this.precondiciones;
};

Registro.prototype.getNumeroPaso = function(){
	return this.numeroPaso;
};

Registro.prototype.getAcciones = function(){
	return this.acciones;
};

Registro.prototype.getResultado = function(){
	return this.resultado;
};

//Setters

Registro.prototype.setPlanilla = function(planilla){
	this.planilla = planilla;
};

Registro.prototype.setTitulo = function(titulo){
	this.titulo = titulo;
};

Registro.prototype.setResumen = function(resumen){
	this.resumen = resumen;
};

Registro.prototype.setPrecondiciones = function(precondiciones){
	this.precondiciones = precondiciones;
};

Registro.prototype.setNumeroPaso = function(numeroPaso){
	this.numeroPaso = numeroPaso;
};

Registro.prototype.setAcciones = function(acciones){
	this.acciones = acciones;
};

Registro.prototype.setResultado = function(resultado){
	this.resultado = resultado;
};

Registro.prototype.esVacio = function(){
	if (this.getTitulo() == null || this.getTitulo() == "") {
		return true;
	}
	return false;
};