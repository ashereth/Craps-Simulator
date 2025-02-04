class Craps extends Phaser.Scene {
    constructor() {
        super("crapsScene");
    }



    preload() {
    }

    init() {

        //add text to the screen describing the game and how to play
        this.add.text(250, 50, "Welcome to Craps!\nLeft click to place bets and right click to clear bets.\nIf you run out of money refresh the page.", { fontSize: '32px', fill: '#FFF' });

        // variables and settings
        this.bank = 1000;
        this.bets = [0, 0, 0, 0, 0, 0];
        this.sum = 0;
        this.dice1 = 0;
        this.dice2 = 0;


        this.bankText = this.add.text(250, 150, `Bank: $${this.bank}`, { fontSize: '64px', fill: '#FFF' });

        this.roll = () => {
            // Generate random dice rolls
            this.dice1 = Phaser.Math.Between(1, 6);
            this.dice2 = Phaser.Math.Between(1, 6);
            this.sum = this.dice1 + this.dice2;
        };

        this.lose = () => {
            if (this.bank === 0){
                this.bankText.setText(`Bank: $${this.bank}. You have no money left! Refesh to restart!`);
            }
            this.bets = [0, 0, 0, 0, 0, 0];
            this.bankText.setText(`Bank: $${this.bank}`);
            this.bet4.setText("Amount bet on 4 = " + this.bets[0]);
            this.bet5.setText("Amount bet on 5 = " + this.bets[1]);
            this.bet6.setText("Amount bet on 6 = " + this.bets[2]);
            this.bet8.setText("Amount bet on 8 = " + this.bets[3]);
            this.bet9.setText("Amount bet on 9 = " + this.bets[4]);
            this.bet10.setText("Amount bet on 10 = " + this.bets[5]);
        }

        this.win = (numberRolled) => {
            console.log(numberRolled);
            if (numberRolled === 4 && this.bets[0] > 0) {
                this.bank += Math.ceil(this.bets[0] * (4 / 5));
            } else if (numberRolled === 5 && this.bets[1] > 0) {
                this.bank += Math.ceil(this.bets[1] * (2 / 5));
            } else if (numberRolled === 6 && this.bets[2] > 0) {
                this.bank += Math.ceil(this.bets[2] * (1 / 6));
            } else if (numberRolled === 8 && this.bets[3] > 0) {
                this.bank += Math.ceil(this.bets[3] * (1 / 6));
            } else if (numberRolled === 9 && this.bets[4] > 0) {
                this.bank += Math.ceil(this.bets[4] * (2 / 5));
            } else if (numberRolled === 10 && this.bets[5] > 0) {
                this.bank += Math.ceil(this.bets[5] * (4 / 5));
            }
            //update the bank text
            this.bankText.setText(`Bank: $${this.bank}`);
        }

        this.bet = (amount, number) => {
            if (this.bank < amount) {
                this.bets[number] += this.bank;
                this.bank = 0;
            }else {
                this.bets[number] += amount;
            this.bank -= amount;
            }
            
            this.bankText.setText(`Bank: $${this.bank}`);
            if (number === 0) {
                this.bet4.setText("Amount bet on 4 = " + this.bets[0]);
            } else if (number === 1) {
                this.bet5.setText("Amount bet on 5 = " + this.bets[1]);
            } else if (number === 2) {
                this.bet6.setText("Amount bet on 6 = " + this.bets[2]);
            } else if (number === 3) {
                this.bet8.setText("Amount bet on 8 = " + this.bets[3]);
            } else if (number === 4) {
                this.bet9.setText("Amount bet on 9 = " + this.bets[4]);
            } else if (number === 5) {
                this.bet10.setText("Amount bet on 10 = " + this.bets[5]);
            }
        }

        this.clearBet = (index) => {
            if (index === 0 && this.bets[0] > 0) {
                this.bank += this.bets[0];
                this.bets[0] = 0;
            } else if (index === 1 && this.bets[1] > 0) {
                this.bank += this.bets[1];
                this.bets[1] = 0;
            } else if (index === 2 && this.bets[2] > 0) {
                this.bank += this.bets[2];
                this.bets[2] = 0;
            } else if (index === 3 && this.bets[3] > 0) {
                this.bank += this.bets[3];
                this.bets[3] = 0;
            } else if (index === 4 && this.bets[4] > 0) {
                this.bank += this.bets[4];
                this.bets[4] = 0;
            } else if (index === 5 && this.bets[5] > 0) {
                this.bank += this.bets[5];
                this.bets[5] = 0;
            }
            //update the bank text
            this.bankText.setText(`Bank: $${this.bank}`);
        }

    }

    create() {


        // Result text
        this.resultText = this.add.text(250, 550, "Press Enter to Roll!", { fontSize: '32px', fill: '#FFF' });
        //make an event listener for the enter key
        this.input.keyboard.on('keydown-ENTER', () => {
            // Generate random dice rolls
            this.roll();
            // Check if sum is 5
            if (this.sum === 7) {
                this.resultText.setText(`You rolled 7! Place your bets!`);
                this.lose();
            } else {
                this.resultText.setText(`You rolled ${this.sum}.`);
                this.win(this.sum);
            }
        });

        this.input.mouse.disableContextMenu(); // Prevent right-click menu

        // Create bet texts first
        this.bet4 = this.add.text(250, 220, "Amount bet on 4 = 0", { fontSize: '32px', fill: '#FFF' });
        this.bet5 = this.add.text(250, 270, "Amount bet on 5 = 0", { fontSize: '32px', fill: '#FFF' });
        this.bet6 = this.add.text(250, 320, "Amount bet on 6 = 0", { fontSize: '32px', fill: '#FFF' });
        this.bet8 = this.add.text(250, 370, "Amount bet on 8 = 0", { fontSize: '32px', fill: '#FFF' });
        this.bet9 = this.add.text(250, 420, "Amount bet on 9 = 0", { fontSize: '32px', fill: '#FFF' });
        this.bet10 = this.add.text(250, 470, "Amount bet on 10 = 0", { fontSize: '32px', fill: '#FFF' });

        // Store references to the text objects
        const betTexts = [this.bet4, this.bet5, this.bet6, this.bet8, this.bet9, this.bet10];

        // Attach event listeners
        betTexts.forEach((betText, index) => {
            betText.setInteractive();
            betText.on('pointerdown', (pointer) => {
                if (pointer.button === 0) { // Left-click to place a bet
                    this.bet(100, index);
                } else if (pointer.button === 2) { // Right-click to clear the bet
                    this.clearBet(index);
                }
                betText.setText(`Amount bet on ${index + 4} = ${this.bets[index]}`);
            });
        });



    }

}