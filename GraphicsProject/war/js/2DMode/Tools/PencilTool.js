function PencilTool(){
	var instance = this;
	this.start = new THREE.Vector2();
	this.end = new THREE.Vector2();
	this.clicking = false;
	this.rectangle;
	this.color;

	this.init = function(){
		console.debug('rectangle tool created');
		this.setupMouseEvents();
	}

	this.removeTool = function(){
		$('canvas').unbind();
	}

	this.setupMouseEvents = function(){
		c = $('canvas')
		c.mousedown(function(event){
			instance.start.x = event.offsetX;
			instance.start.y = event.offsetY;
			instance.clicking = true;
		});
		c.mousemove(function(event){
			if(instance.clicking){
				instance.end.x = event.offsetX;
				instance.end.y = event.offsetY;
				instance.drawRectangle();
			}
		});
		$(document).mouseup(function(event){
			instance.clicking = false;
		});
	}
	
	this.drawRectangle = function(){
		appController.webGL2D.removeFromScene(this.rectangle);
		
		var material = new THREE.MeshBasicMaterial({color : 0x007FFF, transparent: true});
		material.opacity = 0.25;
		var geometry = new THREE.PlaneGeometry( Math.abs(this.start.x-this.end.x), Math.abs(this.start.y-this.end.y));
		this.rectangle = new THREE.Mesh( geometry, material);
		this.rectangle.position.x = (this.start.x+this.end.x-appController.webGL2D.width)/2;
		this.rectangle.position.y = -1*(this.start.y+this.end.y-appController.webGL2D.height)/2;
		this.rectangle.position.z = 1;
		
		console.debug(this.rectangle.position.x+","+this.rectangle.position.y+","+this.start.y);
		
		appController.webGL2D.addToScene(this.rectangle);
	}

	this.init();
}