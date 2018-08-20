import Phaser from 'phaser'
import { createTransition } from 'phaser-state-transition'
import Player from '../sprites/Player'

export default class Play extends Phaser.State {
  create () {
    // SET TRANSITION
    this.stateTransition = createTransition({
      props: {
        y: game => game.height, alpha: 0.5
      }
    })
    // SET POINTS COUNTERS
    this.score = 0
    this.missingPoints = 0
    // SET PLAYER
    this.player = new Player({ game: this.game, x: 600, y: 720, asset: 'player' })
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE)
    this.game.camera.follow(this.player)
    this.player.body.collideWorldBounds = true
    this.addPlayerAnimations()
    // SET FALLING FOOD
    this.food = this.game.add.group()
    this.food.enableBody = true
    this.game.physics.enable(this.food, Phaser.Physics.ARCADE)
    var _this = this
    for (let i = 0; i < 64; i++) {
      (function (i) {
        setTimeout(function () {
          if (_this.state.callbackContext.key === 'Play') {
            _this.food.create((Math.floor((Math.random() * 1200) + 1)), 20, 'food', i, (i+1))
            _this.moveFood(_this.food.hash[i])
            _this.food.hash[i].checkWorldBounds = true
            _this.food.hash[i].events.onOutOfBounds.addOnce(_this.checkFallingFood, _this)
          }
        }, 1000*i)
      })(i)
    }
    // SET TEXT
    this.text = this.game.add.text(1050, 100, 'Score: ' + this.score, { font: "28px Arial", fill: "#fff", align: "center" })
    this.text.anchor.set(0.5)
    this.failedText = this.game.add.text(1000, 50, 'Missing points: ' + this.missingPoints, { font: "28px Arial", fill: "#fff", align: "center" })
    this.failedText.anchor.set(0.5)

    this.setEmitter()
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }
  update () {
    // UPDATE TEXT
    this.text.text  = 'Score: ' + this.score
    this.failedText.text  = 'Missing points: ' + this.missingPoints
    // SET COLLISIONS
    this.game.physics.arcade.collide(this.player, this.food, this.collideCallback, null, this)
    // SET PLAYER MOVES
    if (this.cursors.left.isDown) {
      this.player.moveTo = 'left'
    }
    else if (this.cursors.right.isDown) {
      this.player.moveTo = 'right'
    }
    else {
      this.player.moveTo = 'ahead'
    }
    this.animatePlayer()
  }
  addPlayerAnimations () {
    this.player.animations.add('left', [21, 22, 23, 24, 25], 10, true)
    this.player.animations.add('right', [15, 16, 17, 18, 19], 10, true)
    this.player.animations.add('ahead', [0, 1, 2, 3], 10, true)
  }
  animatePlayer () {
    if (this.player.moveTo === 'right') {
      this.player.animations.play('right')
      this.player.body.velocity.x += 10
    }
    else if (this.player.moveTo === 'left') {
      this.player.animations.play('left')
      this.player.body.velocity.x -= 10
    }
    else if (this.player.moveTo === 'ahead') {
      this.player.animations.play('ahead')
    }
  }
  collideCallback (player, food) {
    this.emitter.x = food.x
    this.emitter.y = food.y
    this.emitter.start(true, 500, null, 20)
    food.kill()
    this.score++
  }
  moveFood (item) {
    item.body.velocity.y = 100
  }
  checkFallingFood (item) {
    item.kill()
    this.missingPoints += 1
    if (this.missingPoints > 9) {
      this.gameOver()
    }
  }
  setEmitter () {
    this.emitter = this.game.add.emitter(0, 0, 100)
    this.emitter.makeParticles('food', 16, 16)
    this.emitter.gravity = 200
  }
  gameOver () {
    this.state.start('Lose', this.stateTransition)
  }
}