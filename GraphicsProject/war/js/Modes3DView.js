Modes3DView = function(){
	this.init = function(){
		$("#modes3D").accordion({
			autoHeight: false,
		});

		$('#modes3D .ui-accordion-header').click(function(){
			var mode = $("#modes3D").accordion( "option", "active" );
			if(mode == 0)
				appController.webGL3D.particleImage.controls.enabled = true;
			else
				appController.webGL3D.particleImage.controls.enabled = false;
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
		$('.particleImageSlider').slider({
			value:1,
			min:1,
			max:22,
			slide: function( event, ui ) {
				if(ui.value < 10)
					var src = "images/sampleHD/sample_pic_0"+ui.value+".jpg";
				else
					var src = "images/sampleHD/sample_pic_"+ui.value+".jpg";
				var image = new Image();
				$(image).attr('src', src).load(function(){
					appController.webGL3D.particleImage.updateImage(image);
				});
			}
		});
	}

	this.init();
}