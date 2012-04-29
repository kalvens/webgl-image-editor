ParticleImage = function(image){
	this.canvas;
	this.context;
	this.scene;
	this.camera;
	this.controls;
	this.image = image;
	this.width = $('canvas').width();
	this.height = $('canvas').height();
	this.density = 10;
	this.depth = Math.max(this.width, this.height);
	this.orbit_rate = 0.01;
	this.orbitValue = 0;
	this.particleSystem;
	this.particles = new Array();

	//Shader 
	this.sphere;
	this.uniforms;
	this.attributes;
	
	//update
	this.lastTime;
	
	//2D Canvas
	this.pixels;
	this.cw = 1280;
	this.ch = 800;


	this.init = function(){
		// set up the canvas, camera and scene
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.cw;
		this.canvas.height = this.ch;

		// the canvas is only used to analyse our pic
		this.context = this.canvas.getContext('2d');

		this.width = $('canvas').width();
		this.height = $('canvas').height();

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 10000 );
		this.camera.position.z = 300;
		
		this.controls = new THREE.TrackballControls( this.camera, $('canvas')[0] );

		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.2;

		this.controls.noZoom = false;
		this.controls.noPan = false;

		this.controls.staticMoving = false;
		this.controls.dynamicDampingFactor = 0.3;

		this.scene = new THREE.Scene();

		this.scene.add( this.camera );

		this.addParticles();
	}

	this.updateImage = function(image)
	{
		this.image = image;
		this.updateDensity(this.density);
	}

	
	this.updateDensity = function(density)
	{
		this.scene.remove(this.sphere)
		this.density = density;
		this.addParticles();
	}
	
	this.addParticles = function()
	{
		this.attributes = {

				size: {	type: 'f', value: [] },
				ca:   {	type: 'c', value: [] },
				posxy: {type: 'v2', value: []}

		};

		this.uniforms = {

				time: 	   { type: "f", value: 1.0 },
				color:     { type: "c", value: new THREE.Color( 0xffffff ) },
				texture:   { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "images/disc.png" ) },
				img_size:  { type: "v2", value: new THREE.Vector2(this.cw/this.density, this.ch/this.density)},

		};

		this.uniforms.texture.texture.wrapS = this.uniforms.texture.texture.wrapT = THREE.RepeatWrapping;

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		this.uniforms,
			attributes:     this.attributes,
			vertexShader:   document.getElementById( 'particleVShader' ).textContent,
			fragmentShader: document.getElementById( 'particleFShader' ).textContent

		});

		var geometry = new THREE.PlaneGeometry (256, 160, this.cw/this.density - 1, this.ch/this.density - 1);

		this.sphere = new THREE.ParticleSystem( geometry, shaderMaterial );

		this.sphere.dynamic = true;
		this.sphere.sortParticles = true;

		var vertices = this.sphere.geometry.vertices;
		var values_size = this.attributes.size.value;
		var values_color = this.attributes.ca.value;
		var values_posxy = this.attributes.posxy.value;

		this.context.drawImage(this.image,0,0,this.cw,this.ch);
		this.pixels = this.context.getImageData(0,0,this.cw,this.ch);
		
		for(var i = 0; i < this.ch/this.density; ++i)
		{
			for(var j = 0; j < this.cw/this.density; ++j)
			{
				
				var p = i*4*this.cw*(this.density)+j*4*(this.density);
				var pixelCol = (this.pixels.data[p] << 16) + (this.pixels.data[p+1] << 8) + this.pixels.data[p+2];
				values_color[i*this.cw/this.density+j] = new THREE.Color(pixelCol);
				values_size[i*this.cw/this.density+j] = this.density;
				values_posxy[i*this.cw/this.density+j] = new THREE.Vector2(j,i);
			}
		}

		this.scene.add( this.sphere );
	}
	

	this.update = function(){
		var time = Date.now() % 10000;
		this.uniforms.time.value = time;
		this.attributes.size.needsUpdate = true;
		this.controls.update();
	}

	this.setSize = function(width, height){
		this.width = width;
		this.height = height;
		this.camera.aspect	= width / height;
		this.camera.updateProjectionMatrix();
		
		this.controls.screen.width = width;
		this.controls.screen.height = height;
	}

	this.init();
}