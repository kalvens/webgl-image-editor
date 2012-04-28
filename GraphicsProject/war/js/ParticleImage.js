ParticleImage = function(image){
	this.canvas;
	this.context;
	this.scene;
	this.camera;
	this.image = image;
	this.width = $('canvas').width();
	this.height = $('canvas').height();
	this.density = 10;
	this.depth = Math.max(this.width, this.height);
	this.orbit_rate = 0.01;
	this.orbitValue = 0;
	this.particleSystem;


	this.init = function(){
		// set up the canvas, camera and scene
		canvas	= document.createElement('canvas');
		canvas.width	= 600;
		canvas.height	= 600;

		// the canvas is only used to analyse our pic
		context	= canvas.getContext('2d');

		this.width = $('canvas').width();
		this.height = $('canvas').height();

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 20000 );
		this.camera.position.y = 0;
		this.camera.position.z = -500;
		this.camera.position.x = 0;

		this.scene = new THREE.Scene();

		this.scene.add( this.camera );

		this.addLights();

		this.addParticles();
	}

	this.addLights = function()
	{
		// point
		pointLight = new THREE.PointLight( 0xFFFFFF );
		pointLight.position.x = 300;
		pointLight.position.y = 300;
		pointLight.position.z = 600;
		this.scene.add( pointLight );

		// directional
		directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
		directionalLight.position.x = -.5;
		directionalLight.position.y = -1;
		directionalLight.position.z = -.5;
		directionalLight.position.normalize();
		directionalLight.intensity = .6;
		this.scene.add( directionalLight );
	}

	this.updateDensity = function(density)
	{
		this.scene.remove(this.particleSystem);
		this.density = density;
		this.addParticles();
	}

	/**
	 * Adds the particles to the scene
	 * based on the image that has been
	 * last uploaded
	 */
	this.addParticles = function()
	{
		// draw in the image, and make sure it fits the canvas size :)
		var ratio			= 1 / Math.max(image.width/600, image.height/600);
		var scaledWidth		= image.width * ratio;
		var scaledHeight	= image.height * ratio;
		context.drawImage(image,
				0,0,image.width,image.height,
				(600 - scaledWidth) * .5, (600 - scaledHeight) *.5, scaledWidth, scaledHeight);

		// now set up the particle material
		var material 	= new THREE.ParticleBasicMaterial({ 
					blending: THREE.BillboardBlending, 
					map: THREE.ImageUtils.loadTexture("images/particle.png"), 
					size: this.density * 1.5, 
					opacity: 1, 
					vertexColors:true, 
					sizeAttenuation:true 
		});
		var geometry	= new THREE.Geometry();
		var pixels		= context.getImageData(0,0,this.width,this.height);
		var step		= this.density * 4;
		var x = 0, y = 0;

		// go through the image pixels
		for(x = 0; x < this.width * 4; x+= step)
		{
			for(y = this.height; y >= 0 ; y -= this.density)
			{
				var p = ((y * this.width * 4) + x);

				// grab the actual data from the
				// pixel, ignoring any transparent ones
				if(pixels.data[p+3] > 0)
				{
					var pixelCol	= (pixels.data[p] << 16) + (pixels.data[p+1] << 8) + pixels.data[p+2];
					var color 		= new THREE.Color(pixelCol);
					var vector 		= new THREE.Vector3(-300 + x/4, 240 - y, 0);

					// push on the particle
					geometry.vertices.push(new THREE.Vertex(vector));
					geometry.colors.push(color);
				}
			}
		}

		// now create a new system
		this.particleSystem = new THREE.ParticleSystem(geometry, material);
		this.particleSystem.sortParticles = true;

		// grab a couple of cacheable vals
		particles = this.particleSystem.geometry.vertices;
		colors = this.particleSystem.geometry.colors;

		// add some additional vars to the
		// particles to ensure we can do physics
		// and so on
		var ps = particles.length;
		while(ps--)
		{
			var particle 		= particles[ps];
			particle.velocity	= new THREE.Vector3();
			particle.mass		= 5;
			particle.origPos	= particle.position.clone();
		}

		// gc and add
		pixels = null;
		this.scene.add(this.particleSystem);
	}

	this.update = function(){
		this.camera.lookAt(new THREE.Vector3(0,0,0));
		this.camera.position.x = Math.sin(this.orbitValue) * this.depth;
		this.camera.position.y = Math.sin(this.orbitValue) * 300;
		this.camera.position.z = Math.cos(this.orbitValue) * this.depth;
		this.orbitValue += this.orbit_rate;
	}

	this.setSize = function(width, height){
		this.width = width;
		this.height = height;
		this.camera.aspect	= width / height;
		this.camera.updateProjectionMatrix();
	}

	this.init();
}