define(function () {
    Service = {
		// sayHello: function(modelName){
		// 	console.log('hello, I am a service repo from ' + modelName);
		// },
		randomCoords: function(){
			return {
				'x': Math.floor((Math.random() * 1280) + 1),
				'y': Math.floor((Math.random() * 960) + 1)
			};
		},
		zeroCoords: function(){
			return {
				'x': 0,
				'y': 0
			};
		},
		randomAngle: function(){
			return Math.floor((Math.random() * 360) + 1);
		},
		zeroAngle: function(){
			return 0;
		},
		randomSpeedReset: function(){
			return -Math.floor((Math.random() * 10) + 1);
		},
		angleToVector: function(angle){
			return {'x': Math.cos(angle*Math.PI/180), 'y': Math.sin(angle*Math.PI/180)};
		}
    };
    return Service;
});