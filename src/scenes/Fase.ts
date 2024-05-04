import telaPlacarImg from '@assets/telaPlacar/telaPlacar.png';
import djLiveryImg from '@assets/telaFase/djlivery.png';


export class Fase extends Phaser.Scene {
  private jogador: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private bg!: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: 'Fase' }); 
  }

  init(): void {}

  create(): void {
    const {width, height} = this.scale;
    // adiciona o fundo
    this.bg = this.add.tileSprite(0,0, width, height, 'background').setScale(2);
    const larguraTela = this.sys.canvas.width;
    const alturaTela = this.sys.canvas.height;

    // Definir os limites do mundo, onde ele não vai deixar ultrapassar nem dos lados e nem embaixo
    this.physics.world.setBounds(0, 0, larguraTela, alturaTela);

    // Aplica estilos CSS para evitar rolagem e fixar a imagem de fundo
    const gameCanvas = document.querySelector('canvas');
    gameCanvas.style.display = 'block';
    gameCanvas.style.width = '100%';
    gameCanvas.style.height = '100%';
    gameCanvas.style.position = 'fixed';
    gameCanvas.style.top = '0';
    gameCanvas.style.left = '0';
    gameCanvas.style.overflow = 'hidden';
  
    // Cria o jogador
    this.jogador = this.physics.add.sprite(larguraTela / 2, alturaTela / 2, 'djLivery');

    // O jogador não vai conseguir ultrapassar os limites do mundo
    this.jogador.setCollideWorldBounds(true);
    
    // Criando as animações do jogador
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('djLivery', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'djLivery', frame: 4 } ],
      frameRate: 20
    });
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('djLivery', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(): void {
    // Pré-carrega o sprint do djlivery
    this.load.spritesheet('djLivery', djLiveryImg, { frameWidth: 32, frameHeight: 48 });

    // Pré-carrega a imagem de fundo
    this.load.image('background', telaPlacarImg);
  }

  update(): void {
    // Muda a posição do fundo no eixo Y, dando a sensação de movimento
    this.bg.tilePositionY += -0.5;
    if (this.cursors.left.isDown)
      {
          this.jogador.setVelocityX(-300);
      
          this.jogador.anims.play('left', true);
      }
      else if (this.cursors.right.isDown)
      {
          this.jogador.setVelocityX(300);
      
          this.jogador.anims.play('right', true);
      }
      else
      {
          this.jogador.setVelocityX(0);
      
          this.jogador.anims.play('turn');
      }

      if (this.cursors.up.isDown)
        {
            this.jogador.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown)
        {
            this.jogador.setVelocityY(300);
        }
        else
        {
            this.jogador.setVelocityY(0);
        }
  }
}
