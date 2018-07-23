let
    FIELD_SIZE = 500,
    FIELD_AMOUNT = 100,

    USE_EAT = 0,
    USE_BUILD = 1,

    EFFECT_HARVESTINCREASE = 0,
    EFFECT_INVENTORY = 1,

    IMPROV_EVOL = 0,
    IMPROV_RECI = 1,
    IMPROV_CONS = 2,

    INVENTORY_SIZE = 10,

    HOURLENGTH = 3000,
    DROPPED_REMOVE_TIME = 10000,
    HUNGERTIMER = 8000,


    /**
     * All the Sprites, that will be created with createSprite() and then stored in LISTSPRITES.
    */
    createSpriteList = [
        // SIGN
        {
            cs: 50,
            list: [{ "name": "Stick", "sh": 1, "si": 8, "pos": [25, 25], "fis": "#ae5700", "sts": "#000", "lw": "5" }, { "name": "Base_Black", "sh": 2, "sx": 0, "sy": 25, "ex": 50, "ey": 25, "sts": "#000", "lw": "13" }, { "name": "Base_Brown", "sh": 2, "sx": 2, "sy": 25, "ex": 48, "ey": 25, "sts": "#ae5700", "lw": "9" }]
        },

        // STONE
        {
            cs: 124,
            list: [{ "name": "Kreis", "sh": 1, "si": 60, "pos": 62, "fis": "#909090", "sts": "#565656", "lw": "4" }]
        },

        // OAK
        {
            cs: 240,
            list: [{ "name": "Stump", "sh": 1, "si": 40, "pos": 120, "fis": "#805200", "sts": "#644100", "lw": "4" }, { "name": "Leaves", "sh": 1, "si": 110, "pos": 120, "fis": "#366e3fb4", "sts": "#24492A", "lw": "4" }]
        },

        // BEECH
        {
            cs: 240,
            list: [{ "name": "Stump", "sh": 1, "si": 30, "pos": 120, "fis": "#98612a", "sts": "#000", "lw": "4" }, { "name": "Leaves", "sh": 1, "si": 90, "pos": 120, "fis": "#286332b4", "sts": "#24492A", "lw": "4" }]
        },

        // APPLE TREE
        {
            cs: 240,
            list: [{ "name": "Stump", "sh": 1, "si": 40, "pos": 120, "fis": "#805200", "sts": "#644100", "lw": "4" }, { "name": "Leaves", "sh": 1, "si": 110, "pos": 120, "fis": "#366e3fb4", "sts": "#24492A", "lw": "4" }, { "name": "Apple_1", "sh": 1, "si": 12, "pos": [65, 55], "fis": "#d50000b4", "sts": "#aa00002A", "lw": "3" }, { "name": "Apple_2", "sh": 1, "si": 12, "pos": [125, 200], "fis": "#d50000b4", "sts": "#aa00002A", "lw": "3" }, { "name": "Apple_3", "sh": 1, "si": 12, "pos": [200, 110], "fis": "#d50000b4", "sts": "#aa00002A", "lw": "3" }, { "name": "Apple_4", "sh": 1, "si": 12, "pos": [40, 170], "fis": "#d50000b4", "sts": "#aa00002A", "lw": "3" }, { "name": "Apple_5", "sh": 1, "si": 12, "pos": [140, 50], "fis": "#d50000b4", "sts": "#aa00002A", "lw": "3" }]
        },

        // BLUEBERRY_BUSCH
        {
            cs: 64,
            list: [{ "name": "Bush", "sh": 1, "si": 30, "pos": [32, 32], "fis": "#176635", "sts": "#24492A", "lw": "2" }, { "name": "Berry_3", "sh": 1, "si": 5, "pos": [48, 24], "fis": "#35486C", "sts": "#000077", "lw": "2" }, { "name": "Berry_2", "sh": 1, "si": 5, "pos": [28, 50], "fis": "#35486C", "sts": "#000077", "lw": "2" }, { "name": "Berry_1", "sh": 1, "si": 5, "pos": [20, 18], "fis": "#344E7E", "sts": "#000077", "lw": "2" }]
        },

        // RASPBERRY_BUSH
        {
            cs: 64,
            list: [{ "name": "Bush", "sh": 1, "si": 30, "pos": [32, 32], "fis": "#176635", "sts": "#24492A", "lw": "2" }, { "name": "Berry_3", "sh": 1, "si": 5, "pos": [45, 40], "fis": "#bb0720", "sts": "#000077", "lw": "2" }, { "name": "Berry_2", "sh": 1, "si": 5, "pos": [21, 37], "fis": "#bb0720", "sts": "#000077", "lw": "2" }, { "name": "Berry_1", "sh": 1, "si": 5, "pos": [35, 16], "fis": "#bb0720", "sts": "#000077", "lw": "2" }]
        },

        // POT
        {
            cs: 64,
            list: [{ "name": "Bottom", "sh": 1, "si": 28, "pos": [32, 32], "fis": "#824100", "sts": "#552b00", "lw": "4" }, { "name": "Top", "sh": 1, "si": 14, "pos": [32, 32], "fis": "#c16100", "sts": "#6f3700", "lw": "4" }]
        },

        // TORCH
        {
            cs: 64,
            list: [{ "name": "Stick", "sh": 1, "si": 10, "pos": [32, 32], "fis": "#532900", "sts": "#341A00", "lw": "5" }, { "name": "Red_Fire", "sh": 1, "si": 16, "pos": [32, 32], "fis": "#ff5e0055", "lw": "1" }]
        },

        // CAMPFIRE
        {
            cs: 60,
            list: [{ "name": "Stick_1", "sh": 2, "sx": 2, "sy": 58, "ex": 58, "ey": 2, "sts": "#532900", "lw": "10" }, { "name": "Stick_0", "sh": 2, "sx": 2, "sy": 2, "ex": 58, "ey": 58, "sts": "#532900", "lw": "10" }, { "name": "Red_Fire", "sh": 1, "si": 25, "pos": 30, "fis": "#da0a00b8", "lw": "1" }, { "name": "Orange_Fire", "sh": 1, "si": 20, "pos": 30, "fis": "#ff5e00a6", "lw": "1" }, { "name": "Yellow_Fire", "sh": 1, "si": 10, "pos": 30, "fis": "#fee6969c", "lw": "1" }]
        },

        // BARREL
        {
            cs: 60,
            list: [{ "name": "Barrel_Body", "sh": 1, "si": 27, "pos": 30, "fis": "#7d3f00", "sts": "#4d2600", "lw": "4" }, { "name": "Inner_Border", "sh": 1, "si": 29, "pos": 30, "sts": "#000", "lw": "1" }, { "name": "Outer-Border", "sh": 1, "si": 25, "pos": 30, "sts": "#000", "lw": "1" }, { "name": "Line_2", "sh": 2, "sx": 10, "sy": 45, "ex": 50, "ey": 45, "sts": "#000", "lw": "1" }, { "name": "Line_1", "sh": 2, "sx": 10, "sy": 15, "ex": 50, "ey": 15, "sts": "#000", "lw": "1" }, { "name": "Line_0", "sh": 2, "sx": 5, "sy": 30, "ex": 55, "ey": 30, "sts": "#000", "lw": "1" }]
        },

        // WALL
        {
            cs: 34,
            list: [{ "name": "Outer_Circle", "sh": 1, "si": 16, "pos": 17, "fis": "#6a3500", "sts": "#3c1e00", "lw": "3" }, { "name": "Inner_Circle", "sh": 1, "si": 5, "pos": 17, "fis": "#914800", "lw": "1" }]
        },

        // SMALL_HOUSE
        {
            cs: 300,
            list: [{ "name": "Base", "sh": 1, "si": 148, "pos": [150, 150], "fis": "#ffa54f", "sts": "#8b5a2b", "lw": "7" }]
        },

        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },
        { cs: 0, list: [] },

        // PICKAXE
        {
            cs: 64,
            list: [{ "name": "Stick", "sh": 2, "sx": 0, "sy": 6, "ex": 45, "ey": 6, "sts": "#4e350f", "lw": "6" }, { "name": "Stone", "sh": 0, "si": 10, "pos": 1, "fis": "#222", "lw": "1" }]
        },

        // AXE
        {
            cs: 64,
            list: [{ "name": "Stick", "sh": 2, "sx": 0, "sy": 58, "ex": 45, "ey": 58, "sts": "#4e350f", "lw": "6" }, { "name": "Stone", "sh": 2, "sx": 2, "sy": 58, "ex": 14, "ey": 58, "sts": "#494949", "lw": "10" }]
        },

        // BASIC_AMOUR
        {
            cs: 64,
            list: [{ "name": "Amour", "sh": 0, "si": 38, "pos": 13, "sts": "#000", "lw": "3" }]
        },

        // SMALL_BAGBACK
        {
            cs: 94,
            list: [{ "name": "Body", "sh": 2, "sx": 70, "sy": 22, "ex": 70, "ey": 72, "sts": "#000", "lw": "6" }, { "name": "Middle", "sh": 2, "sx": 80, "sy": 22, "ex": 80, "ey": 72, "sts": "#804000", "lw": "14" }, { "name": "Left", "sh": 2, "sx": 70, "sy": 72, "ex": 88, "ey": 72, "sts": "#000", "lw": "5" }, { "name": "Right", "sh": 2, "sx": 70, "sy": 22, "ex": 88, "ey": 22, "sts": "#000", "lw": "5" }, { "name": "sh_4", "sh": 2, "sx": 89, "sy": 22, "ex": 89, "ey": 72, "sts": "#000", "lw": "4" }]
        },

        // WOODEN_CART
        {
            cs: 200,
            list: [{ "name": "Left_Holding", "sh": 2, "sx": 5, "sy": 130, "ex": 80, "ey": 130, "sts": "#1d1400", "lw": "10" }, { "name": "Right_Holding", "sh": 2, "sx": 5, "sy": 70, "ex": 80, "ey": 70, "sts": "#1d1400", "lw": "10" }, { "name": "Left_Wheel", "sh": 2, "sx": 80, "sy": 155, "ex": 140, "ey": 155, "sts": "#3b230f", "lw": "30" }, { "name": "Right_Wheel", "sh": 2, "sx": 80, "sy": 45, "ex": 140, "ey": 45, "sts": "#3b230f", "lw": "30" }, { "name": "Base", "sh": 0, "si": 110, "pos": [45, 45], "fis": "#ab6740", "sts": "#4d1d02", "lw": "10" }]
        }
    ],

    /**
     * All the Menubutton-Sprites.
    */
    LIST_MENUBUTTONS = [
        [{ "name": "sh_0", "sh": 1, "si": 5, "pos": [30, 30], "fis": "#000", "lw": "1" }, { "name": "sh_1", "sh": 1, "si": 5, "pos": [30, 70], "fis": "#000", "lw": "1" }, { "name": "sh_2", "sh": 1, "si": 5, "pos": [30, 50], "fis": "#000", "lw": "1" }, { "name": "sh_3", "sh": 2, "sx": 38, "sy": 30, "ex": 70, "ey": 30, "sts": "#000", "lw": "10" }, { "name": "sh_4", "sh": 2, "sx": 38, "sy": 50, "ex": 70, "ey": 50, "sts": "#000", "lw": "10" }, { "name": "sh_5", "sh": 2, "sx": 38, "sy": 70, "ex": 70, "ey": 70, "sts": "#000", "lw": "10" }],
        [],
        [{ "name": "Blob", "sh": 1, "si": 20, "pos": [50, 70], "fis": "#1cf3ff", "sts": "#000", "lw": "3" }, { "name": "sh_2", "sh": 2, "sx": 45, "sy": 30, "ex": 45, "ey": 60, "sts": "#000", "lw": "3" }, { "name": "sh_2", "sh": 2, "sx": 55, "sy": 30, "ex": 55, "ey": 60, "sts": "#000", "lw": "3" }, { "name": "sh_3", "sh": 2, "sx": 40, "sy": 30, "ex": 60, "ey": 30, "sts": "#000", "lw": "6" }],
        [{ "name": "Stick_Background", "sh": 2, "sx": 22, "sy": 78, "ex": 82, "ey": 18, "sts": "#000", "lw": "12" }, { "name": "Stick", "sh": 2, "sx": 25, "sy": 75, "ex": 80, "ey": 20, "sts": "#804000", "lw": "9" }, { "name": "Stone_Background", "sh": 2, "sx": 62, "sy": 38, "ex": 78, "ey": 22, "sts": "#000", "lw": "34" }, { "name": "Stone", "sh": 2, "sx": 65, "sy": 35, "ex": 75, "ey": 25, "sts": "#404040", "lw": "30" }],
        [{ "name": "sh_0", "sh": 2, "sx": 70, "sy": 20, "ex": 40, "ey": 40, "sts": "#c1bae4", "lw": "10" }, { "name": "sh_1", "sh": 2, "sx": 40, "sy": 40, "ex": 60, "ey": 50, "sts": "#c1bae4", "lw": "10" }, { "name": "sh_2", "sh": 2, "sx": 60, "sy": 50, "ex": 30, "ey": 80, "sts": "#c1bae4", "lw": "10" }, { "name": "sh_3", "sh": 2, "sx": 60, "sy": 50, "ex": 30, "ey": 80, "sts": "#fcfaff", "lw": "6" }, { "name": "sh_4", "sh": 2, "sx": 40, "sy": 40, "ex": 60, "ey": 50, "sts": "#fcfaff", "lw": "8" }, { "name": "sh_5", "sh": 2, "sx": 70, "sy": 20, "ex": 40, "ey": 40, "sts": "#fcfaff", "lw": "8" }],
        [{ "name": "Stick_Background", "sh": 2, "sx": 22, "sy": 78, "ex": 82, "ey": 18, "sts": "#000", "lw": "12" }, { "name": "Shaft", "sh": 2, "sx": 23, "sy": 77, "ex": 40, "ey": 60, "sts": "#804000", "lw": "10" }, { "name": "Blade", "sh": 2, "sx": 40, "sy": 60, "ex": 81, "ey": 19, "sts": "#c9c9c9", "lw": "10" }, { "name": "Middle", "sh": 2, "sx": 30, "sy": 45, "ex": 55, "ey": 70, "sts": "#222", "lw": "8" }, { "name": "End", "sh": 1, "si": 10, "pos": [25, 75], "fis": "#222", "lw": "1" }]
    ],

    /**
     * All the Linkbutton-Sprites.
    */
    LIST_LINKBUTTONS = [
        [{ "name": "Background", "sh": 0, "si": 80, "pos": [0, 0], "fis": "#7289da", "lw": "1" }, { "name": "te", "sh": 4, "pos": [30, 70], "te": "d", "fo": "60px Consolas", "foc": "#fff" }],
        [{ "name": "Background", "sh": 0, "si": 80, "pos": [0, 0], "fis": "#e75f27", "lw": "1" }, { "name": "te", "sh": 4, "pos": [30, 70], "te": "i", "fo": "60px Consolas", "foc": "#fff" }],
        [{ "name": "Background", "sh": 0, "si": 80, "pos": [0, 0], "fis": "#8fdaf4", "lw": "1" }, { "name": "te", "sh": 4, "pos": [30, 70], "te": "t", "fo": "60px Consolas", "foc": "#fff" }],
        [{ "name": "Background", "sh": 0, "si": 80, "pos": [0, 0], "fis": "#f05033", "lw": "1" }, { "name": "te", "sh": 4, "pos": [30, 60], "te": "g", "fo": "60px Consolas", "foc": "#fff" }],
        [{ "name": "Background", "sh": 0, "si": 80, "pos": [0, 0], "fis": "#f96855", "lw": "1" }, { "name": "te", "sh": 4, "pos": [30, 60], "te": "p", "fo": "60px Consolas", "foc": "#fff" }]
    ],

    /**
     * All possible that can be placed on the map.
     * 
     * obj: The Name of the Object
     * passable: Is the Object passable
     * [
     * item[]: All the Items a Player can get from the Object
     * item[].item: The Type of Item
     * item[].get: The possibility of getting the Item
     * ]
     * size: The regular size of the Object
     * damaging: How much should the Size get smaller when getting punched
     * breakSize: When should the Object be destroyed
     * [
     * minSize: The minimal Size of the Object
     * growing: How much should the Size increase every hour
     * ]
     * position: Should the Object be placed below(0) or above(1) the Player
     * sprite: The sprite of the Object
    */
    LISTOBJECTS = [
        {
            obj: "ROCK",
            passable: false,
            item: [{ item: 1, get: 0.1 }],
            size: 60,
            breakSize: 40,
            damaging: 1,
            position: 0,
            sprite: 1
        },
        {
            obj: "OAK",
            passable: false,
            item: [{ item: 2, get: 0.1 }, { item: 11, get: 0.85 }],
            growing: 0.2,
            size: 40,
            breakSize: 30,
            minSize: 30,
            damaging: 1,
            position: 1,
            sprite: 2
        },
        {
            obj: "BEECH",
            passable: false,
            item: [{ item: 2, get: 0.1 }, { item: 12, get: 0.85 }],
            growing: 0.3,
            size: 30,
            breakSize: 20,
            minSize: 20,
            damaging: 1,
            position: 1,
            sprite: 3
        },
        {
            obj: "APPLE_TREE",
            passable: false,
            item: [{ item: 2, get: 0.1 }, { item: 5, get: 0.7 }, { item: 13, get: 0.85 }],
            growing: 0.2,
            size: 40,
            breakSize: 30,
            minSize: 30,
            damaging: 1,
            position: 1,
            sprite: 4
        },
        {
            obj: "BLUEBERRY_BUSH",
            passable: false,
            item: [{ item: 3, get: 0.2 }, { item: 14, get: 0.85 }],
            size: 32,
            breakSize: 20,
            minSize: 20,
            growing: 0.5,
            damaging: 0.5,
            position: 0,
            sprite: 5
        },
        {
            obj: "RASPBERRY_BUSH",
            passable: false,
            item: [{ item: 4, get: 0.2 }, { item: 15, get: 0.85 }],
            size: 32,
            breakSize: 20,
            minSize: 20,
            growing: 0.5,
            damaging: 0.5,
            position: 0,
            sprite: 6
        },

        {},
        {},
        {},
        {},
        {},
        {},

        {
            obj: "TORCH",
            passable: false,
            size: 10,
            breakSize: 9,
            damaging: 0.5,
            light: 100,
            position: 0,
            sprite: 8
        },
        {
            obj: "CAMPFIRE",
            passable: false,
            size: 40,
            breakSize: 30,
            damaging: 0.5,
            light: 210,
            position: 0,
            sprite: 9
        },
        {
            obj: "BASKET",
            passable: false,
            size: 28,
            breakSize: 25,
            damaging: 0.5,
            position: 0,
            storage: 7,
            loot: true,
            sprite: 7
        },
        {
            obj: "BARREL",
            passable: false,
            size: 30,
            breakSize: 26,
            damaging: 0.5,
            position: 0,
            storage: 10,
            sprite: 10
        },
        {
            obj: "WOOD_WALL",
            passable: false,
            size: 17,
            breakSize: 15,
            damaging: 0.1,
            position: 1,
            sprite: 11
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
            obj: "HOUSE I",
            passable: false,
            size: 150,
            breakSize: 148,
            damaging: 0.1,
            position: 0,
            sprite: 12
        }
    ],

    /**
     * All Items.
     * 
     * name: The Name of the Item
     * [
     * use{}: The Usage of the Item
     * use{}.type: What can the Item be used for
     * use{}.info: The specific Value for the Usage 
     * use{}.responseItem: The Item, which will return into the Player's inventory
     * ]
     * [
     * tool: The Item that should be added to the Equipment, if this item is equiped
     * ]
     * [
     * effects[]: All Effects on the Player
     * effects[].t: The Type of Effect
     * effects[].f: The specific Information for this Effect
     * effects[].i[]: All Objects the Effect should affect
     * ]
     * color: The Color of the Item
    */
    LISTITEMS = [
        { name: "Nothing" },
        { name: "Stone", color: "#909090" },
        { name: "Stick", color: "#805200" },
        { name: "Blueberry", use: { type: USE_EAT, info: 10 }, color: "#35486c" },
        { name: "Raspberry", use: { type: USE_EAT, info: 10 }, color: "#bb0720" },
        { name: "Apple", use: { type: USE_EAT, info: 15, responseItem: 6 }, color: "#d50000" },
        { name: "Apple Junk", color: "#385621" },
        {},
        {},
        {},
        {},
        { name: "Seedling", use: { type: USE_BUILD, info: 1 }, color: "#722b09" },
        { name: "Seedling", use: { type: USE_BUILD, info: 2 }, color: "#ae6928" },
        { name: "Seedling", use: { type: USE_BUILD, info: 3 }, color: "#c64103" },
        { name: "Seedling", use: { type: USE_BUILD, info: 4 }, color: "#19548c" },
        { name: "Seedling", use: { type: USE_BUILD, info: 5 }, color: "#fe5f71" },
        {},
        {},
        {},
        {},
        {},
        { name: "Pickaxe", tool: 0, color: "#805200" },
        { name: "Axe", tool: 1, color: "#805200" },
        { name: "Armour I", tool: 2, color: "#222222" },
        { name: "Bagpack I", tool: 3, color: "#444" }
    ],

    /*
     * All Recipes.
     * 
     * item: The Item that should be Crafted
     * necessaryItems[]: The List of all necessaryItems
     * necessaryItems[].item: The Type of Item
     * necessaryItems[].amount: The Amount of this specific item
    */
    LISTRECIPES = [
        { item: 21, necessaryItems: [{ item: 1, amount: 2 }, { item: 2, amount: 1 }] },
        { item: 22, necessaryItems: [{ item: 1, amount: 2 }, { item: 2, amount: 3 }] },
        { item: 23, necessaryItems: [{ item: 1, amount: 4 }] },
        { item: 24, necessaryItems: [{ item: 2, amount: 7 }] }
    ],

    /**
     * All Evolutions.
     * 
     * name: The Name of this Evolution
     * neededPoints: The needed Points for this evolution
     * improvements[]: The List of all new Improvements
     * improvements[].type: The Type of new Improvement
     * improvements[].index: The Specific Index of the New Feature
    */
    LISTEVOLUTIONS = [
        {
            name: "Fire",
            neededPoints: 20,
            improvements: [{ type: IMPROV_EVOL, index: 1 }, { type: IMPROV_EVOL, index: 2 }, { type: IMPROV_EVOL, index: 3 },
            { type: IMPROV_CONS, index: 0 }, { type: IMPROV_CONS, index: 1 }]
        },
        {
            name: "Lumberjacking",
            neededPoints: 20,
            improvements: [{ type: IMPROV_RECI, index: 0 }, { type: IMPROV_RECI, index: 1 }, { type: IMPROV_RECI, index: 2 }, { type: IMPROV_RECI, index: 3 },
            { type: IMPROV_CONS, index: 2 }, { type: IMPROV_CONS, index: 3 }]
        },
        {
            name: "Hunting",
            neededPoints: 40,
            improvements: []
        },
        {
            name: "Basic Architecture",
            neededPoints: 40,
            improvements: [{ type: IMPROV_CONS, index: 4 }, { type: IMPROV_CONS, index: 5 }]
        }
    ],

    /**
     * All possible Constructions.
     * 
     * object: The Object to build
     * necessary[]: The List of all necessary Items
     * necessary[].item: The Type of Item
     * necessary[].amount: The Amount of this specific Item
    */
    LISTCONSTRUCTIONS = [
        { object: 12, necessary: [{ item: 2, amount: 2 }] },
        { object: 13, necessary: [{ item: 2, amount: 5 }] },
        { object: 14, necessary: [{ item: 2, amount: 2 }] },
        { object: 15, necessary: [{ item: 2, amount: 8 }] },
        { object: 16, necessary: [{ item: 2, amount: 1 }] },
        { object: 27, necessary: [{ item: 2, amount: 10 }] }
    ],

    /**
     * All equipable Tools.
     * 
     * item: The Item to get when unequiping this tool
     * position: The Slot, this Tool should be placed on
     * sprite: The Sprite of this Tool
     * [
     * effects[]: All Effects on the Player, when this tool is equiped
     * effects[].type: The Type of Effect
     * effects[].info: The specific Information for this Item
     * ]
    */
    LISTEQUIPMENT = [
        { item: 21, position: 0, sprite: 28, effects: [{ type: EFFECT_HARVESTINCREASE, info: { f: 1, i: [0] } }] },
        { item: 22, position: 1, sprite: 29, effects: [{ type: EFFECT_HARVESTINCREASE, info: { f: 1, i: [1, 2] } }] },
        { item: 23, position: 2, sprite: 30 },
        { item: 24, position: 3, sprite: 31, effects: [{ type: EFFECT_INVENTORY, info: 8 }] }
    ],

    /**
     * All dynamic Objects, which can be moved.
     * 
     * name: The name of the dynamic Object
     * size: The Buffer-Size of the Object
     * sprite: The Index of the Sprite in LISTSPRITES
     * draggable: Can the dynamic Object be dragged by the Player 
    */
    LISTDYNAMIC = [
        { name: "WOODEN_CART", size: 55, sprite: 32, draggable: true }
    ],

    /**
     * The Information, how the Fields should be painted.
     * 
     * basic: The Basic RGB-Values
     * code: The Code, that should be written on this Field
    */
    createFieldList = [
        { basic: [64, 225, 249], code: [] },
        { basic: [254, 255, 117], code: [] },
        { basic: [40, 120, 50], code: ["23", "15", "21", "12", "04", "21", "03", "18", "25", "27"] },
    ],

    /**
     * What Objects should be placed on the Map, and how many.
     * 
     * object: The Type of Object
     * amount: The Amount of this specific Object
     * [
     * minPos: The minimal X- and Y-Position of this Object
     * maxPos: The maximal X- and Y-Position of this Object
     * ]
    */
    createObjectList = [
        { object: 0, amount: 800, minPos: 400, maxPos: (99 * 400) },
        { object: 1, amount: 650, minPos: 400, maxPos: (99 * 400) },
        { object: 2, amount: 500, minPos: 400, maxPos: (99 * 400) },
        { object: 3, amount: 600, minPos: 400, maxPos: (99 * 400) },
        { object: 4, amount: 900, minPos: 400, maxPos: (99 * 400) },
        { object: 5, amount: 900, minPos: 400, maxPos: (99 * 400) },
        { object: 13, amount: 1000 },
        { object: 14, amount: 50 }
    ],

    /**
     * What NPCs should be created, when loading the Game.
     * 
     * type: The Type of NPC
     * amount: The Amount of this specific NPC
     * [
     * minPos: The minimal X- and Y-Position of this NPC
     * maxPos: The maximal X- and Y-Position of this NPC
     * ]
    */
    createNPCList = [
        { type: 0, amount: 800, minPos: 400, maxPos: (99 * 400) }
    ];