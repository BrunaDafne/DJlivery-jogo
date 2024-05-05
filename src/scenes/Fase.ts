import telaPlacarImg from '@assets/telaPlacar/telaPlacar.png';
import djLiveryImg from '@assets/telaFase/djlivery.png';
import pinAmareloImg from '@assets/telaFase/colisao/pinamarelo.png';
import pinVermelhoImg from '@assets/telaFase/colisao/pinvermelho.png';
import pinAzulImg from '@assets/telaFase/colisao/pinazul.png';
import { Modal } from '@objects/Modal';

export class Fase extends Phaser.Scene {
  private jogador: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private bg!: Phaser.GameObjects.TileSprite;
  private pontuacao: number = 0; // Variável para contar a pontuação do jogador
  private vidas: number = 3; // Variável que conta as vidas do jogador

  private pinos: Phaser.Physics.Arcade.Image[] = [];
  private tempoProximoPino: number = 0;
  private intervaloEntrePinos: number = 5000; // Intervalo em milissegundos para aparecer o próximo pino
  private adicionandoPino: boolean = false; // flag que ajuda não criar vários de uma vez

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

    // Pré-carrega pin Amarelo
    this.load.image('pinAmareloImg', pinAmareloImg);

    // Pré-carrega pin Vermelho
    this.load.image('pinVermelhoImg', pinVermelhoImg);

    // Pré-carrega pin Azul
    this.load.image('pinAzulImg', pinAzulImg);

    // Pré-carrega a imagem de fundo do modal de acabar o jogo
    this.load.image('imagemFundoModal', telaPlacarImg);
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

    // Verifica se é hora de adicionar um novo pino e se o array ta
    // vazio para adicionar apenas um por vez
    // ainda verifica a flag de adicionandoPino e verifica se o jogo não acabou
    if (this.pinos.length === 0 && this.tempoProximoPino < this.time.now && this.adicionandoPino === false && this.vidas > 0) {
      this.adicionarPino();
      this.tempoProximoPino = this.time.now + this.intervaloEntrePinos;
    }

    // Chama a função que fica movendo os pinos
    this.movePinos();

     // Verifica a colisão entre o jogador e os pinos, coloquei aqui porque se eu colocasse
     // apenas no create, ele ia colidir apenas no primeiro, ele precisa ficar verificando
     this.physics.world.collide(this.jogador, this.pinos, this.colisaoPino, null, this);
  }

  // Essa função adiciona o pino
  private adicionarPino(): void {
    // Impede que outra chamada a essa função seja feita enquanto uma estiver em andamento
    if (this.adicionandoPino) {
      return;
    }

    // Vai iniciar a adição, então ele bloqueia caso tente adicionar outras
    // enquanto ele está adicionando uma
    this.adicionandoPino = true;

    // escolhe um lado para adicionar o pino e coloca as coordenadas x e y
    const lado = Phaser.Math.Between(0, 1); // 0 para esquerda, 1 para direita
    const x = lado === 0 ? 50 : this.sys.canvas.width - 50;
    const y = 0;
    // escolhe um dos pinos
    const tipoPino = Phaser.Math.Between(0, 2); // 0 para amarelo, 1 para vermelho, 2 para azul

    // adiciona as coordenadas e a imagem que escolheu
    const pino = this.physics.add.image(x, y, ['pinAmareloImg', 'pinVermelhoImg', 'pinAzulImg'][tipoPino]);
    pino.setVelocityY(-0.5 * this.bg.tilePositionY); // Define a mesma velocidade do fundo
    // adiciona na variavel
    this.pinos.push(pino);

    // Define um pequeno atraso antes de permitir outra chamada à função
    this.time.delayedCall(500, () => {
      this.adicionandoPino = false;
    }, [], this);
  }

  // Função que faz a logica de colisão com o jogador
  private colisaoPino(jogador: Phaser.Physics.Arcade.Sprite, pino: Phaser.Physics.Arcade.Image): void {
    pino.destroy(); // Remove o pino colidido
    this.pinos = this.pinos.filter(p => p !== pino); // Remove o pino do array de pinos

     // Incrementa a pontuação
     this.pontuacao++;
  }

  // Função que fica movendo os pinos na tela
  private movePinos(): void {
    // Move cada pino na tela
    this.pinos.forEach((pino, index) => {
      //pino.y += velocidadePinos;
      pino.setVelocityY(100);

      // Verifica se o pino tá fora da altura da tela
      // isso significa que o pino passou direto então
      // ele pode tirar dentro do array
      if (pino.y > this.sys.canvas.height) {
        pino.destroy(); // Remove o pino
        this.pinos.splice(index, 1); // Remove o pino do array
        // Perde uma vida, caso o marcador passe direto
        this.vidas--;

        // Verifica se todas as vidas foram perdidas
        if (this.vidas === 0) {
          // Exibe o modal com a pontuação final
          this.mostrarModal();
        }
      }
    });
  }

  private mostrarModal(): void {
    // Função de callback para reiniciar a fase
    const reiniciarFase = () => {
      // Reinicia as variáveis de pontuação e vidas
      this.pontuacao = 0;
      this.vidas = 3;

    // Remove todos os pinos restantes
      this.pinos.forEach(pino => pino.destroy());
      this.pinos = [];

      // Fecha o modal
      modal.destroy();
    };

    // Cria uma instância do modal e passa a pontuação final
    const modal = new Modal(this, this.pontuacao, reiniciarFase);
  }
}