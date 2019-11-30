/**
 * The BootScene is responsible for loading any assets required by the preloader. I would 
 * suggest keeping this file 'lean', and let the PreloaderScene do the heavy lifting.
 */
export default class BootScene extends Phaser.Scene {
    constructor() {
        super('boot')
    }

    preload() {
        this.load.image('logo', 'assets/logo.png')
    }

    create() {
        this.scene.start('preloader')
    }
}
