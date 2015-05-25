define(['Drawable', 'helperFunctions'], function (Drawable, helperFunctions) {
       
    function Zombie(x, y, width, height, angle, alive) {
        var self = this;
        Drawable.call(self, x, y, width, height, angle, alive);
        
        //self.angleVelocity = 3;
		self.slowDownFactor = 0.03;
		self.speed = 0;
		//self.acc = 0;
		//self.angle = angle;
        self.speedReset = helperFunctions.randomSpeedReset();
        self.velocity = 0;
    }
    Zombie.prototype = Object.create(Drawable.prototype);
    Zombie.prototype.constructor = Zombie;

    Zombie.prototype.die = function(frames){
        var self = this,
            frames = frames?frames:10,
            angle = 360 / frames,
            alfaCoef = 1 / frames,
            alfa = 1;
        
        self.alive = false;
        var setDieInterval = setInterval(function(){
            frames--;
            self.delete();
            self.angle += angle;
            self.draw(alfa);
            if (frames <= 0) {
                clearInterval(setDieInterval);
                self.delete();
            }
            alfa -= alfaCoef;
        }, 15);
    };

    Zombie.prototype.update = function(){
        var self = this;
        if (self.speed < self.speedReset) {
            self.speed = 5;
            self.angle = -self.angle * (Math.round((Math.random()*10))%4);
        }

        if (self.angle > 360) {
            self.angle = self.angle%360;
        }
        self.speed -= self.slowDownFactor;
        self.angle += 0.5;

        self.move();
    };


    return Zombie;
});