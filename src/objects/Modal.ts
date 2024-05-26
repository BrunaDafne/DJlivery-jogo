import { addScore } from "src/config/firebase";

export class Modal extends Phaser.GameObjects.Container {
  private inputElement: HTMLInputElement;

  constructor(scene: Phaser.Scene, pontuacao: number, reiniciarCallback: () => void) {
      super(scene);

      const fundoModal = scene.add.graphics();
      fundoModal.fillStyle(0x000000, 0.5);
      fundoModal.fillRect(0, 0, scene.sys.canvas.width, scene.sys.canvas.height);
      this.add(fundoModal);

      const imagemFundo = scene.add.image(scene.sys.canvas.width / 2, scene.sys.canvas.height / 2, 'imagemFundoModal');
      this.add(imagemFundo);

      const textoPontuacao = scene.add.text(scene.sys.canvas.width / 2, scene.sys.canvas.height / 2 - 50, `Pontuação: ${pontuacao}`, { fontSize: '32px', color: '#fff' });
      textoPontuacao.setOrigin(0.5);
      this.add(textoPontuacao);

      // Create input field
      this.createInput(scene);

      const botaoSalvar = scene.add.text(scene.sys.canvas.width / 2, scene.sys.canvas.height / 2 + 80, 'Salvar', { fontSize: '24px', color: '#fff' });
      botaoSalvar.setOrigin(0.5);
      botaoSalvar.setInteractive();
      botaoSalvar.on('pointerdown', () => {
          const playerName = this.inputElement.value;
          if (playerName) {
            addScore(playerName, pontuacao);
          }
          addScore(`jogador ${pontuacao}`, pontuacao);
      });
      this.add(botaoSalvar);

      const botaoReiniciar = scene.add.text(scene.sys.canvas.width / 2, scene.sys.canvas.height / 2 + 50, 'Reiniciar', { fontSize: '24px', color: '#fff' });
      botaoReiniciar.setOrigin(0.5);
      botaoReiniciar.setInteractive();
      botaoReiniciar.on('pointerdown', () => {
        this.inputElement.remove();
        reiniciarCallback();
      }); // Define o evento de clique para chamar a função de callback
      this.add(botaoReiniciar);

      scene.add.existing(this);
  }

  private createInput(scene: Phaser.Scene) {
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.placeholder = 'Digite seu nome';
    this.inputElement.style.position = 'absolute';
    this.inputElement.style.width = '200px';
    this.inputElement.style.top = `${scene.sys.canvas.height / 2 - 15}px`;
    this.inputElement.style.left = `${scene.sys.canvas.width / 2 - 100}px`;

    document.body.appendChild(this.inputElement);

    scene.events.on('shutdown', () => {
        this.inputElement.remove();
    });
  }
}
