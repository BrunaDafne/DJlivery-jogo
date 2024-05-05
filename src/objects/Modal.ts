export class Modal extends Phaser.GameObjects.Container {
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
  
      const botaoReiniciar = scene.add.text(scene.sys.canvas.width / 2, scene.sys.canvas.height / 2 + 50, 'Reiniciar', { fontSize: '24px', color: '#fff' });
      botaoReiniciar.setOrigin(0.5);
      botaoReiniciar.setInteractive();
      botaoReiniciar.on('pointerdown', reiniciarCallback); // Define o evento de clique para chamar a função de callback
      this.add(botaoReiniciar);
  
      scene.add.existing(this);
    }
  }
  