function WebGLView3D(){
	var instance = this;
	this.scene;
	this.camera;
	this.controls;
	this.renderer;
	this.width;
	this.height;
	this.mouseDown = false;
	this.mouseX = 0;
	this.mouseY = 0;
	this.clock = new THREE.Clock();
	this.sun;
	this.particleImage;


	this.init = function(){
		this.width = 1280;//$('.main_view').width();
		this.height = 800;//$('.main_view').height();

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 20000 );
		this.camera.position.y = 0;
		this.camera.position.z = -500;
		this.camera.position.x = 0;
		
		this.camera.lookAt(new THREE.Vector3(0,0,0) );

		this.scene = new THREE.Scene();

		this.scene.add( this.camera );

//		this.controls = new THREE.FirstPersonControls ( this.camera , $('canvas')[0]);
//		this.controls.movementSpeed = 100;
//		this.controls.lookSpeed = 0.1;
//		this.controls.activeLook = false;
//		this.controls.lookVertical  = false;

		this.setup3DParticleImage();
		
		this.setupMouseControls();
	}

	this.getCamera = function(){
		return this.camera;
	}

	this.getScene = function(){
		return this.scene;
	}

	this.getControls = function(){
		return this.controls;
	}

	this.getClock = function(){
		return this.clock;
	}

	this.setup3DParticleImage = function(){
		var image = new Image();
		$(image).attr('src', "images/sample_pic_01.jpg").load(function(){
			instance.particleImage = new ParticleImage(image, instance.scene);
		});
	}

	this.setupMouseControls = function(){
//		$(document).mousedown(function(ev){
//			console.debug("mouse down");
//			instance.controls.activeLook = true;
//		});
//		$(document).mouseup(function(ev){
//			console.debug("mouse up");
//			instance.controls.activeLook = false;
//		});
	}
	
	this.update = function(){
		this.particleImage.update(this.camera);
	}

	this.init();
}