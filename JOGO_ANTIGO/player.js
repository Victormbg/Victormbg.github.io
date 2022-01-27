function Player() {
    this.size = 60;
    this.y = height - this.size;
    this.x = 50;

    this.gravity = 0.98;
    this.velocity = 0;
    this.jump_height = 18;
    this.score = 0;

    this.touchended = false;
    this.touchstarted = false;

    this.show = function (img) {
        //fill(255);
        image(img, this.x, this.y, this.size, this.size);
        noFill();
        //rect(this.x, this.y, this.size, this.size);

        textSize(19);
        text("PONTUAÇÃO: " + this.score, 30, 30);

        console.log("PONTUAÇÃO: " + this.score)
    }

    this.update = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if ((this.y + this.size) > height) {
            this.y = height - this.size;
            this.velocity = 0;
        }
    }

    this.onBottom = function () {
        return this.y == (height - this.size);
    }

    this.movimento = function () {
        if (keyIsDown(LEFT_ARROW)) {
            this.x = this.x - 10;
            //console.log("ESQUERDA")
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.x = this.x + 10;
            //console.log("DIREITA")
        }
        else if (keyIsDown(32) && player.onBottom()) {
            this.jump();
            //console.log("PULANDO")
        }
        else {
            if (this.touchstarted && player.onBottom()) {
                this.jump();
                //console.log("PULANDO")
            }
        }
    }
    this.jump = function () {
        this.velocity -= this.jump_height;
    }

    this.hits = function (obstacle) {
        if ((obstacle.x >= this.x) && (obstacle.x <= (this.x + this.size)) &&
            ((this.y + this.size) >= (height - obstacle.height))) {
            return true;
        } else {
            return false;
        }
    }
}