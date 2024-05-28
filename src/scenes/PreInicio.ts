import telaPreInicioImg from '@assets/telaPreInicio/telaPreInicio.png';
import botaoComecarImg from '@assets/telaPreInicio/botaoComecar.png';
import botaoVoltarImg from '@assets/botoes/botaoVoltar.png';
import musicaIniciarFase from '@assets/musicas/startFase.mp3';

export class PreInicio extends Phaser.Scene {
  constructor() {
    super({ key: 'PreInicio' });
  }

  init(): void {}

  create(): void {
    const musicaFundo = this.sound.add('musicaFase', {
      volume: 0.5,
      loop: true
    });
    // Toca a música
    musicaFundo.play();
  
    const larguraTela = this.sys.canvas.width;
    const alturaTela = this.sys.canvas.height;
    // Adiciona a imagem de fundo que ocupa toda a tela
    const backgroundImage = this.add.image(0, 0, 'telaPreInicio.png');
    // Centraliza a imagem na tela
    backgroundImage.setOrigin(0);

    // Define as dimensões da imagem para preencher toda a tela
    backgroundImage.displayWidth = larguraTela;
    backgroundImage.displayHeight = alturaTela;

    let posicaoXBotao = larguraTela / 2;
    let posicaoYBotao = alturaTela / 2 + 160;

    const botaoComecar = this.add.image(posicaoXBotao + 35, posicaoYBotao, 'botaoComecar.png');
    botaoComecar.setOrigin(0);
    botaoComecar.displayWidth = 180;
    botaoComecar.displayHeight = 45;

    botaoComecar.setInteractive();
    botaoComecar.on('pointerdown', () => {
      musicaFundo.stop();
      this.scene.start('Fase')
    });

    const botaoVoltar = this.add.image(posicaoXBotao - 170, posicaoYBotao, 'botaoVoltar.png');
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
    this.load.image('telaPreInicio.png', telaPreInicioImg);

    // Pré-carrega a imagem do botão começar
    this.load.image('botaoComecar.png', botaoComecarImg);

    // Pré-carrega a imagem do botão voltar
    this.load.image('botaoVoltar.png', botaoVoltarImg);

    // Pré-carrega a música de fundo
    this.load.audio('musicaFase', musicaIniciarFase);
  }

  update(): void {}
}
