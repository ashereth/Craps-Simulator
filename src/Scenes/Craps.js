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
        this.SCALE = 2;
    }

    init() {
    }

    create() {

        this.map = this.add.tilemap("crapsBackground", 18, 18, 60, 40);

        this.tileset = this.map.addTilesetImage("Background", "tilemap_tiles");
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.numberLayer = this.map.createLayer("Numbers", this.tileset, 0, 0);

        //get the objects and make them interactive
        // Get the object layer
        // Get the object layer
        const betObjects = this.map.getObjectLayer("Bets").objects;

        // Loop through bet objects and make them interactive
        betObjects.forEach(obj => {
            this[obj.name] = this.add.rectangle(
                obj.x,
                obj.y,
                obj.width,
                obj.height,
            ).setOrigin(0, 0).setInteractive();

            // Add pointer event
            this[obj.name].on("pointerdown", () => this.bet(obj.name));
        });

        // Betting function 
        this.bet = (name) => {
            //if the objects name is one of the number bets then print the number if its a field bet then print field bet
            if (name == "Four" || name == "Five" || name == "Six" || name == "Eight" || name == "Nine" || name == "Ten") {
                console.log("number bet", name);
            }else{
                console.log("field bet", name);
            }
        };
    }
}