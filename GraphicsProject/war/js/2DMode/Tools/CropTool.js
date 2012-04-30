function CropTool(){
	var instance = this;
	var last = new THREE.Vector2();
	this.clicking = false;
	/**
	 * 0 = nothing
	 * 1 = bottom_right
	 * 2 = top_left
	 * 3 = bottom_left
	 * 4 = top_right
	 * 5 = east edge
	 * 6 = west edge
	 * 7 = north edge
	 * 8 = south edge
	 * 9 = inside
	 */
	var mode = 0;
	this.rectangle;
	var cropUniforms = {
			topLeft : {type:"v2", value: new THREE.Vector2(0.10,0.10)},
			bottomRight : {type:"v2", value: new THREE.Vector2(0.90,0.90)},
			size : {type:"v2", value: new THREE.Vector2(appController.webGL2D.width, appController.webGL2D.height)},
	};

	var downFunction;
	var moveFunction;
	var upFunction;
	var applyFunction;

	this.init = function(){
		downFunction = function(event){
			last.x = event.offsetX;
			last.y = event.offsetY;
			instance.clicking = true;
		};

		moveFunction = function(event){
			if(!instance.clicking){
				$('canvas').removeClass('cursor-move');
				$('canvas').removeClass('cursor-se-resize');
				$('canvas').removeClass('cursor-ne-resize');
				$('canvas').removeClass('cursor-e-resize');
				$('canvas').removeClass('cursor-n-resize');
				var pos = new THREE.Vector2(event.offsetX, event.offsetY);
				mode = instance.nearCornerSE(pos);
				if(mode){
					$('canvas').addClass('cursor-se-resize');
					return;
				}
				mode = instance.nearCornerNW(pos);
				if(mode){
					$('canvas').addClass('cursor-ne-resize');
					return;
				}
				mode = instance.nearSideLR(pos);
				if(mode){
					$('canvas').addClass('cursor-e-resize');
					return;
				}
				mode = instance.nearSideTB(pos);
				if(mode){
					$('canvas').addClass('cursor-n-resize');
					return;
				}
				mode = instance.insideArea(pos);
				if(mode){
					$('canvas').addClass('cursor-move');
					return;
				}
			} else{
				switch(mode){
				case 1: 
					cropUniforms.bottomRight.value.x = (event.offsetX / cropUniforms.size.value.x);
					cropUniforms.bottomRight.value.y = (event.offsetY / cropUniforms.size.value.y);
					break;
				case 2:
					cropUniforms.topLeft.value.x = (event.offsetX / cropUniforms.size.value.x);
					cropUniforms.topLeft.value.y = (event.offsetY / cropUniforms.size.value.y);
					break;
				case 3:
					cropUniforms.topLeft.value.x = (event.offsetX / cropUniforms.size.value.x);
					cropUniforms.bottomRight.value.y = (event.offsetY / cropUniforms.size.value.y);
					break;
				case 4:
					cropUniforms.bottomRight.value.x = (event.offsetX / cropUniforms.size.value.x);
					cropUniforms.topLeft.value.y = (event.offsetY / cropUniforms.size.value.y);
					break;
				case 5:
					cropUniforms.bottomRight.value.x = (event.offsetX / cropUniforms.size.value.x);
					break;
				case 6:
					cropUniforms.topLeft.value.x = (event.offsetX / cropUniforms.size.value.x);
					break;
				case 7:
					cropUniforms.topLeft.value.y = (event.offsetY / cropUniforms.size.value.y);
					break;
				case 8:
					cropUniforms.bottomRight.value.y = (event.offsetY / cropUniforms.size.value.y);
					break;
				case 9:
					var dif = new THREE.Vector2((last.x - event.offsetX)/ (cropUniforms.size.value.x), 
							(last.y - event.offsetY) / (cropUniforms.size.value.y));
					var bx = cropUniforms.bottomRight.value.x - dif.x;
					var tx = cropUniforms.topLeft.value.x - dif.x;
					var by = cropUniforms.bottomRight.value.y - dif.y;
					var ty = cropUniforms.topLeft.value.y - dif.y;
					if( bx >= 0 && bx <= 1 && tx >= 0 && tx <= 1 && by >= 0 && by <= 1 && ty >= 0 && ty <= 1){
						cropUniforms.bottomRight.value.x = bx;
						cropUniforms.bottomRight.value.y = by;
						cropUniforms.topLeft.value.x = tx;
						cropUniforms.topLeft.value.y = ty;
						last.x = event.offsetX;
						last.y = event.offsetY;
					}
				}
			}
		};

		upFunction = function(event){
			instance.clicking = false;
		}
		
		applyFunction = function(event){
			appController.webGL2D.removeFromScene(instance.rectangle);
			appController.webGL2D.cropImage(cropUniforms.topLeft.value, cropUniforms.bottomRight.value);
		}

		var shaderMaterial = new THREE.ShaderMaterial({
			uniforms : cropUniforms,
			vertexShader : $('#vertexCropShader').text(),
			fragmentShader: $('#fragmentCropShader').text()
		});

		shaderMaterial.transparent = true;

		var geometry = new THREE.PlaneGeometry(appController.webGL2D.width, appController.webGL2D.height);

		this.rectangle = new THREE.Mesh(geometry, shaderMaterial);
		this.rectangle.position.z = 5;
		this.rectangle.rotation.x = Math.PI/2.0;

		appController.webGL2D.addToScene(this.rectangle);

		this.setupMouseEvents();
		
		$('.cropTool').show();
	}

	this.distance = function(v, w){
		return ((v.x - w.x)*(v.x - w.x) + (v.y - w.y)*(v.y - w.y));
	}

	this.nearCornerSE = function(v){
		var dis = 8.0;
		dis *= dis;
		var c0 = new THREE.Vector2(cropUniforms.bottomRight.value.x * cropUniforms.size.value.x
				, cropUniforms.bottomRight.value.y * cropUniforms.size.value.y);
		if(this.distance(c0, v) <= dis)
			return 1;
		var c1 = new THREE.Vector2(cropUniforms.topLeft.value.x * cropUniforms.size.value.x
				, cropUniforms.topLeft.value.y * cropUniforms.size.value.y);
		if(this.distance(c1, v) <= dis)
			return 2;
		return 0;
	}

	this.nearCornerNW = function(v){
		var dis = 8.0;
		dis *= dis;
		var c0 = new THREE.Vector2(cropUniforms.topLeft.value.x * cropUniforms.size.value.x
				, cropUniforms.bottomRight.value.y * cropUniforms.size.value.y);
		if(this.distance(c0, v) <= dis)
			return 3;
		var c1 = new THREE.Vector2(cropUniforms.bottomRight.value.x * cropUniforms.size.value.x
				, cropUniforms.topLeft.value.y * cropUniforms.size.value.y);
		if(this.distance(c1, v) <= dis)
			return 4;
		return 0;
	}

	this.nearSideLR = function(v){
		if(v.x <= cropUniforms.bottomRight.value.x * cropUniforms.size.value.x + 8 && 
				v.x >= cropUniforms.bottomRight.value.x * cropUniforms.size.value.x - 8)
			return 5;
		else if(v.x <= cropUniforms.topLeft.value.x * cropUniforms.size.value.x + 8 && 
				v.x >= cropUniforms.topLeft.value.x * cropUniforms.size.value.x - 8)
			return 6;
		return 0;
	}

	this.nearSideTB = function(v){
		if(v.y <= cropUniforms.topLeft.value.y * cropUniforms.size.value.y + 8 && 
				v.y >= cropUniforms.topLeft.value.y * cropUniforms.size.value.y - 8)
			return 7;
		else if(v.y <= cropUniforms.bottomRight.value.y * cropUniforms.size.value.y + 8 && 
				v.y >= cropUniforms.bottomRight.value.y * cropUniforms.size.value.y - 8)
			return 8;
		return 0;
	}

	this.insideArea = function(v){
		if(v.x < cropUniforms.bottomRight.value.x * cropUniforms.size.value.x &&
				v.x > cropUniforms.topLeft.value.x * cropUniforms.size.value.x &&
				v.y < cropUniforms.bottomRight.value.y * cropUniforms.size.value.y &&
				v.y > cropUniforms.topLeft.value.y * cropUniforms.size.value.y)
			return 9;
		return 0;
	}

	this.removeTool = function(){
		$('canvas').unbind('mousedown', downFunction);
		$('canvas').unbind('mousemove', moveFunction);
		$(document).unbind('mouseup', upFunction);
		$('.cropApply').unbind('click', applyFunction);
		appController.webGL2D.removeFromScene(instance.rectangle);
		$('.cropTool').hide();
		return null;
	}

	this.setupMouseEvents = function(){
		c = $('canvas')
		c.mousedown(downFunction);
		c.mousemove(moveFunction);
		$(document).mouseup(upFunction);
		$('.cropApply').click(applyFunction);
	}

	this.init();
}