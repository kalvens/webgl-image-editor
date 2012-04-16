function WebGLView3D(){
	var instance = this;
	this.scene;
	this.camera;
	this.renderer;
	this.width;
	this.height;


	this.init = function(){
		this.width = 1280;//$('.main_view').width();
		this.height = 800;//$('.main_view').height();

		this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 1000 );
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 0;

		this.scene = new THREE.Scene();

		this.scene.add( this.camera );

		//Photo
		var texture = new THREE.ImageUtils.loadTexture('images/sample_pic_01.jpg');
		var materialCanvas = new THREE.MeshBasicMaterial({map: texture});
		texture.needsUpdate = true;
		var geometry = new THREE.PlaneGeometry(this.width,this.height);
		this.picture = new THREE.Mesh(geometry, materialCanvas);
		this.picture.scale.set(1,1,1);
		this.picture.doubleSided = true;
		this.picture.position.x = 0;
		this.picture.position.y = 0;
		this.picture.position.z = 0;
		this.scene.add(this.picture);
		
		
		console.debug(this.scene)
		
		this.changePhoto('images/sample_pic_01.jpg');
	}

	this.getCamera = function(){
		return this.camera;
	}

	this.getScene = function(){
		return this.scene;
	}

	this.drawMuseumWalls(){
		
	}
	
	this.init();
}