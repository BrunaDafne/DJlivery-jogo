import telaPlacarImg from '@assets/telaPlacar/telaPlacar.png';
import botaoVoltarImg from '@assets/botoes/botaoVoltar.png';
import { getScores } from 'src/config/firebase';

export class Placar extends Phaser.Scene {
  constructor() {
    super({ key: 'Placar' });
  }

  init(): void {}

  create(): void {
    const larguraTela = this.sys.canvas.width;
    const alturaTela = this.sys.canvas.height;

    // Adiciona a imagem de fundo que ocupa toda a tela
    const backgroundImage = this.add.image(0, 0, 'telaPlacar.png');
    // Centraliza a imagem na tela
    backgroundImage.setOrigin(0);

    // Define as dimensões da imagem para preencher toda a tela
    backgroundImage.displayWidth = larguraTela;
    backgroundImage.displayHeight = alturaTela;

    let larguraBotao = larguraTela / 2 - 80;
    let alturaBotao = alturaTela / 2 + 190;

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
  
    const loadingText = this.add.text(this.sys.canvas.width / 2 + 10, 220, 'Carregando...', {
      fontSize: '18px',
      color: '#000',
      fontStyle: 'bold',
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#fcb506',
        blur: 2,
        stroke: true,
        fill: true
    }
    }).setOrigin(0.5, 0.5);

    getScores().then((data: Array<{nome: string; pontuacao: number;}>) => {
      this.displayScores(data);
    }).catch((err: any) => {
      alert('Não foi possível buscar o placar');
      loadingText.setText('Não foi possível buscar os dados');
    }).finally(() => {
      loadingText.destroy();
    });
  }

  preload(): void {
    // Pré-carrega a imagem de fundo
    this.load.image('telaPlacar.png', telaPlacarImg);

    // Pré-carrega a imagem do botão voltar
    this.load.image('botaoVoltar.png', botaoVoltarImg);
  }

  update(): void {}

  displayScores(data: Array<{nome: string; pontuacao: number;}>): void {
    const startX = this.sys.canvas.width / 2 + 10;
    let startY = 202; 

    data.forEach((item: {nome: string; pontuacao: number;}, index: number) => {
      const text = `${index + 1} - ${item.nome} - ${item.pontuacao}`;
      this.add.text(startX, startY, text, 
      { 
        fontSize: '18px', 
        color: '#000',
        fontStyle: 'bold',
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#fcb506',
          blur: 2,
          stroke: true,
          fill: true
      }}
    ).setOrigin(0.5, 0);
      startY += 30; 
    });
  }
}
