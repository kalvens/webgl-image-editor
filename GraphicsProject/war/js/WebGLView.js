var container, stats;
var camera, scene, renderer;
var width, height;
var picture;

var uniforms = {
    uSampler : {type:"t", value:1, texture: null},
    brightness : {type:"f", value: 0.0},
    contrast : {type:"f", value: 1.0},
};

function returnUniformsToDefault(){
  uniforms.brightness.value = 1.0;
  uniforms.contrast.value = 1.0;
}

function changeImageBrightness(val){
  uniforms.brightness.value = val;
}

function changeImageContrast(val){
  uniforms.contrast.value = val;
}

function webGLInit() {
  width = 1280;//$('.main_view').width();
  height = 800;//$('.main_view').height();

  container = $('.main_view')[0];

  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -1, 1000 );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 200;

  scene = new THREE.Scene();

  scene.add( camera );

  //Photo
  var texture = new THREE.ImageUtils.loadTexture('images/sample_pic_01.jpg');
  var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
  texture.needsUpdate = true;
  var geometry = new THREE.PlaneGeometry(1280,800);
  picture = new THREE.Mesh(geometry, materialCanvas);
  picture.scale.set(1,1,1);
  picture.doubleSided = true;
  picture.position.x = 0;
  picture.position.y = 0;
  picture.position.z = 0;
  scene.add(picture);


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
  renderer.setSize( width, height );

  container.appendChild( renderer.domElement );

  //transparently support window resize
  THREEx.WindowResize.bind(this.renderer, this.camera);
  //allow 'p' to make screenshot
  THREEx.Screenshot.bindKey(this.renderer);
  //allow 'f' to go fullscreen where this feature is supported
  if( THREEx.FullScreen.available() ){
    THREEx.FullScreen.bindKey();
  }
  
  changePhoto('images/sample_pic_01.jpg');
}



function animate() {

  requestAnimationFrame( animate );

  render();
}

function render() {

  var timer = new Date().getTime() * 0.0001;

//camera.position.x = Math.cos( timer ) * 200;
//camera.position.z = Math.sin( timer ) * 200;
//camera.lookAt( scene.position );

  renderer.render( scene, camera );

}

function changePhoto(src, isPath) {

  if(typeof isPath == 'undefined')
     isPath = true;
  scene.remove(picture);
  if(isPath)
    var texture = new THREE.ImageUtils.loadTexture(src);
  else{
    var texture = new THREE.Texture();
  }
  var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
  texture.needsUpdate = true;
  var geometry = new THREE.PlaneGeometry(1280,800);
  
  //create the sphere's material
  var shaderMaterial = simpleShader(texture);

  picture = new THREE.Mesh(geometry, shaderMaterial);
  picture.scale.set(1,1,1);
  picture.doubleSided = true;
  picture.position.x = 0;
  picture.position.y = 0;
  picture.position.z = 0;
  scene.add(picture);
}

function simpleShader(texture)
{ 
  uniforms.uSampler.texture = texture;
  
  var attributes = {
      vTextureCoord : {type:""}
  }
  
  var shaderMaterial = new THREE.ShaderMaterial({
    uniforms : uniforms,
    vertexShader : $('#vertexshader').text(),
    fragmentShader: $('#fragmentshader').text()
  })
  
  return shaderMaterial;
}

function caputureCurrentPic(){
  
  var dataurl = renderer.domElement.toDataURL('image/jpeg');
  var image = document.createElement('img');
  
  $(image).attr('src', dataurl).load(function(){
    scene.remove(picture);
    
    var texture = new THREE.Texture( image );
    texture.needsUpdate = true;
    

    var geometry = new THREE.PlaneGeometry(1280,800);
    
    //create the sphere's material
    var shaderMaterial = simpleShader(texture);

    picture = new THREE.Mesh(geometry, shaderMaterial);
    picture.scale.set(1,1,1);
    picture.doubleSided = true;
    picture.position.x = 0;
    picture.position.y = 0;
    picture.position.z = 0;
    
    scene.add(picture);
  });

  image.src = dataurl;
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

////create a scene
//scene = new THREE.Scene();

////put a camera in the scene
//camera = new THREE.PerspectiveCamera(35, width / height, 1, 10000 );
////camera = new THREE.OrthographicCamera(  width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
//camera.position.set(0, 0, 1000);
//scene.add(camera);

////allow 'p' to make screenshot
//THREEx.Screenshot.bindKey(renderer);
////allow 'f' to go fullscreen where this feature is supported
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

////create a scene
//this.scene = new THREE.Scene();

////put a camera in the scene
//this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 10000 );
////this.camera = new THREE.OrthographicCamera(  this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000 );
//this.camera.position.set(0, 0, 1000);
//this.scene.add(this.camera);

////create a camera contol
//this.cameraControls  = new THREEx.DragPanControls(this.camera)

////transparently support window resize
//THREEx.WindowResize.bind(this.renderer, this.camera);
////allow 'p' to make screenshot
//THREEx.Screenshot.bindKey(this.renderer);
////allow 'f' to go fullscreen where this feature is supported
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

////render the scene
//this.render = function(){

////update camera controls
////this.cameraControls.update();

//this.renderer.clear();
////this.cameraControls.update();
//this.renderer.render(this.scene, this.camera);

////actually render the scene
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