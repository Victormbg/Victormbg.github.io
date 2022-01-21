var player;
var inimigos = [];

let musica;
let icone_musica;
let fundo;

function preload() {
    musica = loadSound('assets/musica.mp3');
    fundo = loadImage('assets/ceu.jpg');
    icone_musica = loadImage('assets/som.png');
}

function setup() {
    initialize();


    image(icone_musica, 10, 10, 50, 50);
}

function keyPressed() {
    if (keyCode === 83) {
        if (musica.isPlaying()) {
            musica.stop();
            image(icone_musica, 10, 10, 50, 50);
            console.log("MUSICA DESLIGADA!!!");
        } else {
            musica.play();
            image(icone_musica, 0, 0);
            console.log("MUSICA LIGADA!!!");
        }
    }
}

function touchStarted() {
    player.touchstarted = true;
    player.touchended = false;
    return false;
}

function touchEnded() {
    if (touches.length == 0) {
        player.touchended = true;
        player.touchstarted = false;
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