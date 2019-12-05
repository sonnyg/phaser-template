export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        const gameOrigin = { x: this.sys.game.config.width >> 1, y: this.sys.game.config.height >> 1 }

        this.add.image(gameOrigin.x, gameOrigin.y, 'logo')
    }
}