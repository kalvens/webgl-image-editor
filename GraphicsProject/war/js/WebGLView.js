var container, stats;
var camera, scene, renderer;
var width, height;
var picture;
var webGlum;

function webGLInit(um) {
  webGlum = um;
  width = 1280;//$('.main_view').width();
  height = 800;//$('.main_view').height();

  container = $('.main_view')[0];

  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 1000 );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1000;

  scene = new THREE.Scene();

  scene.add( camera );

  //Photo
  var texture = new THREE.ImageUtils.loadTexture('images/sample_pic_01.jpg');
  var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
  texture.needsUpdate = true;
  var geometry = new THREE.PlaneGeometry(width,height);
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
  //THREEx.WindowResize.bind(this.renderer, this.camera);
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

function changePhoto(src) {
  var image = document.createElement('img');
  scene.remove(picture);
  $(image).attr('src', src).load(function(){
    resizeView(this.width, this.height)
    
    var texture = new THREE.ImageUtils.loadTexture(src);
    texture.needsUpdate = true;
    
    var geometry = new THREE.PlaneGeometry(width,height);
    
    var shaderMaterial = simpleShader(texture);

    picture = new THREE.Mesh(geometry, shaderMaterial);
    picture.scale.set(1,1,1);
    picture.doubleSided = true;
    picture.position.x = 0;
    picture.position.y = 0;
    picture.position.z = 0;
    scene.add(picture);
  });
}

function simpleShader(texture)
{ 
  appController.um.setTexture(texture);
  
  var attributes = {
      vTextureCoord : {type:""}
  }
  
  var shaderMaterial = new THREE.ShaderMaterial({
    uniforms : appController.um.getUniforms(),
    vertexShader : $('#vertexshader').text(),
    fragmentShader: $('#fragmentshader').text()
  })
  
  return shaderMaterial;
}

function caputureCurrentPic(){
  
  var dataurl = renderer.domElement.toDataURL('image/png');
  console.debug(dataurl);
  var image = document.createElement('img');
  
  $(image).attr('src', dataurl).load(function(){
    scene.remove(picture);
    
    var texture = new THREE.Texture( image );
    texture.needsUpdate = true;

    var geometry = new THREE.PlaneGeometry(width,height);
    
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

function resizeView(newWidth, newHeight, callback)
{
  //reset width and height varriables
  width = newWidth;
  height = newHeight;
  
  //reset render size
  renderer.setSize(width, height);
  
  //reset canvas size
  $('canvas').width(width);
  $('canvas').height(height);
  
  //reset camera
  camera.left =  width / - 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = height / - 2;
  camera.near = 0;
  camera.far = 1000;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1000;
  
  camera.updateProjectionMatrix();
  
  if(typeof callback != 'undefined')
    callback();
  
  appController.wc.resizeSections();

  appController.um.changeSize(width, height);
}