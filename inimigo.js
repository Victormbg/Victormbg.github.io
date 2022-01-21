function Inimigo() {
    this.x = width;
    this.height = random(80) + 20;
    this.width = 30;
    this.speed = 6;

    this.show = function () {
        fill(192);
        rect(this.x, (height - this.height), this.width, this.height);
    }

    this.update = function () {
        this.x -= this.speed;
    }

    this.outOfScreen = function () {
        return (this.x < -this.width ? true : false);
    }
}