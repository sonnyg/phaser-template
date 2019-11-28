import './lib/phaser.min.mjs'
import config from './config.mjs'
import BootScene from './scenes/boot-scene.mjs'
import CreditsScene from './scenes/credits-scene.mjs'
import GameScene from './scenes/game-scene.mjs'
import OptionsScene from './scenes/options-scene.mjs'
import PreloaderScene from './scenes/preloader-scene.mjs'
import TitleScene from './scenes/title-scene.mjs'

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

        this.scene.start('game')
    }
}

window.game = new Game(config)