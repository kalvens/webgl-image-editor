var appController;

function AppController()
{
  this.lsc;
  this.wc;
  this.ec;
  this.init = function(){
    lsc = new LoadSaveController();
    wc = new WindowController();
    ec = new EffectsController();
    webGLInit();
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