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
	
	this.pixels;


	this.init = function(){
		// set up the canvas, camera and scene
		this.canvas = document.createElement('canvas');
		this.canvas.width = 1280;
		this.canvas.height = 800;

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
				img_size:  { type: "v2", value: new THREE.Vector2(this.image.width/this.density, this.image.height/this.density)},

		};

		this.uniforms.texture.texture.wrapS = this.uniforms.texture.texture.wrapT = THREE.RepeatWrapping;

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		this.uniforms,
			attributes:     this.attributes,
			vertexShader:   document.getElementById( 'particleVShader' ).textContent,
			fragmentShader: document.getElementById( 'particleFShader' ).textContent

		});

		var geometry = new THREE.PlaneGeometry (256, 160, this.image.width/this.density - 1, this.image.height/this.density - 1);

		this.sphere = new THREE.ParticleSystem( geometry, shaderMaterial );

		this.sphere.dynamic = true;
		this.sphere.sortParticles = true;

		var vertices = this.sphere.geometry.vertices;
		var values_size = this.attributes.size.value;
		var values_color = this.attributes.ca.value;
		var values_posxy = this.attributes.posxy.value;

		this.context.drawImage(image,0,0,image.width,image.height);
		this.pixels = this.context.getImageData(0,0,image.width,image.height);
		
		for(var i = 0; i < this.image.height/this.density; ++i)
		{
			for(var j = 0; j < this.image.width/this.density; ++j)
			{
				
				var p = i*4*this.image.width*(this.density)+j*4*(this.density);
				var pixelCol = (this.pixels.data[p] << 16) + (this.pixels.data[p+1] << 8) + this.pixels.data[p+2];
				values_color[i*this.image.width/this.density+j] = new THREE.Color(pixelCol);
				values_size[i*this.image.width/this.density+j] = this.density;
				values_posxy[i*this.image.width/this.density+j] = new THREE.Vector2(j,i);
			}
		}

		this.scene.add( this.sphere );
	}
	
//	this.addParticles = function()
//	{
//		this.scene.remove(this.sphere)
//		this.getShaderMaterial()
//		return;
//		// draw in the image, and make sure it fits the canvas size :)
//		var ratio			= 1 / Math.max(image.width/600, image.height/600);
//		var scaledWidth		= image.width * ratio;
//		var scaledHeight	= image.height * ratio;
//		context.drawImage(image,
//				0,0,image.width,image.height,
//				(600 - scaledWidth) * .5, (600 - scaledHeight) *.5, scaledWidth, scaledHeight);
//
//		// now set up the particle material
////		var material 	= new THREE.ParticleBasicMaterial({ 
////		blending: THREE.BillboardBlending, 
////		map: THREE.ImageUtils.loadTexture("images/particle.png"), 
////		size: this.density * 1.5, 
////		opacity: 1, 
////		vertexColors:true, 
////		sizeAttenuation:true 
////		});
//		var material = this.getShaderMaterial();
//		var geometry	= new THREE.Geometry();
//		var pixels		= context.getImageData(0,0,this.width,this.height);
//		var step		= this.density * 4;
//		var x = 0, y = 0;
//
//		// go through the image pixels
//		for(x = 0; x < this.width * 4; x+= step)
//		{
//			for(y = this.height; y >= 0 ; y -= this.density)
//			{
//				var p = ((y * this.width * 4) + x);
//
//				// grab the actual data from the
//				// pixel, ignoring any transparent ones
//				if(pixels.data[p+3] > 0)
//				{
//					var pixelCol	= (pixels.data[p] << 16) + (pixels.data[p+1] << 8) + pixels.data[p+2];
//					var color 		= new THREE.Color(pixelCol);
//					var vector 		= new THREE.Vector3(-300 + x/4, 240 - y, 0);
//					vector.z += Math.sin(x/(this.width)*Math.PI*2)*50;
//
//					// push on the particle
//					geometry.vertices.push(new THREE.Vertex(vector));
//					geometry.colors.push(color);
//				}
//			}
//		}
//
//		// now create a new system
//		this.particleSystem = new THREE.ParticleSystem(geometry, material);
//		this.particleSystem.sortParticles = true;
//
//		// grab a couple of cacheable vals
//		this.particles = this.particleSystem.geometry.vertices;
//		colors = this.particleSystem.geometry.colors;
//
//		// add some additional vars to the
//		// particles to ensure we can do physics
//		// and so on
//		var ps = this.particles.length;
//		while(ps--)
//		{
//			var particle 		= this.particles[ps];
//			particle.velocity	= new THREE.Vector3();
//			particle.mass		= 5;
//			particle.origPos	= particle.position.clone();
//		}
//
//		// gc and add
//		pixels = null;
//		this.scene.add(this.particleSystem);
//	}

	this.update = function(){
		var time = Date.now() % 10000;
//		this.sphere.rotation.y = 0.02 * time;
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