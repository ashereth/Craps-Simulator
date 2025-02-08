class Craps extends Phaser.Scene {
    constructor() {
        super("crapsScene");
    }



    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");
        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("crapsBackground", "crapsBackground.tmj");

        this.bank = 1000;
        this.betAmounts = {};
        this.betAmount = 100;
    }

    init() {
    }

    create() {
        this.map = this.add.tilemap("crapsBackground", 18, 18, 60, 40);
        this.tileset = this.map.addTilesetImage("Background", "tilemap_tiles");
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.numberLayer = this.map.createLayer("Numbers", this.tileset, 0, 0);

        // Get the object layer
        const betObjects = this.map.getObjectLayer("Bets").objects;


        // Loop through bet objects and make them interactive
        betObjects.forEach(obj => {
            // Create the rectangle
            this[obj.name] = this.add.rectangle(
                obj.x, obj.y, obj.width, obj.height
            ).setOrigin(0, 0).setInteractive();

            // Default bet amount
            this.betAmounts[obj.name] = 0;

            // Add text to display bet amount
            this[obj.name + "Text"] = this.add.text(
                obj.x + obj.width / 2, obj.y + obj.height / 2,
                `$${this.betAmounts[obj.name]}`,
                { fontSize: "16px", color: "#ffffff", fontFamily: "Arial" }
            ).setOrigin(0.5, 0.5); // Centered on the rectangle

            // Add pointer event
            this[obj.name].on("pointerdown", () => this.bet(obj.name));
            //tint the rectangle when hovered over
            //make not opaque
            this[obj.name].on("pointerover", () => this[obj.name].setFillStyle(0x000000, 0.1));
            //untint the rectangle when pointer is not over it
            this[obj.name].on("pointerout", () => this[obj.name].setFillStyle());
            //on right click call clearBet function
            this[obj.name].on("pointerdown", (pointer) => {
                if (pointer.rightButtonDown()) {
                    this.clearBet(obj.name);
                }
            });
        });

        // Betting function 
        this.bet = (name) => {
            if (this.bank <= this.betAmount) {
                // Increase bet amount and update the text
                this.betAmounts[name] += this.bank; // Increase bet by $10 (adjust as needed)
                this[name + "Text"].setText(`$${this.betAmounts[name]}`);
                this.bank -= this.bank;
                this.bankText.setText("Bank: $" + this.bank);
                return;
            }
            if (name === "Four" || name === "Five" || name === "Six" || name === "Eight" || name === "Nine" || name === "Ten") {
                console.log("number bet", name);
            } else {
                console.log("field bet", name);
            }

            // Increase bet amount and update the text
            this.betAmounts[name] += 100; // Increase bet by $10 (adjust as needed)
            this[name + "Text"].setText(`$${this.betAmounts[name]}`);
            this.bank -= 100;
            this.bankText.setText("Bank: $" + this.bank);
        };

        //clear bet function
        this.clearBet = (name) => {
            let currentAmount = this.betAmounts[name];
            this.bank += currentAmount;
            this.betAmounts[name] = 0;
            this[name + "Text"].setText(`$${this.betAmounts[name]}`);
            this.bankText.setText("Bank: $" + this.bank);
        }

        this.diceRollText = this.add.text(550, 400, "Press ENTER to roll the dice", { fontSize: "32px", color: "#000000", fontFamily: "Arial" });
        //add text for the bank
        this.bankText = this.add.text(550, 450, "Bank: $" + this.bank, { fontSize: "32px", color: "#000000", fontFamily: "Arial" });

        this.totalNumberedBets = (numberRolled) => {
            if (numberRolled === 4) {
                this.bank += Math.ceil(this.betAmounts.Four * (9 / 5));
                this.bankText.setText("Bank: $" + this.bank);
                this.FourText.setText(`$${this.betAmounts.Four}`);
            }
            if (numberRolled === 5) {
                this.bank += Math.ceil(this.betAmounts.Five * (7 / 5));
                this.bankText.setText("Bank: $" + this.bank);
                this.FiveText.setText(`$${this.betAmounts.Five}`);
            }
            if (numberRolled === 6) {
                this.bank += Math.ceil(this.betAmounts.Six * (7 / 6));
                this.bankText.setText("Bank: $" + this.bank);
                this.SixText.setText(`$${this.betAmounts.Six}`);
            }
            if (numberRolled === 8) {
                this.bank += Math.ceil(this.betAmounts.Eight * (7 / 6));
                this.bankText.setText("Bank: $" + this.bank);
                this.EightText.setText(`$${this.betAmounts.Eight}`);
            }
            if (numberRolled === 9) {
                this.bank += Math.ceil(this.betAmounts.Nine * (7 / 5));
                this.bankText.setText("Bank: $" + this.bank);
                this.NineText.setText(`$${this.betAmounts.Nine}`);
            }
            if (numberRolled === 10) {
                this.bank += Math.ceil(this.betAmounts.Ten * (9 / 5));
                this.bankText.setText("Bank: $" + this.bank);
                this.TenText.setText(`$${this.betAmounts.Ten}`);
            }
        }
        // on enter 2 dice should be rolled and display the total in text
        this.rollDice = () => {

            let dice1 = Math.floor(Math.random() * 6) + 1;
            let dice2 = Math.floor(Math.random() * 6) + 1;
            let total = dice1 + dice2;
            //if total == 7 then clear 
            if (total === 7) {
                this.betAmounts.Four = 0;
                this.betAmounts.Five = 0;
                this.betAmounts.Six = 0;
                this.betAmounts.Eight = 0;
                this.betAmounts.Nine = 0;
                this.betAmounts.Ten = 0;
                //update all the text
                this.FourText.setText(`$${this.betAmounts.Four}`);
                this.FiveText.setText(`$${this.betAmounts.Five}`);
                this.SixText.setText(`$${this.betAmounts.Six}`);
                this.EightText.setText(`$${this.betAmounts.Eight}`);
                this.NineText.setText(`$${this.betAmounts.Nine}`);
                this.TenText.setText(`$${this.betAmounts.Ten}`);
            }
            this.totalNumberedBets(total);
            this.diceRollText.setText("You rolled: " + total, { fontSize: "32px", color: "#000000", fontFamily: "Arial" });
        }



        //on enter the dice should be rolled
        this.input.keyboard.on("keydown-ENTER", () => {
            this.rollDice();
        });
    }

}
