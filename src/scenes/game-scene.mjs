export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game')
    }

    create() {
        this.add.text(20, 20, 'Amazing game goes here', { 
            fontFamily: 'Roboto Condensed',
            fontSize: '32px',
            color: 'orange'
         })
    }
}