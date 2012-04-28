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
	this.particles = new Array();

	//Shader 
	this.sphere;
	this.uniforms;
	this.attributes;
	this.vc1;


	this.init = function(){
		// set up the canvas, camera and scene
		canvas	= document.createElement('canvas');
		canvas.width	= 1280;
		canvas.height	= 800;

		// the canvas is only used to analyse our pic
		context	= canvas.getContext('2d');

		this.width = $('canvas').width();
		this.height = $('canvas').height();

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 10000 );
		this.camera.position.z = 300;

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

	this.getShaderMaterial = function()
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
				img_size:  { type: "v2", value: new THREE.Vector2()},

		};

		this.uniforms.texture.texture.wrapS = this.uniforms.texture.texture.wrapT = THREE.RepeatWrapping;

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		this.uniforms,
			attributes:     this.attributes,
			vertexShader:   document.getElementById( 'particleVShader' ).textContent,
			fragmentShader: document.getElementById( 'particleFShader' ).textContent

		});

		var geometry = new THREE.PlaneGeometry (256, 160, 127, 79);

		this.vc1 = geometry.vertices.length;

		this.sphere = new THREE.ParticleSystem( geometry, shaderMaterial );

		this.sphere.dynamic = true;
		this.sphere.sortParticles = true;

		var vertices = this.sphere.geometry.vertices;
		var values_size = this.attributes.size.value;
		var values_color = this.attributes.ca.value;
		var values_posxy = this.attributes.posxy.value;

		context.drawImage(image,
				0,0,image.width,image.height);
		var pixels = context.getImageData(0,0,this.width,this.height);

		for(var i = 0; i < 80; ++i)
		{
			for(var j = 0; j < 128; ++j)
			{
				
				var p = i*4*1280*(800/80)+j*4*(1280/128);
				var pixelCol = (pixels.data[p] << 16) + (pixels.data[p+1] << 8) + pixels.data[p+2];
				values_color[i*128+j] = new THREE.Color(pixelCol);
				values_size[i*128+j] = 10;
				values_posxy[i*128+j] = new THREE.Vector2(i,j);
			}
		}

		this.scene.add( this.sphere );
	}

	this.update = function(){
		var time = Date.now() * 0.005;

		this.uniforms.time.value += 1;
		this.attributes.size.needsUpdate = true;
	}

	this.setSize = function(width, height){
		this.width = width;
		this.height = height;
		this.camera.aspect	= width / height;
		this.camera.updateProjectionMatrix();
	}

	this.init();
}