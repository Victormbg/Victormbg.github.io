export default function FuncoesJogador() {

    let context;

    const jogo = {
        tela: {
            width: 400,
            height: 400
        },
        jogadores: {
            'player1': { x: 50, y: 350 }
        }
    }

    function ReceberContextTela(context_tela) {

        context = context_tela;

        return;

    }

    function CriarJogador() {

        for (const jogadorId in jogo.jogadores) {
            const desenha_jogador = jogo.jogadores[jogadorId];
            context.fillStyle = 'black'
            context.fillRect(desenha_jogador.x, desenha_jogador.y, 30, 30)
            return jogadorId;
        }

    }

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

    function MoverJogador(command) {

        const FuncoesMovimentos = {
            39(jogador) {
                if (jogador.x + 1 < jogo.tela.width) {
                    jogador.x = jogador.x + 30
                }
            },
            37(jogador) {
                if (jogador.x - 23 >= 0) {
                    jogador.x = jogador.x - 30
                }
            },
            38(jogador) {
                if (jogador.y - 1 >= 0) {
                    jogador.y = jogador.y - 30
                }
            },
            40(jogador) {
                if (jogador.y - 23 >= 0) {
                    jogador.y = jogador.y + 30
                }
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
        context.fillRect(jogador.x, jogador.y, 30, 30)

    }

    return {
        ReceberContextTela,
        CriarJogador,
        MoverJogador,
        subscribe
    }
}