define(['Drawable'], function (Drawable) {

    function Bullet(x, y, width, height, angle, alive) {
        var self = this;
        Drawable.call(self, x, y, width, height, angle, alive);
    }

    Bullet.prototype = Object.create(Drawable.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.update = function(){
        var self = this;
        self.delete();
        self.move();
        self.draw();
    };

    Bullet.prototype.startlifeCycle = function(duration){
        var self = this;
        self.alive = true;
        var timeOut = setTimeout(function(){
            self.alive = false;
            self.delete();
            clearTimeout(timeOut);
        }, duration);
    };
    Bullet.prototype.die = function(duration){
        var self = this;
        self.alive = false;
        self.delete();
    };

    return Bullet;
});