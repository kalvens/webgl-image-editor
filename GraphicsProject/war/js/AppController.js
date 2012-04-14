var appController;

function AppController()
{
  this.lsc;
  this.wc;
  this.ec;
  this.um;
  this.init = function(){
    this.lsc = new LoadSaveController();
    this.wc = new WindowController();
    this.um = new UniformManager();
    this.ec = new EffectsController(this.um);
    webGLInit(this.um);
    animate();
  }

  this.newImg = function(src){
    changePhoto(src);
  }
}


$(document).ready(function(){
  appController = new AppController();
  appController.init();
});