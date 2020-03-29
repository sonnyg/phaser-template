export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('credits')
    }

    create() {
        this.gameOrigin = { x: this.sys.game.config.width >> 1, y: this.sys.game.config.height >> 1 }
        this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' })
        this.madeByText = this.add.text(0, 0, 'Created By: Placeholder', { fontSize: '26px', fill: '#fff' })
        this.zone = this.add.zone(this.gameOrigin.x, this.gameOrigin.y, this.sys.game.config.width, this.sys.game.config.height)

        Phaser.Display.Align.In.Center(
            this.creditsText,
            this.zone
        )

        Phaser.Display.Align.In.Center(
            this.madeByText,
            this.zone
        )

        // move off screen so it can scroll into view later
        this.madeByText.setY(1000)
    }
}