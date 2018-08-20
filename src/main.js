import 'pixi'
import 'p2'
import Phaser from 'phaser'

import Boot from './states/Boot'
import Load from './states/Load'
import Play from './states/Play'
import Menu from './states/Menu'
import Win from './states/Win'
import Lose from './states/Lose'

class Game extends Phaser.Game {
  constructor () {
    super(1200, 720, Phaser.AUTO, '')

    this.state.add('Boot', Boot)
    this.state.add('Win', Win)
    this.state.add('Lose', Lose)
    this.state.add('Load', Load)
    this.state.add('Play', Play)
    this.state.add('Menu', Menu)

    this.state.start('Boot')
  }
}

window.demo = new Game()
