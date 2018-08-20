import Phaser from 'phaser'

export default class Load extends Phaser.State {
  preload () {
    this.game.load.spritesheet('player','assets/img/knight.png', 84, 84)
    this.game.load.spritesheet('food','assets/img/food.png', 16, 16)
  }
  create () {
    this.state.start('Menu')
  }
}
