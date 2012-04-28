Modes3DView = function(){
	this.init = function(){
		$("#modes3D").accordion({
			autoHeight: false,
		});

		$('#modes3D .ui-accordion-header').click(function(){
			var mode = $("#modes3D").accordion( "option", "active" );
			appController.webGL3D.mode = mode;
			console.debug(mode)
		});
	}

	this.init();
}