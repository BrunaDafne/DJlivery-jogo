import { addScore } from "src/config/firebase";

export class Modal extends Phaser.GameObjects.Container {
  private inputElement: HTMLInputElement;

  constructor(scene: Phaser.Scene, pontuacao: number, resetar: () => void, reiniciar: () => void) {
      super(scene);

      let larguraBotao = scene.sys.canvas.width / 2 - 85;
      let alturaBotao = scene.sys.canvas.height / 2 + 160;

      const fundoModal = scene.add.graphics();
      fundoModal.fillStyle(0x000000, 0.5);
      fundoModal.fillRect(0, 0, scene.sys.canvas.width, scene.sys.canvas.height);
      this.add(fundoModal);

      const imagemFundo = scene.add.image(0, 0, 'gameoverFundo');
      imagemFundo.setOrigin(0);
      imagemFundo.displayWidth = scene.sys.canvas.width;
      imagemFundo.displayHeight = scene.sys.canvas.height;
      this.add(imagemFundo);

      const textoPontuacao = scene.add.text(scene.sys.canvas.width / 2 + 30, scene.sys.canvas.height / 2 + 8, `Sua pontuação: ${pontuacao}`, { 
        fontSize: '20px', 
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
      });
      textoPontuacao.setOrigin(0.5);
      this.add(textoPontuacao);

      // Create input field
      this.createInput(scene);

      const botaoSalvar = scene.add.image(larguraBotao + 25, alturaBotao - 70, 'botaoSalvar.png');
      botaoSalvar.setOrigin(0);
      botaoSalvar.displayWidth = 180;
      botaoSalvar.displayHeight = 45;

      botaoSalvar.setInteractive();
      botaoSalvar.on('pointerdown', () => {
          const playerName = this.inputElement.value.trim();
          if (playerName) {
            addScore(playerName, pontuacao);
            this.inputElement.remove();

            botaoSalvar.setVisible(false);
            botaoSalvar.disableInteractive();

            const sucesso = scene.add.text(scene.sys.canvas.width / 2 + 30, scene.sys.canvas.height / 2 + 45, 'Sua pontuação foi salva!', { 
              fontSize: '20px', 
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
            });
            sucesso.setOrigin(0.5);
            this.add(sucesso);
          } else {
            alert('Por favor, digite seu nome para salvar sua pontuação.');
          }
      });
      this.add(botaoSalvar);

      const botaoReiniciar = scene.add.image(larguraBotao + 140, alturaBotao - 10, 'botaoReiniciar.png');
      botaoReiniciar.setOrigin(0);
      botaoReiniciar.displayWidth = 180;
      botaoReiniciar.displayHeight = 45;

      botaoReiniciar.setInteractive();
      botaoReiniciar.on('pointerdown', () => {
        this.inputElement.remove();
        reiniciar();
      });
      this.add(botaoReiniciar);

      const botaoVoltar = scene.add.image(larguraBotao - 90, alturaBotao -10, 'botaoInicio.png');
      botaoVoltar.setOrigin(0);
      botaoVoltar.displayWidth = 180;
      botaoVoltar.displayHeight = 45;

      botaoVoltar.setInteractive();
      botaoVoltar.on('pointerdown', () => {
        this.inputElement.remove();
        resetar();
        scene.scene.start('TelaInicial');
      });
      this.add(botaoVoltar);


      scene.add.existing(this);
  }

  private createInput(scene: Phaser.Scene) {
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.placeholder = 'Digite seu nome';
    this.inputElement.maxLength = 10;
    this.inputElement.style.position = 'absolute';
    this.inputElement.style.width = '400px';
    this.inputElement.style.height = '15px';
    this.inputElement.style.borderWidth = '3px';
    this.inputElement.style.padding = '10px';
    this.inputElement.style.top = `${scene.sys.canvas.height / 2 + 30}px`;
    this.inputElement.style.left = `${scene.sys.canvas.width / 2 - 180}px`;
    this.inputElement.style.boxShadow = '0px 8px 8px #fcb506';

    document.body.appendChild(this.inputElement);

    scene.events.on('shutdown', () => {
        this.inputElement.remove();
    });
  } 
}
