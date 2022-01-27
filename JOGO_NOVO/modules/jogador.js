export default function FuncoesJogador() {

    let context;
    let size = 30;

    const jogo = {
        tela: {
            width: 400,
            height: 400
        },
        jogadores: {
            'player1': { x: 30, y: 100 }
        }
    }

    // Atulizando o Y
    jogo.jogadores['player1'].y = jogo.tela.height - size;
    let height = jogo.tela.height;

    function ReceberContextTela(context_tela) {
        context = context_tela;
        return;
    }

    function CriarJogador() {
        for (const jogadorId in jogo.jogadores) {
            const desenha_jogador = jogo.jogadores[jogadorId];
            context.fillStyle = 'black'
            context.fillRect(desenha_jogador.x, desenha_jogador.y, size, size)
            return jogadorId;
        }
    }

    /*
    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            console.log(command)
            observerFunction(command)
        }
    }
    
    let gravity = 0.98;
    let velocity = 0;
    let jump_height = 50;

    function Atualizar_Jogador() {
        velocity += gravity;

        console.log('1 - Velocidade', velocity, 'gravidade', gravity)

        jogo.jogadores['player1'].y += velocity;

        console.log('2 - Velocidade', velocity, 'y', jogo.jogadores['player1'].y)

        console.log((jogo.jogadores['player1'].y + size) > height)

        if ((jogo.jogadores['player1'].y + size) > height) {
            jogo.jogadores['player1'].y = height - size;
            velocity = 0;
            console.log('3 - Velocidade', velocity, 'gravidade', gravity)
        }
    }

    function Verificando_Pulo() {
        return jogo.jogadores['player1'].y == (height - size);
    }
    */

    function MoverJogador(command) {

        //Atualizar_Jogador()


        let audioLIB,
            oscillator;

        function start() {

            audioLIB = new AudioContext();
            oscillator = audioLIB.createOscillator();
            oscillator.type = 'square';
            oscillator.connect(audioLIB.destination);
            oscillator.start();

        }

        const FuncoesMovimentos = {
            39(jogador) {
                if (jogador.x + 1 < jogo.tela.width) {
                    jogador.x = jogador.x + 30
                }
                start();

                setTimeout(oscillator.stop(), 0.00001);

            },
            37(jogador) {
                if (jogador.x - 23 >= 0) {
                    jogador.x = jogador.x - 30
                }
            },
            40(jogador) {
                if (jogador.y - 23 >= 0) {
                    jogador.y = jogador.y + 30
                }
            },
            38() {
                jogador.y = jogador.y - 30
                /*
                if (Verificando_Pulo()) {
                    console.log(Verificando_Pulo())
                    pular();
                }
                */
            },
            32() {
                shot();
                /*
                if (Verificando_Pulo()) {
                    console.log(Verificando_Pulo())
                    pular();
                }
                */
            }
        }

        const keyPressed = command.keyPressed
        const idJogador = command.playerId
        const jogador = jogo.jogadores[idJogador]
        const Movimentos = FuncoesMovimentos[keyPressed]

        if (jogador && Movimentos) {
            Movimentos(jogador)
        }

        //LIMPAR A TELA
        context.fillStyle = "white"
        context.clearRect(0, 0, 400, 400);

        // MOVER O JOGADOR
        context.fillStyle = 'black'
        context.fillRect(jogador.x, jogador.y, 30, 30);

    }

    function pular() {
        velocity -= jump_height;
        console.log('pulando: velocidade ', velocity, 'jump_height ', jump_height)
    }

    return {
        ReceberContextTela,
        CriarJogador,
        MoverJogador,
        //subscribe,
        //Atualizar_Jogador
    }
}