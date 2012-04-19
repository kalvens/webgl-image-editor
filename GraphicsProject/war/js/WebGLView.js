function WebGLView(webGL2D, webGL3D){
  var instance = this;

  this.webGL2D = webGL2D;
  this.webGL3D = webGL3D;
  this.renderer;
  this.width;
  this.height;
  this.container;

  this.webGLInit = function() {
    this.width = 1280;//$('.main_view').width();
    this.height = 800;//$('.main_view').height();

    this.container = $('.main_view')[0];

    if(Detector.webgl)
    {
      this.renderer = new THREE.WebGLRenderer({
        antialias : true,
        preserveDrawingBuffer : true,
        maxLights: 7
      });
      this.renderer.setClearColorHex(0x000000 ,1);
    }
    else{
      Detector.addGetWebGLMessage();
      return true;
    }
    
    this.renderer.sortObjects = true;
//    this.renderer.shadowMapEnabled = true;
    

    webGL2D.renderer = this.renderer;
    webGL3D.renderer = this.renderer;

    this.renderer.setSize( this.width, this.height );
//    this.renderer.shadowMapSoft = true;

    this.container.appendChild( this.renderer.domElement );

    //transparently support window resize
    //THREEx.WindowResize.bind(this.renderer, this.camera);
    //allow 'p' to make screenshot
    THREEx.Screenshot.bindKey(this.renderer);
    //allow 'f' to go fullscreen where this feature is supported
    if( THREEx.FullScreen.available() ){
      THREEx.FullScreen.bindKey();
    }

    this.animate();
  }



  this.animate = function() {

    requestAnimationFrame( instance.animate );

    instance.render();
  }

  this.render = function  () {

    if(appController.mode == 0){
      this.renderer.render( webGL2D.getScene(), webGL2D.getCamera() );
    }else if(appController.mode == 1){
      webGL3D.getControls().update(webGL3D.getClock().getDelta());
//      webGL3D.sun.position.z += .25;
//      if(webGL3D.sun.position.z > 200)
//        webGL3D.sun.position.z = -200;
      this.renderer.render( webGL3D.getScene(), webGL3D.getCamera() );
    }else
      Window.alert("Uknown mode for displaying content");
  }

  this.webGLInit()

}