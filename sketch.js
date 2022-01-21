var player;
var inimigos = [];

let musica;
let fundo;

function preload() {
    musica = loadSound('assets/musica.mp3');
    fundo = loadImage('assets/ceu.jpg');
}

function setup() {
    initialize();
}

function mousePressed() {
    if (musica.isPlaying()) {
        musica.stop();
        console.log("MUSICA DESLIGADA!!!");
    } else {
        musica.play();
        console.log("MUSICA LIGADA!!!");
    }
}

function draw() {
    background(fundo);
    player.update();
    player.show();
    player.movimento();

    // INIMIGO
    for (var i = inimigos.length - 1; i >= 0; i--) {
        inimigos[i].show();
        inimigos[i].update();

        if (player.hits(inimigos[i])) {
            initialize();
            return false;
        }

        if (inimigos[i].outOfScreen()) {
            inimigos.splice(i, 1);
            player.score += 10;
        }
    }

    if (frameCount % 80 == 0) {
        inimigos.push(new Inimigo());
    }

}

function initialize() {
    inimigos = [];
    createCanvas(400, 400);
    player = new Player();
    inimigos.push(new Inimigo());
}