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

    }

    create() {
            // Display dice images
            this.dice1 = this.add.image(300, 250, 'dice1').setScale(0.5);
            this.dice2 = this.add.image(500, 250, 'dice1').setScale(0.5);
    
            // Roll button
            this.rollButton = this.add.image(400, 400, 'button').setInteractive();
    
            // Result text
            this.resultText = this.add.text(250, 500, "Click to Roll!", { fontSize: '32px', fill: '#FFF' });
    
            // Add event listener to roll dice
            this.rollButton.on('pointerdown', this.rollDice, this);
        }

    update() {
         // Generate random dice rolls
         let roll1 = Phaser.Math.Between(1, 6);
         let roll2 = Phaser.Math.Between(1, 6);
         let sum = roll1 + roll2;
 
         // Update dice images
         this.dice1.setTexture(`dice${roll1}`);
         this.dice2.setTexture(`dice${roll2}`);
 
         // Check if sum is 5
         if (sum === 5) {
             this.resultText.setText(`You rolled 5: Bonus Win!`);
             this.bank += this.bet * 2; // Example: Winning doubles the bet
         } else {
             this.resultText.setText(`You rolled ${sum}. Try again!`);
         }
    }
}