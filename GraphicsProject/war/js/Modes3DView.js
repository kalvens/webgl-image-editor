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

		this.particleControlsInit();
	}

	this.particleControlsInit = function(){
		$('.particleDensitySlider').slider({
			value:10,
			min:2,
			max:50,
			slide: function( event, ui ) {
				appController.webGL3D.particleImage.updateDensity(ui.value);
			}
		});
		$('.particleCameraSpeedSlider').slider({
			value:1,
			min:-20,
			max:20,
			slide: function( event, ui ) {
				appController.webGL3D.particleImage.orbit_rate = ui.value/100.0
			}
		});
	}

	this.init();
}