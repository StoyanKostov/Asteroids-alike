define(function () {
	//var Drawable = require("Drawable");
	//var appServices = require("appServices");
	
	function Pool(size, Object, coords, width, height, angle, alive) {
		var self = this;
		self.poolList = [];
		self._construct(size, Object, coords, width, height, angle, alive);

		return self;
	}

	Pool.prototype._construct = function(size, Object, coords, width, height, angle, alive){
		var self = this;
		self.poolList = Array.apply(null, new Array(size)).map(function(item){
			return new Object(coords()['x'], coords()['y'], width, height, angle(), alive);
		});
	}

	// Pool.prototype.add = function(item){
	// 	var self = this;
	// 	if (item instanceof Drawable) {
	// 		self.poolList.push(item);
	// 	}
	// 	else{
	// 		console.log('Item wrong type');
	// 	};
	// }

	// Pool.prototype.remove = function(index){
	// 	var self = this;
	// 	self.poolList.splice(index, 1);
	// }

	// Pool.prototype.reuse = function(shipAngleAsVector, callback){
	// 	var self = this;
	// 	var currBullet = self.poolList.shift();
	// 	if (typeof callback === 'function' && !currBullet.alive) {
	// 		callback(shipAngleAsVector, currBullet);
	// 	};
	// 	self.poolList.push(currBullet);
	// }

	Pool.prototype.getFirst = function(){
		var self = this;
		return self.poolList.shift();
	}

	Pool.prototype.putLast = function(bullet){
		var self = this;
		return self.poolList.push(bullet);
	}
	
	Pool.prototype.getByIndex = function(index){
		var self = this;
		return self.poolList[index];
	}

	Pool.prototype.poolListExec = function(action){
		var self = this;
		self.poolList.forEach(function(item, index, arr){
			if (item.alive) {
				item[action]();
			}
		});
	}

	Pool.prototype.update = function(){
		var self = this;
			self.poolListExec('delete');
		self.poolListExec('update');
		self.poolListExec('draw');
	}

	return Pool;
});