import Phaser from 'phaser'
import { createTransition } from 'phaser-state-transition'

export default class Menu extends Phaser.State {
  create () {
    this.EnteringTransition = createTransition({props: {alpha: 0.5}})
    this.add.text(100, 100, 'Game over! Press space to restart game', {fill: '#fff'})
    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.spaceKey.onDown.add(this.startGame, this)
  }
  startGame () {
    window.location.reload(true)
  }
}