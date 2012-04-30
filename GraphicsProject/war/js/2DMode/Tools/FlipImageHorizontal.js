function FlipImageHorizontal(){
	this.tolerance;
	this.init = function(){
		appController.webGL2D.flipImageHorizontal();
	}

	this.removeTool = function(){
		return null;
	}

	this.init();
}