function 3DPictureObject(picSrc, objWidth, lights, scene){
	var instance = this;
	this.picSrc = picSrc;
	this.texture;
	this.objWidth = width;
	this.objHeight;
	this.picWidth;
	this.picHeight;

	this.init = function(){
		var image = document.createElement('img');
		$(image).attr('src', picSrc).load(function(){
			//instance.resizeView(this.width, this.height)
			instance.picWidth = this.width;
			instance.picHeight = this.height;
			
			instance.texture = new THREE.ImageUtils.loadTexture(src);
			instance.texture.needsUpdate = true;

			instance.height = 
			var geometry = new THREE.PlaneGeometry(instance.width,instance.height);

			var shaderMaterial = instance.simpleShader(texture);

			instance.picture = new THREE.Mesh(geometry, shaderMaterial);
			instance.picture.scale.set(1,1,1);
			instance.picture.doubleSided = true;
			instance.picture.position.x = 0;
			instance.picture.position.y = 0;
			instance.picture.position.z = 0;
			instance.scene.add(instance.picture);
		});
	}

	this.init();
}