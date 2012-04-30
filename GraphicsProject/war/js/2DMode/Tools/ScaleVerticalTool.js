function ScaleVerticalTool(){
	this.tolerance;
	this.init = function(){
		$('.scaleVertical').show();
	}

	this.removeTool = function(){
		$('.scaleVertical').hide();
		return null;
	}
	
	this.changeScale = function(val){
		appController.webGL2D.scaleImageVertical(val);
	}

	this.init();
}