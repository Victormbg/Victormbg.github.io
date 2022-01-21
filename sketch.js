var player;
var inimigos = [];

let musica;
let player_imagem,inimigo_imagem,icone_musica;
let fundo_imagem;

let MENU = 0;

function preload() {
    musica = loadSound('assets/musica.mp3');
    fundo_imagem = loadImage('assets/ceu.jpg');
    icone_musica = loadImage('assets/som.png');
    inimigo_imagem = loadImage('assets/inimigo.png');
    player_imagem = loadImage('assets/player.png');
}

function setup() {
    initialize();
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

function mouseClicked() {
    if (MENU == 0) {
        if (mouseX < 200 && mouseX > 50) {
            if (mouseY < 105 && mouseY > 50) {
                MENU = 1
            }
            if (mouseY < 200 && mouseY > 150) {
                MENU = 2
            }
            if (mouseY < 300 && mouseY > 250) {
                MENU = 3
            }
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
    background(255);
    fill(0, 255, 0);
    rect(50, 50, 200, 75);
    fill(255, 0, 255);
    rect(50, 150, 200, 75);
    fill(255, 0, 0);
    rect(50, 250, 200, 75);
    textSize(50)
    fill(255);
    text('Iniciar', 70, 105);
    textSize(40);
    text('Instruções', 60, 200);
    text('Creditos', 70, 300);
    // COMEÇAR O JOGO
    if (MENU == 1) {
        background(fundo_imagem);
        player.update();
        player.show(player_imagem);
        player.movimento();

        // INIMIGO
        for (var i = inimigos.length - 1; i >= 0; i--) {
            inimigos[i].show(inimigo_imagem);
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
    // INSTRUCOES
    if (MENU == 2) {
        background(255, 0, 255)
        textSize(20)
        text('Aperte ESC para voltar ao MENU', 60, 30)
        textSize(20)
        text('1. Puler os inimigos tocando na tela', 20, 150)
        text('ou com a barra de espaço', 20, 180)
        text('2. Você consegui mover seu jogador', 20, 230)
        text('para a esquerda e direita', 20, 260)
        text('OBS: Aperte "S" para iniciar', 20, 300)
        text('e para a musica', 20, 330)
        if (keyCode == 27) {
            MENU = 0;
        }
    }
    // CREDITOS
    if (MENU == 3) {
        background(255, 0, 0)
        textSize(20);
        text('Aperte ESC para voltar ao MENU', 60, 50)
        textSize(25);
        text('Feito por: Victor Garcia', 20, height / 2);
        if (keyCode == 27) {
            MENU = 0;
        }
    }
    if (musica.isPlaying()) {
        image(icone_musica, 350, 10, 50, 50);
    } else {
        image(icone_musica);
    }
}

function initialize() {
    inimigos = [];
    createCanvas(400, 400);
    player = new Player();
    inimigos.push(new Inimigo());
}