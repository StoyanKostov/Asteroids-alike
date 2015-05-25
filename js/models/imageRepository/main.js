define(function () {
	// Singelton design pattern
	imageRepository = new function() {
		var self = this,
			numLoaded = 0;
		self.list = {};
		// Define images
		self.initImages = function(inputArray, callback){
			var inputArray = inputArray;
			var inputArrayLenght = inputArray.length;

			inputArray.forEach(function(item, index, arr){
				var currImage = new Image();
				currImage.onload = function() {
					numLoaded++;
					if (numLoaded === inputArrayLenght) {
						if (typeof callback === 'function') {
							callback();
						}
					}
				};
				currImage.src = item.src;
				self.list[item.name] = currImage;
			});

		};
		return self;
	};

	return imageRepository;
});