function FlipImageVertical(){
	this.tolerance;
	this.init = function(){
		appController.webGL2D.flipImageVertical();
	}

	this.removeTool = function(){
		return null;
	}

	this.init();
}