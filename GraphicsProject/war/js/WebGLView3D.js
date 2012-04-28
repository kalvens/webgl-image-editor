function WebGLView3D(){
	var instance = this;
	this.mode = 0;
	this.particleImage;
	this.imageCarousel;
	this.renderer;


	this.init = function(){
		this.setup3DParticleImage();
		this.imageCarousel = new ImageCarousel();
	}

	this.getCamera = function(){
		switch(this.mode){
		case 0: return this.particleImage.camera;
		case 1: return this.imageCarousel.camera;
		}
		return this.particleImage.camera;
	}

	this.getScene = function(){
		switch(this.mode){
		case 0: return this.particleImage.scene;
		case 1: return this.imageCarousel.scene;
		}
		return this.particleImage.scene;
	}

	this.setup3DParticleImage = function(){
		var image = new Image();
		$(image).attr('src', "images/sample_pic_01.jpg").load(function(){
			instance.particleImage = new ParticleImage(image, instance.scene);
		});
	}

	this.update = function(){
		switch(this.mode){
		case 0: this.particleImage.update(); break;
		case 1: this.imageCarousel.update(); break;
		}
	}

	this.init();
}