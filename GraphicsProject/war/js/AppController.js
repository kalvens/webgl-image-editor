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
	this.modes3DView;
	this.init = function(){
		this.um = new UniformManager();
		this.webGL2D = new WebGLView2D();
		this.webGL3D = new WebGLView3D();
		this.webGL = new WebGLView(this.webGL2D, this.webGL3D);
		this.webGL2DTools = new WebGL2DTools(null);
		this.modes3DView = new Modes3DView();
		
		this.lsc = new LoadSaveController();
		this.wc = new WindowController();
		this.ec = new EffectsController(this.um);
	}

	this.togleMode = function(){
		if(this.mode == 0){
			this.mode = 1;
			//Hide 2D Effects and Show 3D Effects
			$('.mode2D').addClass('hide_div');
			$('.mode3D').removeClass('hide_div');
			this.webGL3D.particleImage.controls.enabled = true;
		}
		else{
			this.mode = 0;
			this.webGL3D.particleImage.controls.enabled = false;
			$('.mode3D').addClass('hide_div');
			$('.mode2D').removeClass('hide_div');
		}
		this.wc.resizeSections();
		this.wc.checkCanvasSize();
	}
	
	this.resizeCanvas = function(){
		if(this.mode == 0){
			this.webGL.resizeCanvas(0);
		}
		else{
			$('.main_view').removeClass("overflowScroll");
			this.webGL.resizeCanvas(1, $('.main_view').width(),$('.main_view').height());
		}
	}
}


$(document).ready(function(){
	$('.mode3D').addClass('hide_div');
	appController = new AppController();
	appController.init();
});