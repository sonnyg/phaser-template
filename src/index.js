import './lib/phaser.min.js'
import config from './config.mjs'
import BootScene from './scenes/boot-scene.js'
import CreditsScene from './scenes/credits-scene.js'
import GameScene from './scenes/game-scene.js'
import OptionsScene from './scenes/options-scene.js'
import PreloaderScene from './scenes/preloader-scene.js'
import TitleScene from './scenes/title-scene.js'

class Game extends Phaser.Game {
    constructor(config) {
        super(config)

        // I don't like how the scene identifiers are duplicated. fix?
        this.scene.add('boot', BootScene)
        this.scene.add('preloader', PreloaderScene)
        this.scene.add('title', TitleScene)
        this.scene.add('options', OptionsScene)
        this.scene.add('credits', CreditsScene)
        this.scene.add('game', GameScene)

        this.scene.start('boot')
    }
}

window.game = new Game(config)