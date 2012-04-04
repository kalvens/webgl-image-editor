var appController;
//var webGlStarted = false;
function AppController()
{
  this.lsc;
  this.wc;
//this.webGLView;
  this.init = function(){
    lsc = new LoadSaveController();
//  webGLView = new WebGLView();
//  webGLView.init();
    wc = new WindowController(function(){
//      if(webGlStarted){
//        console.log("resize event");
//        render();
//    }
    });
    webGLInit();
    animate();
//    webGlStarted = true;
  }

  this.newImg = function(src){
    webGLView.setNewImage(src);
  }
}


$(document).ready(function(){
  appController = new AppController();
  appController.init();
});