function WebGLView()
{
  var webGLView = this;
  this.state;
  this.scene;
  this.renderer;
  this.camera;
  this.cameraControl;
  this.imgPlane;
  
  this.init = function()
  {
    if(Detector.webgl)
    {
      this.renderer = new THREE.WebGLRenderer({
        antialias : true,
        preserveDrawingBuffer : true
      });
      this.renderer.setClearColorHex(0xBBBBBB ,1);
    }
    else{
      Detector.addGetWebGLMessage();
      return true;
    }
    this.renderer.setSize($('main_view').width(), $('main_view').height());
    document.getElementById('container').appendChild(this.renderer.domElement);

    // create a scene
    this.scene = new THREE.Scene();

    // put a camera in the scene
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.set(0, 0, 1000);
    this.scene.add(this.camera);

    // create a camera contol
    this.cameraControls  = new THREEx.DragPanControls(this.camera)

    // transparently support window resize
    THREEx.WindowResize.bind(this.renderer, this.camera);
    // allow 'p' to make screenshot
    THREEx.Screenshot.bindKey(this.renderer);
    // allow 'f' to go fullscreen where this feature is supported
    if( THREEx.FullScreen.available() ){
      THREEx.FullScreen.bindKey();
    }
    
    var texture = new THREE.ImageUtils.loadTexture('images/sample_pic_01.jpg');
    var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
    texture.needsUpdate = true;
    var geometry = new THREE.PlaneGeometry(1280,800);
    var meshCanvas = new THREE.Mesh(geometry, materialCanvas);
    meshCanvas.scale.set(1,1,1);
    meshCanvas.doubleSided = true;
    
    this.imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshBasicMaterial({
      color: 0x000000
    }))
    this.imgPlane.overdraw = true;
    this.scene.add(meshCanvas);
    animate();
  }
  
  // render the scene
  this.render = function(){

    // update camera controls
    // this.cameraControls.update();

    this.renderer.clear();
    //this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
    
    // actually render the scene
    //this.renderer.render( this.scene, this.camera );
  }
  
  this.setNewImage =function(src)
  {
    texture = THREE.ImageUtils.loadTexture(src, {}, function(){
      webGLView.render();
    });
    this.scene.remove(this.imgPlane);
    this.imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(300,300), new THREE.MeshBasicMaterial({
      map: texture
    }))
  }
}