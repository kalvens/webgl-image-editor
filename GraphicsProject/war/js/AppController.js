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
}


$(document).ready(function(){
  var app = new AppController();
  app.init();
});