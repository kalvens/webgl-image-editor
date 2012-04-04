function dragEnter(evt)
{
  alert("drag enter");
}
function dragDrop(evt)
{
  alert("drag drop");
}
function dragExit()
{
  alert("drag exit");
}
function dragOver()
{
  alert("drag over");
}


function WebGLView()
{
  this.state;
  this.scene;
  this.renderer;
  this.camera;
  this.cameraControl;

  this.dragAndDrop = function()
  {
    var container = $('#container')[0];
    var body = $('body')[0];
    body.addEventListener("dragenter",dragEnter, false);
    container.addEventListener("dragexit",dragExit, false);
    container.addEventListener("dragover",dragOver, false);
    container.addEventListener("drop",dragDrop, false);
  }
  
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
    this.camera.position.set(0, 0, 5);
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

    // here you add your objects
    // - you will most likely replace this part by your own
    var geometry  = new THREE.TorusGeometry( 1, 0.42 );
    var material  = new THREE.MeshNormalMaterial();
    var mesh  = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    this.dragAndDrop();
  }

  // render the scene
  this.render = function(){

    // update camera controls
    this.cameraControls.update();

    // actually render the scene
    this.renderer.render( this.scene, this.camera );
  }
}