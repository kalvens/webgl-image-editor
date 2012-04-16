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
  this.mode = 0;
  this.init = function(){
    this.lsc = new LoadSaveController();
    this.wc = new WindowController();
    this.um = new UniformManager();
    this.ec = new EffectsController(this.um);
    this.webGL2D = new WebGLView2D();
    this.webGL = new WebGLView(this.webGL2D, null);
  }
  
  this.togleMode = function(){
    if(this.mode == 0){
      Window.alert("You need to do this");
    }
  }
}


$(document).ready(function(){
  appController = new AppController();
  appController.init();
});