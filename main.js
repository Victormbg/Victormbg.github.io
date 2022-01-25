import { CriarTela } from './modules/tela.js';
import FuncoesJogador from './modules/jogador.js';
import { TecladoListener } from './modules/TecladoListener.js';

let tela = CriarTela('tela', document.body, 400, 400);

let funcao = FuncoesJogador();
funcao.ReceberContextTela(tela.context);

let jogador = funcao.CriarJogador();
const tecla = TecladoListener(jogador);

funcao.Atualizar_Jogador();
tecla.subscribe(funcao.MoverJogador);