function RotateClockwise(){
	this.tolerance;
	this.init = function(){
		appController.webGL2D.rotateClockwise();
	}

	this.removeTool = function(){
		return null;
	}

	this.init();
}