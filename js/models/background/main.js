define(['Drawable'], function(Drawable) {

		// Create space background
		function Background(x, y, width, height) {
			var self = this;
			Drawable.call(self, x, y, width, height)
			self.speed = 0.05; // Redefine speed of the background for panning
			return self;
		}
		// Set space background to inherit properties from Drawable
		Background.prototype = Object.create(Drawable.prototype);
		Background.prototype.constructor = Background;

		Background.prototype.draw = function() {
			var self = this;
			// Pan background
			self.position.y += self.speed;
			// Draw static backgroung image
			self.context.drawImage(self.backgroundStatic, 0, 0);
			// Draw two backgroung images, one on top of the other to make continues effect of amination
			self.context.drawImage(self.background, self.position.x, self.position.y);
			self.context.drawImage(self.background, self.position.x, self.position.y - self.canvasHeight);

			// If the image scrolled off the screen, reset
			if (self.position.y >= self.canvasHeight){
				self.position.y = 0;
			}
		};

    	return Background;
});