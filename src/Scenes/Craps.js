class Craps extends Phaser.Scene {
    constructor() {
        super("crapsScene");
    }



    preload() {
    }

    init() {

        // variables and settings
        this.bank = 1000;
        this.bet = 5;
        this.sum = 0;
        this.dice1 = 0;
        this.dice2 = 0;

        this.bankText = this.add.text(250, 100, `Bank: $${this.bank}`, { fontSize: '32px', fill: '#FFF' });

        this.roll = () => {
            // Generate random dice rolls
            this.dice1 = Phaser.Math.Between(1, 6);
            this.dice2 = Phaser.Math.Between(1, 6);
            this.sum = this.dice1 + this.dice2;
        };

        this.lose = () => {
            this.bank -= this.bet;
            this.bankText.setText(`Bank: $${this.bank}`);
        }

        this.win = () => {
            this.bank += this.bet;
            this.bankText.setText(`Bank: $${this.bank}`);
        }

    }

    create() {


        // Result text
        this.resultText = this.add.text(250, 500, "Press Enter to Roll!", { fontSize: '32px', fill: '#FFF' });
        //make an event listener for the enter key
        this.input.keyboard.on('keydown-ENTER', () => {
            // Generate random dice rolls
            this.roll();
            // Check if sum is 5
            if (this.sum === 7) {
                this.resultText.setText(`You rolled 7: Bonus Win!`);
                this.win();
            } else {
                this.resultText.setText(`You rolled ${this.sum}. Try again!`);
                this.lose();
            }
        });
    }

}