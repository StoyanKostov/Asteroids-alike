"use strict";
define(['helperFunctions'], function (helperFunctions) {
	function Drawable(x, y, width, height, angle, alive) {
		var self = this;
		self.alive = alive;
		//self.alive = true;
		self.angle = angle?angle:0;
		self.position = {};
		self.position["x"] = x;
		self.position["y"] = y;
		// console.log('this', this);
		// console.log('self.position', self.position);
		self.width = width;
		self.height = height;
		self.pivot = {};
		self.pivot["x"] = width/2;
		self.pivot["y"] = height/2;
		self.radius = width/2;
		self.angleVelocity = 0;
		self.velocity = {};

		return self;
	}
	
	Drawable.prototype.updateVelocity = function(){
		var self = this;
		self.velocity = helperFunctions.angleToVector(self.angle); //returns {'x': value, 'y': value}
	}
    
    Drawable.prototype.move = function(){
    	var self = this;
		self.updateVelocity();
		self.position.x = self.position.x + self.velocity.x * self.speed;
		self.position.y = self.position.y + self.velocity.y * self.speed;

		if (self.position.y >= self.canvasHeight) {
			self.position.y = ((self.position.y % self.canvasHeight) + self.canvasHeight) % self.canvasHeight -self.height;
		};
		if (self.position.y <= -self.height) {
			self.position.y = ((self.position.y % self.canvasHeight) + self.canvasHeight) % self.canvasHeight + self.height;
		};
		if (self.position.x >= self.canvasWidth) {
			self.position.x = ((self.position.x % self.canvasWidth) + self.canvasWidth) % self.canvasWidth - self.width;
		};
		if (self.position.x  <= -self.width) {
			self.position.x = ((self.position.x % self.canvasWidth) + self.canvasWidth) % self.canvasWidth + self.width;
		};
	}

	Drawable.prototype.getCenter = function(){
		var self = this;
		return {
			'x': self.position["x"] + self.pivot["x"],
			'y': self.position["y"] + self.pivot["y"]
		}
	}

    Drawable.prototype.draw = function(alpha){
    	var self = this,
            opacity = alpha?alpha:1;
	    self.context.save();
	    self.context.translate(self.position.x + self.pivot.x, self.position.y + self.pivot.y);
        self.context.rotate(self.angle*Math.PI/180);
	    self.context.globalAlpha = opacity;
	    self.context.drawImage(self.image, -self.pivot.x, -self.pivot.y);
	    self.context.restore();
    }

    Drawable.prototype.delete = function(){
        var self = this;
        self.context.clearRect(self.position.x, self.position.y, self.width, self.height);
    }

	return Drawable;
});