//http://tech.pro/blog/1561/five-helpful-tips-when-using-requirejs
//http://www.htmlgoodies.com/html5/client/how-to-build-asteroids-with-the-impact-html5-game-engine-modules.html#fbid=xr3JNmMgN2A
require.config({
    "packages": [
		{ 
			name: 'appServices',
			main: '../appServices'
		},
		{ 
			name: 'imageRepository',
			location: 'models/imageRepository'
		},
		{ 
			name: 'Drawable',
			location: 'models/drawable'
		},
		{ 
			name: 'Background',
			location: 'models/background',
		},
		{ 
			name: 'Ship',
			location: 'models/ship'
		},
		{ 
			name: 'Zombie',
			location: 'models/zombie'
			//main: 'main'
		},
		{ 
			name: 'Bullet',
			location: 'models/bullet'
		},
		{ 
			name: 'Pool',
			location: 'models/pool'
		}
	]
});
var game;
var zombie;
require(['appServices', 'imageRepository', 'Drawable', 'Background', 'Ship', 'Zombie', 'Bullet', 'Pool' ],
function (appServices, imageRepository, Drawable, Background, Ship, Zombie, Bullet, Pool) {
	zombie = Zombie;

	var images = [
		{name: 'backgroundStatic', src: 'images/spaceBg.jpg'},
		{name: 'background', src: 'images/spaceBg.png'},
		{name: 'spaceShip', src: 'images/spaceShipBody.png'},
		{name: 'spaceShipShieldsOn', src: 'images/spaceShipBodyShieldsOn.png'},
		{name: 'spaceZombie', src: 'images/spaceZombie.png'},
		{name: 'bullet', src: 'images/bullet.png'},
	]

	imageRepository.initImages(images, function(){
		console.log('all images loaded');
		if(game.init()){
			game.start();
			console.log('game started');
		}
	});

	// Facades and Module design pattern
	game = (function(){
		var bgCanvas = document.getElementById('background'),
			bgContext = bgCanvas.getContext('2d'),
			shipCanvas = document.getElementById('ship'),
			shipContext = shipCanvas.getContext('2d'),
			enemyCanvas = document.getElementById('enemy'),
			enemyContext = enemyCanvas.getContext('2d'),
			bulletsCanvas = document.getElementById('bullets'),
			bulletsContext = bulletsCanvas.getContext('2d');
		
		Drawable.prototype.canvasWidth = 1280;
		Drawable.prototype.canvasHeight = 960;

		Background.prototype.context = bgContext;
		Background.prototype.backgroundStatic = imageRepository.list.backgroundStatic;
		Background.prototype.background = imageRepository.list.background;

		Ship.prototype.context = shipContext;
		Ship.prototype.image = imageRepository.list.spaceShip;

		Zombie.prototype.context = enemyContext;
		Zombie.prototype.image = imageRepository.list.spaceZombie;


		Bullet.prototype.context = bulletsContext;
		Bullet.prototype.image = imageRepository.list.bullet;
		
		return {
			init : function() {
				if (bgContext && shipCanvas && enemyCanvas) {
					this.background = new Background(0, 0);
					this.ship = new Ship(640, 480, imageRepository.list.spaceShip.width, imageRepository.list.spaceShip.height, -90, true);
					this.zombiePool = new Pool(
						10,
						Zombie,
						appServices.randomCoords,
						imageRepository.list.spaceZombie.width,
						imageRepository.list.spaceZombie.height,
						appServices.randomAngle,
						true
					);

					return true;
				}
				else {
					return false;
				}
			},
			// Start the animation loop
			start : function() {
				this.ship.draw();
				//this.zombiePool.poolListExec('draw');
				CollusionDetector.start();
				animate();	
			}
		}
	})();

	//TODO Observer patern for pools with bullets and zombies
	CollusionDetector = new function(){
		var self = this;
		self.updateInterval;

		self.start = function(){
			self.updateInterval = setInterval(function(){ 
				groupCollide(game.ship, game.zombiePool) 
			}, 200);
		}
		self.stop = function(){
			clearInterval(self.updateInterval);
		}

		function groupCollide(ship, zombies){
			zombies.poolList.forEach(function(zombie, index, arr){
				collide(ship, zombie);
				ship.bulletPool.poolList.forEach(function(bullet, index, arr){
					collide(bullet, zombie);
				});
			});
		}

		function collide(firstObject, secondObject){
			if (
				Math.abs(firstObject.getCenter()['x'] - secondObject.getCenter()['x']) <= (firstObject.radius + secondObject.radius) &&
				Math.abs(firstObject.getCenter()['y'] - secondObject.getCenter()['y']) <= (firstObject.radius + secondObject.radius) &&
				firstObject.alive && secondObject.alive 
			) {
				console.log('collusion detected');
				//game.zombiePool.getByIndex(secondObjectIndex).die(10);
				firstObject.die();
				secondObject.die(10);
				//game.zombiePool.remove(secondObjectIndex);
			};
			
		}

		return self;
	}

	//Your callback routine must itself call requestAnimationFrame()
	//if you want to animate another frame at the next repaint.
	var requestAnimFrame = (function(){
		return  window.requestAnimationFrame   ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame     ||
				function(callback, element){
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	function animate() {
		game.background.draw();
		if (game.ship.alive) {
			game.ship.update();
		};
		game.zombiePool.update();
		requestAnimFrame(animate);
	}
});