import telaPlacarImg from '@assets/telaPlacar/telaPlacar.png';
import botaoVoltarImg from '@assets/botoes/botaoVoltar.png';
import { getScores } from 'src/config/firebase';

export class Placar extends Phaser.Scene {
  constructor() {
    super({ key: 'Placar' });
  }

  init(): void {}

  create(): void {
    //console.log('process: ', process)
    getScores().then((data: any) => {
      console.log('deu certo');
      console.log('valores: ', data);
    }).catch((err: any) => {
      console.log('DEU ERROR: ', err);
    });

    const larguraTela = this.sys.canvas.width;
    const alturaTela = this.sys.canvas.height;
    // Adiciona a imagem de fundo que ocupa toda a tela
    const backgroundImage = this.add.image(0, 0, 'telaPlacar.png');
    // Centraliza a imagem na tela
    backgroundImage.setOrigin(0);

    // Define as dimensões da imagem para preencher toda a tela
    backgroundImage.displayWidth = larguraTela;
    backgroundImage.displayHeight = alturaTela;

    let larguraBotao = larguraTela / 2 - 85;
    let alturaBotao = alturaTela / 2 + 160;

    const botaoVoltar = this.add.image(larguraBotao, alturaBotao, 'botaoVoltar.png');
    botaoVoltar.setOrigin(0);
    botaoVoltar.displayWidth = 180;
    botaoVoltar.displayHeight = 45;

    botaoVoltar.setInteractive();
    botaoVoltar.on('pointerdown', () => this.scene.start('TelaInicial'));

    // Aplica estilos CSS para evitar rolagem e fixar a imagem de fundo
    const gameCanvas = document.querySelector('canvas');
    gameCanvas.style.display = 'block';
    gameCanvas.style.width = '100%';
    gameCanvas.style.height = '100%';
    gameCanvas.style.position = 'fixed';
    gameCanvas.style.top = '0';
    gameCanvas.style.left = '0';
    gameCanvas.style.overflow = 'hidden';
  
  }

  preload(): void {
    // Pré-carrega a imagem de fundo
    this.load.image('telaPlacar.png', telaPlacarImg);

    // Pré-carrega a imagem do botão voltar
    this.load.image('botaoVoltar.png', botaoVoltarImg);
  }

  update(): void {}
}
