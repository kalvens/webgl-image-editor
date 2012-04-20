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


	this.init = function(){
		this.width = 1280;//$('.main_view').width();
		this.height = 800;//$('.main_view').height();

		this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 20000 );
		this.camera.position.y = 7.5;
		this.camera.position.z = -75;
		this.camera.position.x = -25;

		this.scene = new THREE.Scene();

		this.scene.add( this.camera );

		this.controls = new THREE.FirstPersonControls ( this.camera , $('canvas')[0]);
		this.controls.movementSpeed = 30;
		this.controls.lookSpeed = 0.1;
		this.controls.activeLook = false;
		this.controls.lookVertical  = false;

		this.drawFloor();
		this.drawMuseumWalls();
		this.setupLights();
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

	this.drawFloor = function(){
		//  Plane
		var marbleTexture = new THREE.ImageUtils.loadTexture("images/Wooden-Floor.jpg");
		marbleTexture.needsUpdate = true;
		marbleTexture.wrapS = THREE.RepeatWrapping;
		marbleTexture.wrapT = THREE.RepeatWrapping;
		marbleTexture.repeat.x = 3;
		marbleTexture.repeat.y = 6;

//		var wallTexture = new THREE.ImageUtils.loadTexture("images/wall-texture-high-resolution.jpg");
//		wallTexture.needsUpdate = true;
//		wallTexture.wrapS = THREE.RepeatWrapping;
//		wallTexture.wrapT = THREE.RepeatWrapping;
//		wallTexture.repeat.x = 10;
//		wallTexture.repeat.y = 1;

		var material = new THREE.MeshPhongMaterial({map : marbleTexture});
		var plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 200 , 15, 30), material);
		plane.rotation.x = - 90 * ( Math.PI / 180 );
		plane.doubleSided = true;
		plane.receiveShadow = true;
		this.scene.add( plane );
	}

	this.drawMuseumWalls = function(){
		var wallTexture = new THREE.ImageUtils.loadTexture("images/free-stone-wall-texture.jpg");
		wallTexture.needsUpdate = true;
		wallTexture.wrapS = THREE.RepeatWrapping;
		wallTexture.wrapT = THREE.RepeatWrapping;

		var columnTexture = new THREE.ImageUtils.loadTexture("images/concrete.jpg");
		columnTexture.needsUpdate = true;
		columnTexture.wrapS = THREE.RepeatWrapping;
		columnTexture.wrapT = THREE.RepeatWrapping;
		columnTexture.repeat.x = 1;
		columnTexture.repeat.y = 6;

		var borderShortTexture = new THREE.ImageUtils.loadTexture("images/concrete.jpg");
		borderShortTexture.needsUpdate = true;
		borderShortTexture.wrapS = THREE.RepeatWrapping;
		borderShortTexture.wrapT = THREE.RepeatWrapping;
		borderShortTexture.repeat.x = 12.5;
		borderShortTexture.repeat.y = 1;

		var borderLongTexture = new THREE.ImageUtils.loadTexture("images/concrete.jpg");
		borderLongTexture.needsUpdate = true;
		borderLongTexture.wrapS = THREE.RepeatWrapping;
		borderLongTexture.wrapT = THREE.RepeatWrapping;
		borderLongTexture.repeat.x = 25;
		borderLongTexture.repeat.y = 1;

		//  Cube
		var materials = [];
		for ( var i = 0; i < 6; i ++ ) {
			materials.push( new THREE.MeshPhongMaterial( {map : wallTexture} ) );
		}
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 96, 20, 4, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 10;
		cube.position.x = -25;
		cube.rotation.y = - 90 * ( Math.PI / 180 );
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 96, 20, 4, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 10;
		cube.position.x = 25;
		cube.rotation.y = - 90 * ( Math.PI / 180 );
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 46, 20, 4, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 10;
		cube.position.z = -50;
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 46, 20, 4, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 10;
		cube.position.z = 50;
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var column_materials = [];
		for (var i=0; i < 6; i++)
		{
			column_materials.push( new THREE.MeshPhongMaterial( {map : columnTexture}))
		}

		//Draw columns
		for(var i=0; i < 2; ++i){
			for(var j=0; j < 2; ++ j){
				var cube = new THREE.Mesh( new THREE.CubeGeometry( 4, 24, 4, 1, 1, 1, column_materials ), new THREE.MeshFaceMaterial() );
				cube.position.x = 25-50*i;
				cube.position.y = 12
				cube.position.z = -50+100*j;
				cube.castShadow = true;
				cube.receiveShadow = true;
				this.scene.add( cube );
			}
		}

		var border_short_materials = [];
		for (var i=0; i < 6; i++)
		{
			border_short_materials.push( new THREE.MeshPhongMaterial( {map : borderShortTexture}))
		}

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 96, 4, 4, 1, 1, 1, border_short_materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 22;
		cube.position.x = -25;
		cube.rotation.y = - 90 * ( Math.PI / 180 );
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 96, 4, 4, 1, 1, 1, border_short_materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 22;
		cube.position.x = 25;
		cube.rotation.y = - 90 * ( Math.PI / 180 );
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 46, 4, 4, 1, 1, 1, border_short_materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 22;
		cube.position.z = -50;
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );

		var cube = new THREE.Mesh( new THREE.CubeGeometry( 46, 4, 4, 1, 1, 1, border_short_materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 22;
		cube.position.z = 50;
		cube.castShadow = true;
		cube.receiveShadow = true;
		this.scene.add( cube );
	}

	this.setupPictures = function(){
		var textures = new array();
		var geometry = new array();
		textures[0] = new THREE.ImageUtils.loadTexture("images/sample_pic_01.jpg");
		textures[0].needsUpdate = true;
		textures[1] = new THREE.ImageUtils.loadTexture("images/sample_pic_02.jpg");
		textures[1].needsUpdate = true;
		textures[2] = new THREE.ImageUtils.loadTexture("images/sample_pic_03.jpg");
		textures[2].needsUpdate = true;
		textures[3] = new THREE.ImageUtils.loadTexture("images/sample_pic_04.jpg");
		textures[3].needsUpdate = true;
		textures[4] = new THREE.ImageUtils.loadTexture("images/sample_pic_05.jpg");
		textures[5].needsUpdate = true;

		for(var i=0; i < textures.length; ++i)
		{
		
		}
	}

	this.setupLights = function(){
//		this.sun = new THREE.SpotLight( 0xffffff , .5, 500, true);
//		this.sun.position.x = 0;
//		this.sun.position.y = 100;
//		this.sun.position.z = -200;
//		this.sun.shadowCameraVisible = true;
//		this.scene.add(this.sun);

		var ambientLight = new THREE.AmbientLight(0x707070);
		this.scene.add(ambientLight);
	}

	this.setupMouseControls = function(){
		$(document).mousedown(function(ev){
			console.debug("mouse down");
			instance.controls.activeLook = true;
		});
		$(document).mouseup(function(ev){
			console.debug("mouse up");
			instance.controls.activeLook = false;
		});
	}
	
	this.init();
}