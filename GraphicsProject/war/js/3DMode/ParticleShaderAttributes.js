function ParticleAttributeManager(){
	this.attributes = {
		size: {	type: 'f', value: [] },
		ca:   {	type: 'c', value: [] }
	}
	uniforms = {
		amplitude: { type: "f", value: 1.0 },
		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		texture:   { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "images/disc.png" ) },
	};
}