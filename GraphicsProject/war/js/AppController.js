var appController;

function animate()
{
  requestAnimationFrame(this.animate);
  appController.render();
}

function AppController()
{
  this.lsc;
  this.wc;
  this.webGLView;
  this.init = function(){
    lsc = new LoadSaveController();
    webGLView = new WebGLView();
    webGLView.init();
    wc = new WindowController(function(){
      webGLView.render();
    });
    webGLView.render();
  }
  
  this.newImg = function(src){
    webGLView.setNewImage(src);
  }
  
  this.render = function(){
    webGLView.render();
  }
}


$(document).ready(function(){
  appController = new AppController();
  appController.init();
});