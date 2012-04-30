function PencilTool(){
	var instance = this;
	this.clicking = false;
	this.lastPos = new THREE.Vector2();
	
	var downFunction;
	var moveFunction;
	var upFunction;

	this.init = function(){
		downFunction = function(event){
			instance.clicking = true;
			instance.lastPos.x = event.offsetX-appController.webGL2D.width/2;
			instance.lastPos.y = -1*(event.offsetY-appController.webGL2D.height/2);
		};
		
		moveFunction = function(event){
			if(instance.clicking){
				var x = event.offsetX-appController.webGL2D.width/2;
				var y = -1*(event.offsetY-appController.webGL2D.height/2);
				instance.drawRectangle(x,y);
				instance.lastPos.x = x;
				instance.lastPos.y = y;
			}
		};
		
		upFunction = function(event){
			instance.clicking = false;
		};
		
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

	this.drawRectangle = function(x, y){
		appController.webGL2D.removeFromScene(this.rectangle);

		var material = new THREE.LineBasicMaterial({color : appController.webGL2DTools.color, linewidth: 1});
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(instance.lastPos.x, instance.lastPos.y, 1));
	    geometry.vertices.push(new THREE.Vector3(x, y, 1));
		var rectangle = new THREE.Line( geometry, material);

		appController.webGL2D.addToScene(rectangle);
	}

	this.init();
}