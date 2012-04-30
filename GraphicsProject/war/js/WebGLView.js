function WebGLView(webGL2D, webGL3D){
	var instance = this;

	this.webGL2D = webGL2D;
	this.webGL3D = webGL3D;
	this.renderer;
	this.width;
	this.height;
	this.container;

	this.webGLInit = function() {
		this.width = 1280;
		this.height = 800;

		this.container = $('.main_view')[0];

		if(Detector.webgl)
		{
			this.renderer = new THREE.WebGLRenderer({
				antialias : true,
				preserveDrawingBuffer : true,
			});
			this.renderer.setClearColorHex(0x222222 ,1);
		}
		else{
			Detector.addGetWebGLMessage();
			return true;
		}

		this.renderer.sortObjects = true;


		webGL2D.renderer = this.renderer;
		webGL3D.renderer = this.renderer;

		this.renderer.setSize( this.width, this.height );

		this.container.appendChild( this.renderer.domElement );

		//transparently support window resize
		//THREEx.WindowResize.bind(this.renderer, this.camera);
		//allow 'p' to make screenshot
		//THREEx.Screenshot.bindKey(this.renderer);
		//allow 'f' to go fullscreen where this feature is supported
		if( THREEx.FullScreen.available() ){
			THREEx.FullScreen.bindKey();
		}

		this.animate();
	}



	this.animate = function() {

		requestAnimationFrame( instance.animate );

		instance.render();
	}

	this.render = function  () {

		if(appController.mode == 0){
			this.renderer.render( webGL2D.getScene(), webGL2D.getCamera() );
		}else if(appController.mode == 1){
			webGL3D.update();
			this.renderer.render( webGL3D.getScene(), webGL3D.getCamera() );
		}else
			Window.alert("Uknown mode for displaying content");
	}

	this.resizeCanvas = function(mode, width, height){
		if(mode == 0){
			this.renderer.setSize(this.webGL2D.width, this.webGL2D.height);
			$('canvas').width(this.webGL2D.width);
			$('canvas').height(this.webGL2D.height);
		}
		else{
			this.renderer.setSize(width, height);
			webGL3D.setSize(width, height);
			$('canvas').width(width);
			$('canvas').height(height);
		}
	}

	this.webGLInit()

}