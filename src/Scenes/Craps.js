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
            if (this.bank <= 0) {
                console.log("You have no money left");
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

        this.totalBets = (numberRolled) => {
            if (numberRolled === 4) {
                this.bank += this.betAmounts.Four * 2;
                this.bankText.setText("Bank: $" + this.bank);
                this.betAmounts.Four = 0;
                this.FourText.setText(`$${this.betAmounts.Four}`);
            }
            if (numberRolled === 5) {
                this.bank += this.betAmounts.Five * 2;
                this.bankText.setText("Bank: $" + this.bank);
                this.betAmounts.Five = 0;
                this.FiveText.setText(`$${this.betAmounts.Five}`);
            }
            if (numberRolled === 6) {
                this.bank += this.betAmounts.Six * 2;
                this.bankText.setText("Bank: $" + this.bank);
                this.betAmounts.Six = 0;
                this.SixText.setText(`$${this.betAmounts.Six}`);
            }
            if (numberRolled === 8) {
                this.bank += this.betAmounts.Eight * 2;
                this.bankText.setText("Bank: $" + this.bank);
                this.betAmounts.Eight = 0;
                this.EightText.setText(`$${this.betAmounts.Eight}`);
            }
            if (numberRolled === 9) {
                this.bank += this.betAmounts.Nine * 2;
                this.bankText.setText("Bank: $" + this.bank);
                this.betAmounts.Nine = 0;
                this.NineText.setText(`$${this.betAmounts.Nine}`);
            }
            if (numberRolled === 10) {
                this.bank += this.betAmounts.Ten * 2;
                this.bankText.setText("Bank: $" + this.bank);
                this.betAmounts.Ten = 0;
                this.TenText.setText(`$${this.betAmounts.Ten}`);
            }
        }
        // on enter 2 dice should be rolled and display the total in text
        this.rollDice = () => {
            let dice1 = Math.floor(Math.random() * 6) + 1;
            let dice2 = Math.floor(Math.random() * 6) + 1;
            let total = dice1 + dice2;
            this.totalBets(total);
            this.diceRollText.setText("You rolled: " + total, { fontSize: "32px", color: "#000000", fontFamily: "Arial" });
        }



        //on enter the dice should be rolled
        this.input.keyboard.on("keydown-ENTER", () => {
            this.rollDice();
        });
    }

}