import telaPlacarImg from '@assets/telaPlacar/telaPlacar.png';
import fundoFaseImg from '@assets/telaFase/fundoFase.png';
import djLiveryImg from '@assets/telaFase/djlivery.png';
import pinAmareloImg from '@assets/telaFase/colisao/pinamarelo.png';
import pinVermelhoImg from '@assets/telaFase/colisao/pinvermelho.png';
import pinAzulImg from '@assets/telaFase/colisao/pinazul.png';
import carroImg from '@assets/telaFase/colisao/carro.png';

import cachorroImg from '@assets/telaFase/colisao/cachorro.png';
import criancaImg from '@assets/telaFase/colisao/crianca.png';
import idosoImg from '@assets/telaFase/colisao/idoso.png';
import maeImg from '@assets/telaFase/colisao/mae.png';

import placarImg from '@assets/telaFase/placar.png';
import coracaoImg from '@assets/telaFase/coracao.png';

import { Modal } from '@objects/Modal';

export class Fase extends Phaser.Scene {
  private jogador: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private bg!: Phaser.GameObjects.TileSprite;
  private pontuacao: number = 0; // Variável para contar a pontuação do jogador
  private vidas: number = 3; // Variável que conta as vidas do jogador
  private carros: Phaser.Physics.Arcade.Image[] = []; // guarda os carros

  private pinos: Phaser.Physics.Arcade.Image[] = [];
  private tempoProximoPino: number = 0;
  private intervaloEntrePinos: number = 5000; // Intervalo em milissegundos para aparecer o próximo pino
  private adicionandoPino: boolean = false; // flag que ajuda não criar vários de uma vez

  private elementos: Phaser.Physics.Arcade.Image[] = []; // Declaração da variável elementos de colisão
  private adicionandoElemento: boolean = false; // flag que ajuda não criar vários de uma vez 
  private posicoesX: number[] = [];

  private textoPontuacao!: Phaser.GameObjects.Text; // Texto da pontuação
  // Declare uma variável para armazenar as referências dos corações
  private coracoes: Phaser.GameObjects.Image[] = [];


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
    this.posicoesX = [0.13  * this.sys.canvas.width, 0.3  * this.sys.canvas.width, 0.73  * this.sys.canvas.width, 0.88  * this.sys.canvas.width];

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
  
    const placar = this.add.image((larguraTela / 2) - 85, 0, 'placarImg');
    placar.setOrigin(0);

    // Cria e exibe o texto da pontuação
    this.textoPontuacao = this.add.text((larguraTela / 2) - 16, 18, `${this.pontuacao}`, { fontSize: '20px', color: '#000' });
    this.textoPontuacao.setOrigin(0.5, 0); // Define a origem do texto para centralizar horizontalmente

    // Cria os coracoes do placar
    this.criarCoracoes();

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
    this.load.spritesheet('djLivery', djLiveryImg, { frameWidth: 55, frameHeight: 90});

    // Pré-carrega a imagem de fundo
    this.load.image('background', fundoFaseImg);

    // Pré-carrega pin Amarelo
    this.load.image('pinAmareloImg', pinAmareloImg);

    // Pré-carrega pin Vermelho
    this.load.image('pinVermelhoImg', pinVermelhoImg);

    // Pré-carrega pin Azul
    this.load.image('pinAzulImg', pinAzulImg);

    // Pré-carrega a imagem de fundo do modal de acabar o jogo
    this.load.image('imagemFundoModal', telaPlacarImg);

    // Pré-carrega a imagem do carro
    this.load.image('carroImg', carroImg);

    // Pré-carrega a imagem do cachorro
    this.load.image('cachorroImg', cachorroImg);

    // Pré-carrega a imagem do crianca
    this.load.image('criancaImg', criancaImg);

    // Pré-carrega a imagem do idoso
    this.load.image('idosoImg', idosoImg);

    // Pré-carrega a imagem do mãe
    this.load.image('maeImg', maeImg);

    // Pré-carrega a imagem do placar
    this.load.image('placarImg', placarImg);

    // Pré-carrega a imagem do coracao que serao as vidas
    this.load.image('coracaoImg', coracaoImg);
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

     // Adicionando carros, no maximo dois quando ele ja tiver entregue 3 e nao ter 
     // zerado a vida
     if (
      this.carros.length < 2 
      && this.pontuacao >= 3 
      && this.vidas > 0
    ) {
        // faz a logica para ver e qual lado vai nascer os carros da pista
        let x;
        if (this.carros.length === 1) {
          x = this.carros[0].x === this.sys.canvas.width * 0.43 ? this.sys.canvas.width * 0.60 : this.sys.canvas.width * 0.43
        } else {
          x = this.sys.canvas.width * 0.60;
        }
        const y = this.sys.canvas.height;

        const carro = this.physics.add.image(x, y, 'carroImg');
        this.carros.push(carro);
     }

    // Move os carros na tela e verifica colisões
    this.moveCarros();
    this.physics.world.collide(this.jogador, this.carros, this.colisaoCarro, null, this);

    // Atualiza o movimento do jogador
    this.updatePlayerMovement();

    // Adiciona um novo colisor se o array estiver vazio e a vida do jogador for maior que zero
   if (this.pontuacao > 7 && this.elementos.length < 4 && this.vidas > 0 && this.posicoesX.length > 0) {
    this.adicionarElemento();
   }

    // Move os elementos na tela
    this.moveElementos();

    // Verifica a colisão entre o jogador e os elementos
    this.physics.world.collide(this.jogador, this.elementos, this.colisaoElemento, null, this);

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

  // Adicionar os colisores
  private adicionarElemento(): void {
    // Impede que outra chamada a esse método seja feita enquanto uma estiver em andamento
    if (this.adicionandoElemento) {
      return;
    }
  
    // Inicia a adição do elemento
    this.adicionandoElemento = true;
  
    // Escolhe aleatoriamente o tipo de elemento a ser adicionado
    const tipoElemento = Phaser.Math.Between(0, 3); // 0 para cachorro, 1 para idoso, 2 para criança, 3 para mãe
  
    // Escolhe aleatoriamente a posicao x do elemento
    const tipoPosicaoX = Phaser.Math.Between(0, (this.posicoesX.length - 1));

    const posicaoX = this.posicoesX[tipoPosicaoX];
    this.posicoesX.splice(tipoPosicaoX, 1);
  
    // Adiciona o elemento na tela de acordo com o tipo escolhido
    const elemento = this.physics.add.image(posicaoX, 0, ['cachorroImg', 'idosoImg', 'criancaImg', 'maeImg'][tipoElemento]);
    elemento.setVelocityY(-0.5 * this.bg.tilePositionY); // Define a mesma velocidade do fundo
  
    // Adiciona o elemento ao array de elementos
    this.elementos.push(elemento);
  
    // Define um pequeno atraso antes de permitir outra chamada ao método
    this.time.delayedCall(500, () => {
      this.adicionandoElemento = false;
    }, [], this);
  }
  

  // Função que faz a logica de colisão com o jogador
  private colisaoPino(jogador: Phaser.Physics.Arcade.Sprite, pino: Phaser.Physics.Arcade.Image): void {
    pino.destroy(); // Remove o pino colidido
    this.pinos = this.pinos.filter(p => p !== pino); // Remove o pino do array de pinos

     // Incrementa a pontuação
     this.pontuacao++;
     this.textoPontuacao.setText(`${this.pontuacao}`);
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
        this.atualizarPlacarVidas();

        // Verifica se todas as vidas foram perdidas
        if (this.vidas === 0) {
          // Exibe o modal com a pontuação final
          this.mostrarModal();
        }
      }
    });
  }

  private colisaoElemento(jogador: Phaser.Physics.Arcade.Sprite, elemento: Phaser.Physics.Arcade.Image): void {
    elemento.setVelocity(0);

    // Desativa o corpo do elemento
    elemento.body.enable = false;

    // Salva a posição e a velocidade original do elemento
    const originalPosition = { x: elemento.x, y: elemento.y };
    const originalVelocity = { x: elemento.body.velocity.x, y: elemento.body.velocity.y };
  
    // Decrementa uma vida do jogador
    this.vidas--;
    this.atualizarPlacarVidas();
    
    // Configura um temporizador para reativar a colisão após 3 segundos
    this.time.delayedCall(3000, () => {
      if (elemento.body instanceof Phaser.Physics.Arcade.Body) {
        // Restaura a posição original do elemento
        elemento.setPosition(originalPosition.x, originalPosition.y);

        // Restaura a velocidade original do elemento
        elemento.setVelocity(originalVelocity.x, originalVelocity.y);

        // Depois de 3 segundos, reativa o corpo do carro
        elemento.body.enable = true;
      }
   }, [], this);

  // Configura um temporizador para fazer o jogador piscar durante o período de colisão
   const timer = this.time.addEvent({
       delay: 50, // tempo entre cada piscada
       callback: () => {
           // Alterna a visibilidade do elemento
           elemento.visible = !elemento.visible;
       },
       callbackScope: this,
       repeat: 5000 // número de piscadas
   });

  // Configura um temporizador para parar o efeito de piscar e restaurar a visibilidade do jogador
  this.time.delayedCall(3000, () => {
      // Cancela o temporizador de piscar e restaura a visibilidade do jogador
      timer.remove(false);
      elemento.visible = true;
  }, [], this);

    // Verifica se o jogador ainda tem vidas
    if (this.vidas === 0) {
      // Exibe o modal com a pontuação final
      this.mostrarModal();
    }
  }  

  // Função que move os carros
  private moveCarros(): void {
    // Move cada carro na tela
    this.carros.forEach((carro, index) => {
      // Coloca velocidade diferentes para os veículos
      if (index !== 0) {
        carro.setVelocityY(-200);
      } else {
        carro.setVelocityY(-100);
      }
        // Verifica se o carro saiu da tela, remove-o do array nesse caso
        if (carro.y < -carro.height) {
            carro.destroy();
            this.carros.splice(index, 1);
        }
    });
  }

  private moveElementos(): void {
    // Move cada colisor na tela
    this.elementos.forEach((elemento, index) => {
      const velocidade = Phaser.Math.Between(Phaser.Math.Between(100, 200), 300);
      elemento.setVelocityY(velocidade); // Movimento constante para baixo
  
      // Verifica se o elemento saiu da tela
      if (elemento.y > this.sys.canvas.height) {
        const posicaoXOriginal = elemento.x;
        this.posicoesX.push(posicaoXOriginal);
        elemento.destroy(); // Remove o elemento
        this.elementos.splice(index, 1); // Remove o elemento do array
      }
    });
  }

  // Colisão jogador e carro
  private colisaoCarro(jogador: Phaser.Physics.Arcade.Sprite, carro: Phaser.Physics.Arcade.Image): void {
    // Decrementa uma vida
    this.vidas--;
    this.atualizarPlacarVidas();
    // Retira a velocidade do carro, para ele não sofrer com a inércia
    carro.setVelocity(0);

    // Desativa o corpo do carro
    carro.body.enable = false;

     // Salva a posição e a velocidade original do carro
     const originalPosition = { x: carro.x, y: carro.y };
     const originalVelocity = { x: carro.body.velocity.x, y: carro.body.velocity.y };

    // Configura um temporizador para reativar a colisão após 3 segundos
    this.time.delayedCall(3000, () => {
        if (carro.body instanceof Phaser.Physics.Arcade.Body) {
          // Restaura a posição original do carro
          carro.setPosition(originalPosition.x, originalPosition.y);

          // Restaura a velocidade original do carro
          carro.setVelocity(originalVelocity.x, originalVelocity.y);

          // Depois de 3 segundos, reativa o corpo do carro
          carro.body.enable = true;
        }
    }, [], this);

    // Configura um temporizador para fazer o jogador piscar durante o período de colisão
    const timer = this.time.addEvent({
        delay: 50, // tempo entre cada piscada
        callback: () => {
            // Alterna a visibilidade do carro
            carro.visible = !carro.visible;
        },
        callbackScope: this,
        repeat: 5000 // número de piscadas
    });

    // Configura um temporizador para parar o efeito de piscar e restaurar a visibilidade do jogador
    this.time.delayedCall(3000, () => {
        // Cancela o temporizador de piscar e restaura a visibilidade do jogador
        timer.remove(false);
        carro.visible = true;
    }, [], this);

    // Verifica se todas as vidas foram perdidas
    if (this.vidas === 0) {
        // Exibe o modal com a pontuação final
        this.mostrarModal();
    }
}

private atualizarPlacarVidas(): void {
  // Remove todos os corações existentes no placar
  this.removerCoracoes();
  // Cria os novos corações
  this.criarCoracoes();
}

private criarCoracoes(): void {
  // Cria os corações atualizados
  const coracaoSpacing = 20; // Espaçamento entre os corações
  for (let i = 0; i < this.vidas; i++) {
    const coracao = this.add.image((this.sys.canvas.width / 2 + coracaoSpacing * i) + 40, 30, 'coracaoImg');
    // Adicione a referência do coração ao array
    this.coracoes.push(coracao);
  }
}

// Função para remover os corações existentes do placar
private removerCoracoes(): void {
  this.coracoes.forEach(coracao => coracao.destroy());
  // Limpe o array de referências dos corações
  this.coracoes = [];
}

  // Atualiza o movimento dos jogadores
  private updatePlayerMovement(): void {
    // Verifica se a colisão do jogador com o carro está ativa
        // Atualiza o movimento do jogador apenas se a colisão estiver ativada
        if (this.cursors.left.isDown) {
            this.jogador.setVelocityX(-300);
            this.jogador.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.jogador.setVelocityX(300);
            this.jogador.anims.play('right', true);
        } else {
            this.jogador.setVelocityX(0);
            this.jogador.anims.play('turn');
        }

        if (this.cursors.up.isDown) {
            this.jogador.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.jogador.setVelocityY(300);
        } else {
            this.jogador.setVelocityY(0);
        }
}

  private mostrarModal(): void {
    // Função de callback para reiniciar a fase
    const reiniciarFase = () => {
      // Reinicia as variáveis de pontuação e vidas
      this.pontuacao = 0;
      this.vidas = 3;
      this.textoPontuacao.setText(`${this.pontuacao}`);
      this.criarCoracoes();

      // Volta o jogador para o estado inicial quando reiniciar a fase
      this.jogador.visible = true;
      this.jogador.setPosition(this.sys.canvas.width / 2,  this.sys.canvas.height / 2);

      // Remove todos os pinos restantes
      this.pinos.forEach(pino => pino.destroy());
      this.pinos = [];

      // Remove todos os carros restantes
      this.carros.forEach(carro => carro.destroy());
      this.carros = [];

      // Remove todos os elementos restantes
      this.elementos.forEach(elemento => elemento.destroy());
      this.elementos = [];

      this.posicoesX = [0.13  * this.sys.canvas.width, 0.3  * this.sys.canvas.width, 0.73  * this.sys.canvas.width, 0.88  * this.sys.canvas.width];

      // Fecha o modal
      modal.destroy();
    };

    // Cria uma instância do modal e passa a pontuação final
    const modal = new Modal(this, this.pontuacao, reiniciarFase);
  }
}