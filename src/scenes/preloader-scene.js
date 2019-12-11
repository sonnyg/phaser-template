/**
 * The PreloaderScene is responsible for loading game assets and displaying a progress bar. This
 * scene is most likely the first one the user will see.
 */
export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    init() {
        this.checkAssetsDelay = 250

        this.gameOrigin = { x: this.sys.game.config.width >> 1, y: this.sys.game.config.height >> 1 }
        this.fontStyle = { font: '18px monospace', fill: '#ffffff' }
        
        this.loadingText = this.add.text()
            .setPosition(this.gameOrigin.x, this.gameOrigin.y)
            .setOrigin(0.5, 0.5)
            .setStyle(this.fontStyle)
            .setText('...')
    }

    preload() {
        this.add.image(this.gameOrigin.x, 140, 'logo')

        // console.log(Phaser.Loader.Events)
        // Object.values(Phaser.Loader.Events).forEach(name => this.load.on(name, event => console.log(name, event)))

        // this.add.circle(this.gameOrigin.x, this.gameOrigin.y, 10, 0xdd44b7)

        this.load.on(Phaser.Loader.Events.START, this.showLoading, this)

        this.load.on(Phaser.Loader.Events.COMPLETE, () => {
            this.loadingText.setText('hit any key to continue')

            // support either a key input, or pointer event
            this.input.keyboard.on('keydown', event => this.scene.start('title-scene'))
            this.input.on('pointerdown', event => this.scene.start('title-scene'))
        })
    
        this.time.delayedCall(this.checkAssetsDelay, () => {
            // if no files to load, move on
            if (this.load.totalToLoad < 1) {
                this.load.emit(Phaser.Loader.Events.COMPLETE)
            }
        }, [], this)

        // add a small 'pulse' effect to the loading text
        this.tweens.add({
            targets: this.loadingText,
            alpha: 0.2,
            duration: 1500,
            ease: 'Linear',
            yoyo: true,
            loop: -1
        })

        // load assets needed in our game
        // this.load.image('key', 'asset/location...')
    }

    showLoading() {
        const progressProperties = {
            width: 400,
            height: 30,
            x: this.gameOrigin.x,
            y: this.gameOrigin.y + 60,
            fill: 0x88bb88,
            stroke: 0x777777,
            borderWidth: 3
        }

        let progressBorder = this.add
            .rectangle(
                progressProperties.x, 
                progressProperties.y, 
                progressProperties.width + progressProperties.borderWidth, 
                progressProperties.height + progressProperties.borderWidth)
            .setFillStyle(progressProperties.fill, 0.15)
            .setStrokeStyle(progressProperties.borderWidth, progressProperties.stroke, 1)

        let progressBar = this.add
            .rectangle(
                progressProperties.x, 
                progressProperties.y, 
                0, 
                progressProperties.height)
            .setFillStyle(progressProperties.fill, 1)

        // there is an issue with the placement of the rect when the width is 0, but changed later
        progressBar.x = this.gameOrigin.x - (progressProperties.width >> 1)

        this.loadingText.setText('Loading...')

        let percentText = this.add.text()
            .setPosition(progressProperties.x, progressProperties.y)
            .setOrigin(0.5, 0.5)
            .setStyle(this.fontStyle)
            .setText('0%')
        
        let assetText = this.add.text()
            .setPosition(progressProperties.x, progressProperties.y + progressProperties.height + 15)
            .setOrigin(0.5, 0.5)
            .setStyle(this.fontStyle)
            .setText('asset...')

        // update progress bar
        this.load.on(Phaser.Loader.Events.PROGRESS, (value) => {
            percentText.setText(`${parseInt(value * 100)}%`)
            progressBar.width = value * progressProperties.width
        })

        // // update file progress text
        this.load.on(Phaser.Loader.Events.FILE_LOAD, (file) => {
            assetText.setText(`Loading ${file.type}: ${file.key}`)
        })
        
        // remove progress bar when complete
        this.load.on(Phaser.Loader.Events.COMPLETE, () => {
            progressBar.destroy()
            progressBorder.destroy()
            percentText.destroy()
            assetText.destroy()
        })
    }
}
