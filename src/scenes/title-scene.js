export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('title')
    }

    init() {
        this.mainTheme = this.sound.add('main-theme', { volume: 0.5, loop: true });
        // this.mainTheme.play();
    }

    create() {
        // very simple menu
        this.gameOrigin = { x: this.sys.game.config.width >> 1, y: this.sys.game.config.height >> 1 }
        this.fontStyle = { font: '24px monospace', fill: '#ffffff' }
        this.buttonGap = 50;

        const fillStyle = [0x88bb88, 0.85]

        // this.add.image(140, 140, 'logo')
        this.mainMenuText = this.add.text()
            // move 'up' by 3x gap
            .setPosition(this.gameOrigin.x, this.gameOrigin.y - this.buttonGap * 3)
            .setOrigin(0.5, 0.5)
            .setStyle(this.fontStyle)
            .setText('Main Menu')

        // start game - background followed by text
        this.startGameButton = this.add
            .rectangle(
                this.gameOrigin.x,
                this.gameOrigin.y,
                180,
                30)
            .setFillStyle(...fillStyle)
            .setInteractive()

        this.startGameText = this.add.text()
            .setStyle(this.fontStyle)
            .setText('Start Game')
            // .setInteractive()

        this.centerAlignGameObjects(this.startGameText, this.startGameButton)
        // let startGameGroup = this.add.group()
        // startGameGroup.addMultiple(this.startGameButton, this.startGameText)
        //     .setTint(0xbbbbbb)
        // console.log(startGameGroup)
        // options
        this.optionsButton = this.add
            .rectangle(
                this.startGameButton.x,
                this.startGameButton.y + this.buttonGap,
                180,
                30)
            .setFillStyle(...fillStyle)
            .setInteractive()

        this.optionsText = this.add.text()
            .setStyle(this.fontStyle)
            .setText('Options')

        this.centerAlignGameObjects(this.optionsText, this.optionsButton)

        // credits
        this.creditsButton = this.add
            .rectangle(
                this.optionsButton.x,
                this.optionsButton.y + this.buttonGap,
                180,
                30)
            .setFillStyle(...fillStyle)
            .setInteractive()

        this.creditsText = this.add.text()
            .setStyle(this.fontStyle)
            .setText('Credits')

        this.centerAlignGameObjects(this.creditsText, this.creditsButton)
        // var hsv = Phaser.Display.Color.HSVColorWheel();

        const buttons = [this.startGameButton, this.optionsButton, this.creditsButton]

        // add event handling for the buttons
        // buttons.forEach(button => {
        //     button.on('pointerover', event => {
        //         console.log(button)
        //         // button.setTint(0xbbbbbb)
        //         // console.log(`tint before: ${button.tint}`)
        //         // button.tint = 0xbbbbbb
        //         // console.log(`tint after: ${button.tint}`)
        //     })
        //     // button.on('pointerout', event => console.log(button))
        //     // button.on('pointerdown', event => console.log(button))
        // }, this)

        // set data on all buttons, including tweens to handle mouse interactions. Executing these causes the 'scale' to
        // momentarily be set to '0'. Not sure why.
        buttons.forEach(button => {
            button.data = {
                onOverStrokeStyle: [3, 0xEF8963, .85],
                onOutStrokeStyle: button.strokeStyle || [0]
                // ,
                // onOverTween: this.tweens.create({
                //     targets: button,
                //     scale: 1.2,
                //     duration: 500,
                //     ease: 'Power2',
                // }),
                // onOutTween: this.tweens.create({
                //     targets: button,
                //     scale: 1.0,
                //     duration: 500,
                //     ease: 'Power2',
                // })
            }

            console.log(button.data)
        }, this)

        // console.log(this.tweens)
        this.input.on('gameobjectover', function (pointer, gameObject) {
            // console.log(gameObject)
            gameObject.setStrokeStyle(...gameObject.data.onOverStrokeStyle)
            // gameObject.data.onOutTween.stop()
            // gameObject.data.onOverTween.play()

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

        this.input.on('gameobjectout', function (pointer, gameObject) {
            // console.log(gameObject)
            gameObject.setStrokeStyle(...gameObject.data.onOutStrokeStyle)
            // gameObject.data.onOverTween.stop()
            // gameObject.data.onOutTween.play()

            if (gameObject.data?.tween) {
                gameObject.data.tween.stop()
            }
            gameObject.data.tween = this.tweens.add({
                    targets: gameObject,
                    scale: 1.0,
                    duration: 500,
                    ease: 'Power2',
                })
        }, this)
    }

    centerAlignGameObjects (gameObject1, gameObject2) {
        Phaser.Display.Align.In.Center(
            gameObject1,
            gameObject2
        );
    }
}