# JavaScript remake of Asteroids game

## Used design patterns
	- Prototype Pattern 
	- Facades and Module design pattern
	- Singelton design pattern
	- Pool

The game can be played at http://www.skostov.com/games/dark-as-your-soul/

## Application Directory Layout
	index.html					--> app layout file (the main html template file of the app)
	bower.json
	.bowerrc
	images/				
	css/
		styles.css		
    js/
		app.js					--> the main application module
		appServices.js			--> Shared services and helper functions between Models
		libs/					--> 3rd party js libraries
			requirejs/
				require.js
		
		models/
			background/
				main.js			--> game background model
			bullet/
				main.js			--> ship bullets model
			drawable/
				main.js			--> Abstract class that is parent of all models
			imageRepository/
				main.js			--> images repo that is responsible form images loading and start the game
			pool/
				main.js			--> pool used for Bullet and Zombie models
			ship/
				main.js			--> game ship
			zombie/
				main.js			--> game zombies
		
