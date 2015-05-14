define(['require', 'appServices', 'Drawable', 'Pool', 'Bullet'], function(require, exports, module) {
	var Drawable = require("Drawable"),
		appServices = require("appServices"),
		Pool = require("Pool"),
		Bullet = require("Bullet");

    function Ship(x, y, width, height, angle, alive) {
        var self = this;
        Drawable.call(self, x, y, width, height, angle, alive);

    	self.angleVelocity = 3;
		self.slowDownFactor = 0.03;
		self.invinsible = false;
		self.livesCount = 3;
		self.speed = 0;
		self.acc = 0;
		//self.angle = 0;
		self.velocity = 0;
		self.bulletPool = new Pool(
			2,
			Bullet,
			appServices.zeroCoords,
			imageRepository.list.bullet.width,
			imageRepository.list.bullet.height,
			appServices.zeroAngle,
			false
		);

		return self;
    }
    Ship.prototype = Object.create(Drawable.prototype);
    Ship.prototype.constructor = Ship;

    Ship.prototype.die = function(){
    	var self = this;
		self.livesCount -= 1;
		if (self.livesCount <= 0) {
			self.alive = false;
			self.delete();
			alert('Game over');
		};
    }

    Ship.prototype.fire = function(){
    	console.log('fire');
    	var self = this,
    		shipAngleAsVector = appServices.angleToVector(self.angle);

    	// var onReuse = function(shipAngleAsVector, bullet){
    	// 	bullet.startlifeCycle(700);
	    // 	bullet.angle = self.angle;
	    // 	bullet.speed = self.speed + 8;
	    // 	bullet.position.x = self.getCenter().x - bullet.pivot.x + shipAngleAsVector['x']*self.radius;
	    // 	bullet.position.y = self.getCenter().y - bullet.pivot.y + shipAngleAsVector['y']*self.radius;
    	// }

    	//self.bulletPool.reuse(shipAngleAsVector, onReuse);


    	var bullet = self.bulletPool.getFirst();
    	
    	if (!bullet.alive) {
	    	bullet.startlifeCycle(700);
	    	bullet.angle = self.angle;
	    	bullet.speed = self.speed + 8;
	    	bullet.position.x = self.getCenter().x - bullet.pivot.x + shipAngleAsVector['x']*self.radius;
	    	bullet.position.y = self.getCenter().y - bullet.pivot.y + shipAngleAsVector['y']*self.radius;
    	};

    	self.bulletPool.putLast(bullet);

    }

    Ship.prototype.update = function(){
    	var self = this;
    	self.bulletPool.update();
		// Move forward
		if (KEY_STATUS.up['keyDown']) {
    		if (self.speed != 3) {
				self.speed = 3;
    		};
    		self.delete();
    		self.move();
    		//self.draw();
		}

	    if (self.speed != 0) {
	    	if (self.speed > 0 ) {
			    self.delete();
			    self.draw();
	    		self.move();
				self.speed -= self.slowDownFactor;
			}
			else{
				self.speed = 0;
			}
	    };

		// Rotate Left
		if(KEY_STATUS.left['keyDown']){
			self.angle += -self.angleVelocity;
			self.delete();
			self.draw();
		};
		// Rotate Right
		if(KEY_STATUS.right['keyDown']){
			self.angle += self.angleVelocity;
			self.delete();
			self.draw();
		};
		// fire
		if(KEY_STATUS.space['keyDown'] && !KEY_STATUS.space['disable']){
			KEY_STATUS.space['disable'] = true;
			self.fire();
		};
    }

	// The keycodes that will be mapped when a user presses a button.
	// Original code by Doug McInnes
	KEY_CODES = {
	  32: 'space',
	  37: 'left',
	  38: 'up',
	  39: 'right',
	  40: 'down'
	}

	// Creates the array to hold the KEY_CODES and sets all their values
	// to false. Checking true/flase is the quickest way to check status
	// of a key press and which one was pressed when determining
	// when to move and which direction.
	KEY_STATUS = {};
	for (code in KEY_CODES) {
		KEY_STATUS[KEY_CODES[code]] = {};
		KEY_STATUS[KEY_CODES[code]]['disable'] = false;
		KEY_STATUS[KEY_CODES[code]]['keyDown'] = false;
	}
	/**
	 * Sets up the document to listen to onkeydown events (fired when
	 * any key on the keyboard is pressed down). When a key is pressed,
	 * it sets the appropriate direction to true to let us know which
	 * key it was.
	 */
	document.onkeydown = function(e) {
		// Firefox and opera use charCode instead of keyCode to
		// return which key was pressed.
		var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
		if (KEY_CODES[keyCode]) {
			e.preventDefault();
			KEY_STATUS[KEY_CODES[keyCode]]['keyDown'] = true;
		}
	}
	/**
	 * Sets up the document to listen to ownkeyup events (fired when
	 * any key on the keyboard is released). When a key is released,
	 * it sets teh appropriate direction to false to let us know which
	 * key it was.
	 */
	document.onkeyup = function(e) {
		var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
		if (KEY_CODES[keyCode]) {
			e.preventDefault();
			KEY_STATUS[KEY_CODES[keyCode]]['disable'] = false;
			KEY_STATUS[KEY_CODES[keyCode]]['keyDown'] = false;
		}
	}
    
    return Ship;
});