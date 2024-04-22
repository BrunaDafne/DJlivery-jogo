import telaMenuImg from '@assets/telaInicial/telaMenu.png';
import botaoIniciarImg from '@assets/telaInicial/botaoIniciar.png';
import botaoTutorialImg from '@assets/telaInicial/botaoTutorial.png';
import botaoPlacarImg from '@assets/telaInicial/botaoPlacar.png';

export class TelaInicial extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaInicial' });
  }

  init(): void {}

  create(): void {
    const larguraTela = this.sys.canvas.width;
    const alturaTela = this.sys.canvas.height;

    // Adiciona a imagem de fundo que ocupa toda a tela
    const backgroundImage = this.add.image(0, 0, 'telaMenu.png');
    // Centraliza a imagem na tela
    backgroundImage.setOrigin(0);
    // Define as dimensões da imagem para preencher toda a tela
    backgroundImage.displayWidth = larguraTela;
    backgroundImage.displayHeight = alturaTela;

    let larguraBotao = larguraTela / 2 - 95;
    let alturaBotao = alturaTela / 2 + 40;
    // Adiciona a imagem do botão inicial
    const botaoIniciar = this.add.image(larguraBotao, alturaBotao, 'botaoIniciar.png');
    botaoIniciar.setOrigin(0);
    botaoIniciar.displayWidth = 200;
    botaoIniciar.displayHeight = 50;

    alturaBotao = alturaBotao + 70;
    botaoIniciar.setInteractive();
    botaoIniciar.on('pointerdown', () => this.scene.start('PreInicio'));

    // Adiciona a imagem do botão tutorial
    const botaoTutorial = this.add.image(larguraBotao, alturaBotao, 'botaoTutorial.png');
    botaoTutorial.setOrigin(0);
    botaoTutorial.displayWidth = 200;
    botaoTutorial.displayHeight = 50;

    alturaBotao = alturaBotao + 70;
    botaoTutorial.setInteractive();
    botaoTutorial.on('pointerdown', () => this.scene.start('Tutorial'));

    // Adiciona a imagem do botão placar
    const botaoPlacar = this.add.image(larguraBotao, alturaBotao, 'botaoPlacar.png');
    botaoPlacar.setOrigin(0);
    botaoPlacar.displayWidth = 200;
    botaoPlacar.displayHeight = 50;
    botaoPlacar.setInteractive();
    botaoPlacar.on('pointerdown', () => this.scene.start('Placar'));

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
    this.load.image('telaMenu.png', telaMenuImg);

    // Pré-carrega a imagem botão iniciar
    this.load.image('botaoIniciar.png', botaoIniciarImg);

    // Pré-carrega a imagem botão tutorial 
    this.load.image('botaoTutorial.png', botaoTutorialImg);

    // Pré-carrega a imagem botão placar
    this.load.image('botaoPlacar.png', botaoPlacarImg);
  }

  update(): void {
  }
}
