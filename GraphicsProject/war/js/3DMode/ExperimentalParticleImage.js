ParticleImage = function(image){
//	this.canvas;
//	this.context;
	this.scene;
	this.camera;
//	this.image = image;
	this.width = $('canvas').width();
	this.height = $('canvas').height();
//	this.density = 10;
//	this.depth = Math.max(this.width, this.height);
//	this.orbit_rate = 0.01;
//	this.orbitValue = 0;
//	this.particleSystem;
//	this.particles = new Array();

	this.sphere;
	this.uniforms;
	this.attributes;
	this.vc1;

	this.init = function(){
		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 10000 );
		this.camera.position.z = 300;

		this.scene = new THREE.Scene();

		this.scene.add( this.camera );

		this.attributes = {

				size: {	type: 'f', value: [] },
				ca:   {	type: 'c', value: [] }

		};

		this.uniforms = {

				amplitude: { type: "f", value: 1.0 },
				color:     { type: "c", value: new THREE.Color( 0xffffff ) },
				texture:   { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "images/disc.png" ) },
				

		};

		this.uniforms.texture.texture.wrapS = this.uniforms.texture.texture.wrapT = THREE.RepeatWrapping;

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		this.uniforms,
			attributes:     this.attributes,
			vertexShader:   document.getElementById( 'particleVShader' ).textContent,
			fragmentShader: document.getElementById( 'particleFShader' ).textContent

		});


		var radius = 100, segments = 68, rings = 38;
		var geometry = new THREE.SphereGeometry( radius, segments, rings );

		this.vc1 = geometry.vertices.length;

		var geometry2 = new THREE.CubeGeometry( 0.8 * radius, 0.8 * radius, 0.8 * radius, 10, 10, 10 );

		THREE.GeometryUtils.merge( geometry, geometry2 );

		this.sphere = new THREE.ParticleSystem( geometry, shaderMaterial );

		this.sphere.dynamic = true;
		this.sphere.sortParticles = true;

		var vertices = this.sphere.geometry.vertices;
		var values_size = this.attributes.size.value;
		var values_color = this.attributes.ca.value;

		for( var v = 0; v < vertices.length; v++ ) {

			values_size[ v ] = 10;
			values_color[ v ] = new THREE.Color( 0xff00ff );

//			if ( v < this.vc1 ) {
//
//				values_color[ v ].setHSV( 0.01 + 0.1 * ( v / this.vc1 ), 0.99, ( vertices[ v ].y + radius ) / ( 2 *radius ) );
//
//			} else {
//
//				values_size[ v ] = 40;
//				values_color[ v ].setHSV( 0.6, 0.75, 0.5 + vertices[ v ].y / ( 0.8 * radius ) );
//
//			}

		}

		this.scene.add( this.sphere );
	}

	this.update = function(){
		var time = Date.now() * 0.005;

		this.sphere.rotation.y = 0.02 * time;
		this.sphere.rotation.z = 0.02 * time;

		for( var i = 0; i < this.attributes.size.value.length; i ++ ) {
//			this.attributes.ca.value = new THREE.Color( 0x00ff00 );
			if ( i < this.vc1 )
			{
				this.attributes.size.value[ i ] = 16 + 12 * Math.sin( 0.1 * i + time );
			}


		}

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