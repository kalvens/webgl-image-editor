var container, stats;
var camera, scene, renderer;
var width, height;


function webGLInit() {
  width = $('.main_view').width();
  height = $('.main_view').height();
  
  container = $('.main_view')[0];

//  var info = document.createElement( 'div' );
//  info.style.position = 'absolute';
//  info.style.top = '10px';
//  info.style.width = '100%';
//  info.style.textAlign = 'center';
//  info.innerHTML = '<a href="http://github.com/mrdoob/three.js" target="_blank">three.js</a> - orthographic view';
//  container.appendChild( info );

  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, - 2000, 1000 );
  camera.position.x = 200;
  camera.position.y = 100;
  camera.position.z = 200;

  scene = new THREE.Scene();

  scene.add( camera );

  // Grid

  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - 500, 0, 0 ) ) );
  geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 500, 0, 0 ) ) );

  for ( var i = 0; i <= 20; i ++ ) {

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
    line.position.z = ( i * 50 ) - 500;
    scene.add( line );

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
    line.position.x = ( i * 50 ) - 500;
    line.rotation.y = 90 * Math.PI / 180;
    scene.add( line );

  }

  // Cubes

  var geometry = new THREE.CubeGeometry( 50, 50, 50 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } );

  for ( var i = 0; i < 100; i ++ ) {

    var cube = new THREE.Mesh( geometry, material );

    cube.scale.y = Math.floor( Math.random() * 2 + 1 );

    cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    cube.position.y = ( cube.scale.y * 50 ) / 2;
    cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;

    scene.add(cube);

  }

  // Lights

  var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
  scene.add( ambientLight );

  var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add( directionalLight );

  var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add( directionalLight );

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( width, height );

  container.appendChild( renderer.domElement );

//  stats = new Stats();
//  stats.domElement.style.position = 'absolute';
//  stats.domElement.style.top = '0px';
//  container.appendChild( stats.domElement );

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
//  stats.update();

}

function render() {

  var timer = new Date().getTime() * 0.0001;

  camera.position.x = Math.cos( timer ) * 200;
  camera.position.z = Math.sin( timer ) * 200;
  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}





//var state, scene, renderer, camera, cameraControl, imgPlane, width, height;

//var webGLInit = function()
//{
//width = $('.main_view').width();
//height = $('.main_view').height();
//if(Detector.webgl)
//{
//renderer = new THREE.WebGLRenderer({
////antialias : true,
////preserveDrawingBuffer : true
//});
//renderer.setClearColorHex(0xBBBBBB ,1);
//}
//else{
//Detector.addGetWebGLMessage();
//return true;
//}
//console.debug(width, height);
//renderer.setSize(width, height);
//$('.main_view')[0].appendChild(renderer.domElement);

//// create a scene
//scene = new THREE.Scene();

//// put a camera in the scene
//camera = new THREE.PerspectiveCamera(35, width / height, 1, 10000 );
////camera = new THREE.OrthographicCamera(  width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
//camera.position.set(0, 0, 1000);
//scene.add(camera);

//// allow 'p' to make screenshot
//THREEx.Screenshot.bindKey(renderer);
//// allow 'f' to go fullscreen where this feature is supported
//if( THREEx.FullScreen.available() ){
//THREEx.FullScreen.bindKey();
//}

//var texture = new THREE.ImageUtils.loadTexture('images/sample_pic_01.jpg');
//var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
//texture.needsUpdate = true;
//var geometry = new THREE.PlaneGeometry(640,400);
//var meshCanvas = new THREE.Mesh(geometry, materialCanvas);
//meshCanvas.scale.set(1,1,1);
//meshCanvas.doubleSided = true;

//imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshBasicMaterial({
//color: 0x000000
//}))
//imgPlane.overdraw = true;
//scene.add(meshCanvas);
//}

//function animate(){
//requestAnimationFrame( animate );

//render();
//}

//function render(){
//console.debug("rendering")
//renderer.render( scene, camera );
//}
//function webGLResize()
//{
//width = $('main_view').width();
//height = $('main_view').height();
//renderer.setSize( width, height );
//camera.aspect = width / height;
//camera.updateProjectionMatrix();
//}



//function WebGLView()
//{
//var webGLView = this;
//this.state;
//this.scene;
//this.renderer;
//this.camera;
//this.cameraControl;
//this.imgPlane;
//this.width;
//this.height;

//this.init = function()
//{
//this.width = $('main_view').width();
//this.height = $('main_view').height();
//if(Detector.webgl)
//{
//this.renderer = new THREE.WebGLRenderer({
//antialias : true,
//preserveDrawingBuffer : true
//});
//this.renderer.setClearColorHex(0xBBBBBB ,1);
//}
//else{
//Detector.addGetWebGLMessage();
//return true;
//}
//this.renderer.setSize(this.width, this.height);
//document.getElementById('container').appendChild(this.renderer.domElement);

//// create a scene
//this.scene = new THREE.Scene();

//// put a camera in the scene
//this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 10000 );
////this.camera = new THREE.OrthographicCamera(  this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000 );
//this.camera.position.set(0, 0, 1000);
//this.scene.add(this.camera);

//// create a camera contol
//this.cameraControls  = new THREEx.DragPanControls(this.camera)

//// transparently support window resize
//THREEx.WindowResize.bind(this.renderer, this.camera);
//// allow 'p' to make screenshot
//THREEx.Screenshot.bindKey(this.renderer);
//// allow 'f' to go fullscreen where this feature is supported
//if( THREEx.FullScreen.available() ){
//THREEx.FullScreen.bindKey();
//}

//var texture = new THREE.ImageUtils.loadTexture('images/sample_pic_01.jpg');
//var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
//texture.needsUpdate = true;
//var geometry = new THREE.PlaneGeometry(640,400);
//var meshCanvas = new THREE.Mesh(geometry, materialCanvas);
//meshCanvas.scale.set(1,1,1);
//meshCanvas.doubleSided = true;

//this.imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshBasicMaterial({
//color: 0x000000
//}))
//this.imgPlane.overdraw = true;
//this.scene.add(meshCanvas);
//animate();
//}

//// render the scene
//this.render = function(){

//// update camera controls
//// this.cameraControls.update();

//this.renderer.clear();
////this.cameraControls.update();
//this.renderer.render(this.scene, this.camera);

//// actually render the scene
////this.renderer.render( this.scene, this.camera );
//}

//this.setNewImage =function(src)
//{
//texture = THREE.ImageUtils.loadTexture(src, {}, function(){
//webGLView.render();
//});
//this.scene.remove(this.imgPlane);
//this.imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(300,300), new THREE.MeshBasicMaterial({
//map: texture
//}))
//}
//}