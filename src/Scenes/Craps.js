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
            if (this.bank === 0) {
                this.bankText.setText(`Bank: $${this.bank}. You have no money left! Refesh to restart!`);
            }
            this.bets = [0, 0, 0, 0, 0, 0];
            this.bankText.setText(`Bank: $${this.bank}`);
            this.bet4.setText("  4\nBet: " + this.bets[0]);
            this.bet5.setText("  5\nBet: " + this.bets[1]);
            this.bet6.setText("  6\nBet: " + this.bets[2]);
            this.bet8.setText("  8\nBet: " + this.bets[3]);
            this.bet9.setText("  9\nBet: " + this.bets[4]);
            this.bet10.setText("  10\nBet: " + this.bets[5]);
        }

        this.win = (numberRolled) => {
            console.log(numberRolled);
            if (numberRolled === 4 && this.bets[0] > 0) {
                this.bank += Math.ceil(this.bets[0] * (9 / 5));
            } else if (numberRolled === 5 && this.bets[1] > 0) {
                this.bank += Math.ceil(this.bets[1] * (7 / 5));
            } else if (numberRolled === 6 && this.bets[2] > 0) {
                this.bank += Math.ceil(this.bets[2] * (7 / 6));
            } else if (numberRolled === 8 && this.bets[3] > 0) {
                this.bank += Math.ceil(this.bets[3] * (7 / 6));
            } else if (numberRolled === 9 && this.bets[4] > 0) {
                this.bank += Math.ceil(this.bets[4] * (7 / 5));
            } else if (numberRolled === 10 && this.bets[5] > 0) {
                this.bank += Math.ceil(this.bets[5] * (9 / 5));
            }
            //update the bank text
            this.bankText.setText(`Bank: $${this.bank}`);
        }

        this.bet = (amount, number) => {
            if (this.bank < amount) {
                this.bets[number] += this.bank;
                this.bank = 0;
            } else {
                this.bets[number] += amount;
                this.bank -= amount;
            }

            this.bankText.setText(`Bank: $${this.bank}`);
            if (number === 0) {
                this.bet4.setText("  4\nBet: " + this.bets[0]);
            } else if (number === 1) {
                this.bet5.setText("  5\nBet: " + this.bets[1]);
            } else if (number === 2) {
                this.bet6.setText("  6\nBet: " + this.bets[2]);
            } else if (number === 3) {
                this.bet8.setText("  8\nBet: " + this.bets[3]);
            } else if (number === 4) {
                this.bet9.setText("  9\nBet: " + this.bets[4]);
            } else if (number === 5) {
                this.bet10.setText("  10\nBet: " + this.bets[5]);
            }
        }

        this.clearBet = (index) => {
            if (index === 0 && this.bets[0] > 0) {
                this.bank += this.bets[0];
                this.bets[0] = 0;
                //update the bet text
                this.bet4.setText("  4\nBet: " + this.bets[0]);
            } else if (index === 1 && this.bets[1] > 0) {
                this.bank += this.bets[1];
                this.bets[1] = 0;
                this.bet5.setText("  5\nBet: " + this.bets[1]);
            } else if (index === 2 && this.bets[2] > 0) {
                this.bank += this.bets[2];
                this.bets[2] = 0;
                this.bet6.setText("  6\nBet: " + this.bets[2]);
            } else if (index === 3 && this.bets[3] > 0) {
                this.bank += this.bets[3];
                this.bets[3] = 0;
                this.bet8.setText("  8\nBet: " + this.bets[3]);
            } else if (index === 4 && this.bets[4] > 0) {
                this.bank += this.bets[4];
                this.bets[4] = 0;
                this.bet9.setText("  9\nBet: " + this.bets[4]);
            } else if (index === 5 && this.bets[5] > 0) {
                this.bank += this.bets[5];
                this.bets[5] = 0;
                this.bet10.setText("  10\nBet: " + this.bets[5]);
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
        // Function to create a text with a background
        this.createBetText = (x, y, text) => {
            // Create the text object
            let betText = this.add.text(x, y, text, {
                fontSize: '32px',
                fill: '#FFF',
                align: 'center'
            });

            // Get text dimensions
            let padding = 10;  // Space around the text
            let width = betText.width + padding * 8;
            let height = betText.height + padding * 2;

            // Create a rectangle background
            let background = this.add.graphics();
            background.fillStyle(0xFFFFFF, 0.5);  // Black with 50% transparency
            background.fillRect(x-5, y-padding, width, height);

            // Ensure text is on top
            betText.setDepth(1);

            return betText;
        }

        // Create bet texts with backgrounds
        this.bet4 = this.createBetText(100, 220, "  4\nBet: 0");
        this.bet5 = this.createBetText(300, 220, "  5\nBet: 0");
        this.bet6 = this.createBetText(500, 220, "  6\nBet: 0");
        this.bet8 = this.createBetText(700, 220, "  8\nBet: 0");
        this.bet9 = this.createBetText(900, 220, "  9\nBet: 0");
        this.bet10 = this.createBetText(1100, 220, " 10\nBet: 0");


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
                if (index === 0 && this.bets[0] > 0) {
                    betText.setText(`  4\nBet: ${this.bets[index]}`);
                } else if (index === 1 && this.bets[1] > 0) {
                    betText.setText(`  5\nBet: ${this.bets[index]}`);
                } else if (index === 2 && this.bets[2] > 0) {
                    betText.setText(`  6\nBet: ${this.bets[index]}`);
                } else if (index === 3 && this.bets[3] > 0) {
                    betText.setText(`  8\nBet: ${this.bets[index]}`);
                } else if (index === 4 && this.bets[4] > 0) {
                    betText.setText(`  9\nBet: ${this.bets[index]}`);
                } else if (index === 5 && this.bets[5] > 0) {
                    betText.setText(`  10\nBet: ${this.bets[index]}`);
                }
            });
        });
    }
}