function WebGL2DTools(panel){
	var instance = this;
	this.panel = panel;
	var current_tool = null;
	var selected_area = null;
	this.color = 0x000ff;

	this.init = function(){
		this.startColorPicker();
		this.setupToolButtons();
		$('canvas')[0].onselectstart = function () { return false; };
		$('.toolControlSection').hide();
		//$('canvas')[0].onmousedown = function () { return false; };
		
		$('.scaleHorizontalSlider').slider({
			value:0,
			min:-99,
			max:99,
			slide: function( event, ui ) {
				var scale;
				if(ui.value < 0)
					scale = 1.0/(-1*ui.value/10+1);
				else if(ui.value > 0)
					scale = 1*(1.0+ui.value/25);
				else
					scale = 1.0;
				current_tool.changeScale(scale);
				$('.scaleHorizontalText').text('Scale : '+Math.round(scale*100)+'%');
			}
		});
		
		$('.scaleVerticalSlider').slider({
			value:0,
			min:-99,
			max:99,
			slide: function( event, ui ) {
				var scale;
				if(ui.value < 0)
					scale = 1.0/(-1*ui.value/10+1);
				else if(ui.value > 0)
					scale = 1*(1.0+ui.value/25);
				else
					scale = 1.0;
				current_tool.changeScale(scale);
				$('.scaleVerticalText').text('Scale : '+Math.round(scale*100)+'%');
			}
		});
	}

	this.setupToolButtons = function(){
		$('.toolButton').click(function(){
			$('.toolButton').removeClass('tool-selected');
			$(this).addClass('tool-selected');
			if(current_tool != null){
				selected_area = current_tool.removeTool();
			}
			if($(this).attr('title') == 'Rectangle Select'){
				current_tool = new RectangleSelector();
				appController.webGL2D.removeFromScene(selected_area);
			}
			else if($(this).attr('title') == 'Pencil Tool'){
				current_tool = new PencilTool();
				appController.webGL2D.removeFromScene(selected_area);
			}
			else if($(this).attr('title') == 'Crop Tool'){
				current_tool = new CropTool();
				appController.webGL2D.removeFromScene(selected_area);
			}
			else if($(this).attr('title') == 'Bucket Tool'){
				current_tool = new BucketTool();
			}
			else if($(this).attr('title') == 'Scale Horizontal'){
				current_tool = new ScaleHorizontalTool();
				appController.webGL2D.removeFromScene(selected_area);
			}
			else if($(this).attr('title') == 'Scale Vertical'){
				current_tool = new ScaleVerticalTool();
				appController.webGL2D.removeFromScene(selected_area);
			}
		});
	}

	this.startColorPicker = function(){
		$('#colorSelector').ColorPicker({
			color: '#0000ff',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},

			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},

			onChange: function (hsb, hex, rgb) {
				$('#colorSelector div').css('backgroundColor', '#' + hex);
				instance.color = parseInt('0x'+hex,16);
			}

		})
	}

	this.init()
}