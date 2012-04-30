function BucketTool(){
	this.tolerance;
	this.init = function(){
		$('.paintBucketTool').show();
	}

	this.removeTool = function(){
		$('.paintBucketTool').hide();
		return null;
	}
	
	this.changeTolerance = function(val){
		
	}

	this.init();
}