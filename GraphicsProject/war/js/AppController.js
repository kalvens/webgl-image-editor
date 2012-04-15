var appController;

function AppController()
{
  this.lsc;
  this.wc;
  this.ec;
  this.um;
  this.webGL2D;
  this.init = function(){
    this.lsc = new LoadSaveController();
    this.wc = new WindowController();
    this.um = new UniformManager();
    this.ec = new EffectsController(this.um);
    this.webGL2D = new WebGL2D();
  }
}


$(document).ready(function(){
  appController = new AppController();
  appController.init();
});