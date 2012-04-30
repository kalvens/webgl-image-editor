function RectangleSelector(){
	var instance = this;
	this.start = new THREE.Vector2();
	this.end = new THREE.Vector2();
	this.clicking = false;
	this.rectangle;

	var downFunction;
	var moveFunction;
	var upFunction;
	var clickFunction;
	
	this.init = function(){
		console.debug('rectangle tool created');
		
		downFunction = function(event){
			instance.start.x = event.offsetX;
			instance.start.y = event.offsetY;
			instance.clicking = true;
			appController.webGL2D.removeFromScene(instance.rectangle);
		};
		
		moveFunction = function(event){
			if(instance.clicking){
				instance.end.x = event.offsetX;
				instance.end.y = event.offsetY;
				instance.drawRectangle();
			}
		};
		
		upFunction = function(event){
			instance.clicking = false;
		}
		
		this.setupMouseEvents();
	}

	this.removeTool = function(){
		$('canvas').unbind('mousedown', downFunction);
		$('canvas').unbind('mousemove', moveFunction);
		$('document').unbind('mouseup', upFunction);
		return this.rectangle;
	}

	this.setupMouseEvents = function(){
		c = $('canvas')
		c.mousedown(downFunction);
		c.mousemove(moveFunction);
		$(document).mouseup(upFunction);
	}
	
	this.drawRectangle = function(){
		appController.webGL2D.removeFromScene(this.rectangle);
		
		var material = new THREE.MeshBasicMaterial({color : 0x007FFF, transparent: true});
		material.opacity = 0.25;
		var geometry = new THREE.PlaneGeometry( Math.abs(this.start.x-this.end.x), Math.abs(this.start.y-this.end.y));
		this.rectangle = new THREE.Mesh( geometry, material);
		this.rectangle.position.x = (this.start.x+this.end.x-appController.webGL2D.width)/2;
		this.rectangle.position.y = -1*(this.start.y+this.end.y-appController.webGL2D.height)/2;
		this.rectangle.position.z = 5;
		
		appController.webGL2D.addToScene(this.rectangle);
	}

	this.init();
}