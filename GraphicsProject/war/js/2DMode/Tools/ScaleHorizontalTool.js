function ScaleHorizontalTool(){
	this.tolerance;
	this.init = function(){
		$('.scaleHorizontal').show();
	}

	this.removeTool = function(){
		$('.scaleHorizontal').hide();
		return null;
	}
	
	this.changeScale = function(val){
		appController.webGL2D.scaleImageHorizontal(val);
	}

	this.init();
}