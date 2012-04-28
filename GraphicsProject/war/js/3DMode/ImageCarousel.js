function ImageCarousel(){
	this.scene;
	this.width;
	this.height;
	this.image_count = 32;
	this.rows = 3;
	this.image_planes = new Array();
	this.radius = 150;
	this.depth;
	this.ORBIT_RATE = 0.0025;
	this.orbitValue = 0;


	this.init = function(){
		this.scene = new THREE.Scene();

		//

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
		this.camera.position.z = 0;
		this.scene.add( this.camera );

		//

//		geometry = new THREE.CubeGeometry( 200, 200, 200 );
//		material = new THREE.MeshBasicMaterial( { color: '#ffffff' });

//		mesh = new THREE.Mesh( geometry, material);
//		this.scene.add( mesh );


//		this.width = $('canvas').width();
//		this.height = $('canvas').height();
//		this.depth = Math.max(this.width, this.height);

//		this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 1000);
//		this.camera.position.y = 0;
//		this.camera.position.z = 500;
//		this.camera.position.x = 0;

//		this.scene = new THREE.Scene();

//		this.scene.add( this.camera );

//		this.addLights();

		this.drawCaroselImages();
	}

	this.drawCaroselImages = function(){
		images = this.loadImages();
		for(var i=0; i < this.image_planes.length; ++i){
			scene.remove(this.image_planes[i])
		}
		this.image_planes[i] = new Array();
		var index = 0;
		for(var j=-1*this.rows; j < this.rows; ++j){
			for(var i=0; i < images.length; ++i){
				var center = new THREE.Vector3();
				var rotation = new THREE.Vector3();
				var size = new THREE.Vector2();
				this.calcImagePosition(i,center, rotation, size, j);
				this.image_planes[index] = new CarouselImagePlane(images[i], center, rotation, size)
				this.scene.add(this.image_planes[index].plane);
				index += 1;
			}
		}
	}

	this.calcImagePosition = function(image_number, center, rotation, size, row){
		angle = image_number / this.image_count * Math.PI * 2;
		center.x = this.radius * Math.cos(angle);
		center.z = this.radius * Math.sin(angle);
		size.y = 15;
		size.x = 24;
		center.y = row * 20;
		rotation.y = 3*Math.PI/2 - angle;
	}

	this.loadImages = function(){
		images = new Array();
		materials = new Array();
		for(var i=0; i< 6; ++i){
			var texture = new THREE.ImageUtils.loadTexture("images/sampleLD/sample_pic_0"+(i+1)+".jpg");
			texture.needsUpdate = true;
			materials[i] = new THREE.MeshBasicMaterial({map : texture});
		}
		for(var i=0; i< this.image_count; ++i){
			images[i] = materials[i % materials.length];
		}
		return images;
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

	this.update = function(){
		for(var i=0;i< this.image_planes.length; ++i){
			p = this.image_planes[i].plane;
			var angle = i / this.image_count * Math.PI * 2+this.orbitValue;
			p.position.x = this.radius * Math.cos(angle);
			p.position.z = this.radius * Math.sin(angle);
			p.rotation.y = 3*Math.PI/2 - angle;
		}
//		var lookTo = new THREE.Vector3();
//		lookTo.x = this.radius * Math.cos(this.orbitValue);
//		lookTo.z = this.radius * Math.sin(this.orbitValue);
//		this.camera.lookAt(lookTo);
//		this.camera.position.x = Math.sin(this.orbitValue) * this.depth;
//		this.camera.position.y = Math.sin(this.orbitValue) * 300;
//		this.camera.position.z = Math.cos(this.orbitValue) * this.depth;
		this.orbitValue += this.ORBIT_RATE;
	}
	
	this.setSize = function(width, height){
		this.width = width;
		this.height = height;
		this.camera.aspect	= width / height;
		this.camera.updateProjectionMatrix();
	}
	
	this.init();
}