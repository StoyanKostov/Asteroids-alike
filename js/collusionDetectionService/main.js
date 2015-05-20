define([], function() {
	function CollusionDetector(updateIntervalTimeOut){
		var self = this;
			//self.collidingObjectsArr = collidingObjectsArr,
			self.updateIntervalTimeOut = updateIntervalTimeOut,
			self.updateInterval;

		return self;
	}

	CollusionDetector.prototype.start = function(callBack){
		var self = this;
		self.updateInterval = setInterval(function(){
			if (typeof callBack === 'function') {
				callBack(self.collidingObjectsArr);
			};
		}, self.updateIntervalTimeOut);
	}

	CollusionDetector.prototype.stop = function(){
		var self = this;
		clearInterval(self.updateInterval);
	}

	CollusionDetector.prototype.collide = function(firstObject, secondObject){
		if (
			Math.abs(firstObject.getCenter()['x'] - secondObject.getCenter()['x']) <= (firstObject.radius + secondObject.radius) &&
			Math.abs(firstObject.getCenter()['y'] - secondObject.getCenter()['y']) <= (firstObject.radius + secondObject.radius) &&
			firstObject.alive && secondObject.alive 
		) {
			console.log('collusion detected');
			firstObject.die();
			secondObject.die();
		};
		
	}

    return CollusionDetector;
});