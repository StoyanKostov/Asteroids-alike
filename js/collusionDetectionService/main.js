define([], function() {
	function CollusionDetector(collidingObjectGroups, objectsInterface, updateIntervalTimeOut){
		var self = this;
			self.collidingObjectGroups = collidingObjectGroups, //[{first: , second: }, ...]
			self.updateIntervalTimeOut = updateIntervalTimeOut,
			self.objectsInterface = objectsInterface,
			self.updateInterval;

		return self;
	}

	CollusionDetector.prototype.stop = function(){
		var self = this;
		clearInterval(self.updateInterval);
	};
	
	CollusionDetector.prototype.start = function(){
		var self = this;
		self.updateInterval = setInterval(function(){
			self.groupCollide();
		}, self.updateIntervalTimeOut);
	};

	CollusionDetector.prototype.groupCollide = function(){
		var self = this;
		self.collidingObjectGroups.forEach(function(group, index, arr){
			group.first.forEach(function(first, index, arr){
				group.second.forEach(function(second, index, arr){
					self.collide(first, second);
				});
			});
		});
	};

	CollusionDetector.prototype.collide = function(firstObject, secondObject){
		var self = this;
		if (firstObject instanceof self.objectsInterface || secondObject instanceof self.objectsInterface) {
			if (
				Math.abs(firstObject.getCenter()['x'] - secondObject.getCenter()['x']) <= (firstObject.radius + secondObject.radius) &&
				Math.abs(firstObject.getCenter()['y'] - secondObject.getCenter()['y']) <= (firstObject.radius + secondObject.radius) &&
				firstObject.alive && secondObject.alive
			) {
				firstObject.die();
				secondObject.die();
			}
		}
		else{
			throw 'Objects must inherit from' + self.objectsInterface;
		}
	};

    return CollusionDetector;
});