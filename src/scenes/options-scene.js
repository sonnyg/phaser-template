export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super('options')
    }

    create() {
        this.gameOrigin = { x: this.sys.game.config.width >> 1, y: this.sys.game.config.height >> 1 }
        this.musicOn = true
        this.soundOn = true

        this.text = this.add.text(300, 100, 'Options', { fontSize: 40 })
        this.musicButton = this.add.image(200, 200, 'checkedBox')
        this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 })

        this.soundButton = this.add.image(200, 300, 'checkedBox')
        this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 })

        this.musicButton.setInteractive()
        this.soundButton.setInteractive()

        this.musicButton.on('pointerdown', () => {
            this.musicOn = !this.musicOn
            this.updateAudio()
        }, this)

        this.soundButton.on('pointerdown', () => {
            this.soundOn = !this.soundOn
            this.updateAudio()
        }, this)

        this.updateAudio()

        const fillStyle = [0x88bb88, 0.85]
        this.fontStyle = { font: '24px monospace', fill: '#ffffff' }
        this.buttonGap = 50

            // , { fontSize: '32px', fill: '#fff' })
        // start game - background followed by text
        this.menuButton = this.add
            .rectangle(
                this.gameOrigin.x,
                this.gameOrigin.y + this.buttonGap * 4,
                180,
                30)
            .setFillStyle(...fillStyle)
            .setInteractive()

        this.menuText = this.add.text()
            .setStyle(this.fontStyle)
            .setText('Menu')

        Phaser.Display.Align.In.Center(this.menuText, this.menuButton)

        this.menuButton.data = {
            onOverStrokeStyle: [3, 0xEF8963, .85],
            onOutStrokeStyle: this.menuButton.strokeStyle || [0]
        }

        this.menuButton.on('pointerdown', pointer => {
            this.menuButton.data = undefined
            this.scene.start('title')
        }, this)

        this.input.on('gameobjectover', (pointer, gameObject) => {
            gameObject.setStrokeStyle(...gameObject.data.onOverStrokeStyle)

            if (gameObject.data?.tween) {
                gameObject.data.tween.stop()
            }
            gameObject.data.tween = this.tweens.add({
                targets: gameObject,
                scale: 1.2,
                duration: 500,
                ease: 'Power2',
            })
        }, this)

        this.input.on('gameobjectout', (pointer, gameObject) => {
            gameObject.setStrokeStyle(...gameObject.data.onOutStrokeStyle)

            if (gameObject.data?.tween) {
                gameObject.data.tween.stop()
            }
            gameObject.data.tween = this.tweens.add({
                targets: gameObject,
                scale: 1.0,
                duration: 500,
                ease: 'Power2',
            })
        })
    }

    updateAudio() {
        if (this.musicOn === false) {
            this.musicButton.setTexture('box')
        } else {
            this.musicButton.setTexture('checkedBox')
        }

        if (this.soundOn === false) {
            this.soundButton.setTexture('box')
        } else {
            this.soundButton.setTexture('checkedBox')
        }
    }
}