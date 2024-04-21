import 'phaser';
import { BootScene } from '@scenes/BootScene';
import { TelaInicial } from '@scenes/TelaInicial';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const cfg: Phaser.Types.Core.GameConfig = {
    width: '100%',
    height: '100%',
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, TelaInicial],
    input: {
      keyboard: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 1000,
        },
        debug: false,
      },
    },
    backgroundColor: '#000',
    render: {
      pixelArt: true,
      antialias: false,
    },
  };

  const game = new Game(cfg);
});
