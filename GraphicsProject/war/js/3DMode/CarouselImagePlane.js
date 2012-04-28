/**
 * image_src : The src for the texture
 * center : THREE.Vector3() for the center of the plane
 * rotation : THREE.Vector3() for the rotation of the plane
 * size : THREE.Vector2() for the size of the plane
 */

function CarouselImagePlane(material, center, rotation, size){
	this.material = material;
	this.center = center;
	this.rotation = rotation;
	this.size = size;
	this.plane;
	
	this.init = function(){
		this.plane = new THREE.Mesh( new THREE.PlaneGeometry( this.size.x, this.size.y), this.material);
		//this.plane.doubleSided = true;
		this.plane.position = center;
		this.plane.rotation.y = this.rotation.y;
	}
	
	this.init();
}