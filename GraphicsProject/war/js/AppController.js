var appController;

function AppController()
{
	this.lsc;
	this.wc;
	this.ec;
	this.um;
	this.webGL2D;
	this.webGL3D;
	this.webGL;
	this.webGL2DTools;
	this.mode = 0;
	this.init = function(){
		this.lsc = new LoadSaveController();
		this.wc = new WindowController();
		this.um = new UniformManager();
		this.ec = new EffectsController(this.um);
		this.webGL2D = new WebGLView2D();
		this.webGL3D = new WebGLView3D();
		this.webGL = new WebGLView(this.webGL2D, this.webGL3D);
		this.webGL2DTools = new WebGL2DTools(null);
	}

	this.togleMode = function(){
		if(this.mode == 0){
			this.mode = 1;
			//Hide 2D Effects and Show 3D Effects
			$('.mode2D').addClass('hide_div');
			$('.mode3D').removeClass('hide_div');
		}
		else{
			this.mode = 0;
			$('.mode3D').addClass('hide_div');
			$('.mode2D').removeClass('hide_div');
		}
	}
}


$(document).ready(function(){
	$('.mode3D').addClass('hide_div');
	appController = new AppController();
	appController.init();
});