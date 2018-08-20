import Phaser from 'phaser'

export default class Boot extends Phaser.State {
  init () {
    this.stage.disableVisibilityChange = true
    this.scale.forceLandscape = true
  }

  create () {
    this.game.stage.backgroundColor = '#000'
    this.state.start('Load')
  }
}
