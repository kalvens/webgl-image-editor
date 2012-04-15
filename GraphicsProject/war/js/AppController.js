var appController;

ViewMode = {
    2D : 0,
    3D : 1
}

function AppController()
{
  this.lsc;
  this.wc;
  this.ec;
  this.um;
  this.webGL2D;
  this.webGL3D;
  this.mode = {
      2D : 0,
      3D : 1
  }
  this.init = function(){
    this.lsc = new LoadSaveController();
    this.wc = new WindowController();
    this.um = new UniformManager();
    this.ec = new EffectsController(this.um);
    this.webGL2D = new WebGL2D();
  }
  
  this.togleMode = function(){
    if(this.mode == ViewMode.2d){
      Window.alert("You need to do this");
    }
  }
}


$(document).ready(function(){
  appController = new AppController();
  appController.init();
});