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
		//$('canvas')[0].onmousedown = function () { return false; };
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