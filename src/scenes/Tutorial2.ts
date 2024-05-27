import telaTutorial2Img from '@assets/telaTutorial/telaTutorial2.png';
import botaoVoltarImg from '@assets/botoes/botaoVoltar.png';

export class Tutorial2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Tutorial2' });
  }

  init(): void {}

  create(): void {
    const larguraTela = this.sys.canvas.width;
    const alturaTela = this.sys.canvas.height;
    // Adiciona a imagem de fundo que ocupa toda a tela
    const backgroundImage = this.add.image(0, 0, 'telaTutorial2.png');
    // Centraliza a imagem na tela
    backgroundImage.setOrigin(0);

    // Define as dimensões da imagem para preencher toda a tela
    backgroundImage.displayWidth = larguraTela;
    backgroundImage.displayHeight = alturaTela;

    let larguraBotao = larguraTela / 2;
    let alturaBotao = alturaTela / 2 + 160;

    const botaoVoltar = this.add.image(larguraBotao - 70, alturaBotao, 'botaoVoltar.png');
    botaoVoltar.setOrigin(0);
    botaoVoltar.displayWidth = 180;
    botaoVoltar.displayHeight = 45;

    botaoVoltar.setInteractive();
    botaoVoltar.on('pointerdown', () => this.scene.start('Tutorial'));

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
    this.load.image('telaTutorial2.png', telaTutorial2Img);

    // Pré-carrega a imagem do botão voltar
    this.load.image('botaoVoltar.png', botaoVoltarImg);
  }

  update(): void {}
}
