//http://tech.pro/blog/1561/five-helpful-tips-when-using-requirejs
//http://www.htmlgoodies.com/html5/client/how-to-build-asteroids-with-the-impact-html5-game-engine-modules.html#fbid=xr3JNmMgN2A
//http://jondavidjohn.com/extend-javascript-functions/
//http://atomicrobotdesign.com/blog/web-development/how-to-use-sprite-sheets-with-html5-canvas/
require.config({
    "packages": [
		{
			name: 'helperFunctions',
		},
		{
			name: 'collusionDetectionService',
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
var myDrawable;
require(['collusionDetectionService', 'helperFunctions', 'imageRepository', 'Drawable', 'Background', 'Ship', 'Zombie', 'Bullet', 'Pool' ],
function (CollusionDetectionService, helperFunctions, imageRepository, Drawable, Background, Ship, Zombie, Bullet, Pool) {
	// Load images
	var images = [
		{name: 'backgroundStatic', src: 'images/spaceBg.jpg'},
		{name: 'background', src: 'images/spaceBg.png'},
		{name: 'spaceShip', src: 'images/spaceShipBody.png'},
		{name: 'spaceShipShieldsOn', src: 'images/spaceShipBodyShieldsOn.png'},
		{name: 'spaceZombie', src: 'images/spaceZombie.png'},
		{name: 'bullet', src: 'images/bullet.png'},
	];

	imageRepository.initImages(images, function(){
		console.log('all images loaded');
		if(game.init()){
			game.start();
			console.log('game started');
		}
	});

	myDrawable = Drawable;

	function Foo(){
		var self = this;
	}

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
						helperFunctions.randomCoords,
						imageRepository.list.spaceZombie.width,
						imageRepository.list.spaceZombie.height,
						helperFunctions.randomAngle,
						true
					);

					// Init collusion detection with Abstract object witch implements properies of colliding objects and set updateIntervalTimeOut
					this.collusionDetector = new CollusionDetectionService(
						[
							{'first': game.zombiePool.poolList, 'second': [game.ship]},
							{'first': game.zombiePool.poolList, 'second': game.ship.bulletPool.poolList}
						],
						Drawable,
						100
					);

					return true;
				}
				else {
					return false;
				}
			},
			// Start the animation loop
			start : function() {
				game.ship.draw();
				game.ship.setInvinsibleMode(3000);
				game.collusionDetector.start();

				// Start collusion detection
				// Start collusion detection
				// game.collusionDetector.start(function groupCollide(){
				// game.zombiePool.poolList.forEach(function(zombie, index, arr){
				//		// Collution between ship and zombies
				//		game.collusionDetector.collide(game.ship, zombie);

				//		// Collution between ship bullets and zombies
				//		game.ship.bulletPool.poolList.forEach(function(bullet, index, arr){
				//			game.collusionDetector.collide(bullet, zombie);
				//		});
				//	});
				// });
				animate();
			}
		};
	})();

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
		}
		game.zombiePool.update();
		requestAnimFrame(animate);
	}
});