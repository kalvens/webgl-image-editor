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
			value:5,
			min:0,
			max:11,
			slide: function( event, ui ) {
				var density = 10;
				switch(ui.value)
				{
				case 0: density = 1; break;
				case 1: density = 2; break;
				case 2: density = 4; break;
				case 3: density = 5; break;
				case 4: density = 8; break;
				case 5: density = 10; break;
				case 6: density = 16; break;
				case 7: density = 20; break;
				case 8: density = 40; break;
				case 9: density = 80; break;
				case 10: density = 128; break;
				case 11: density = 160; break;
				}
				appController.webGL3D.particleImage.updateDensity(density);
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