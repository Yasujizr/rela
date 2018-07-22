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
            list: [{ "name": "Stick", "shape": 1, "size": 8, "position": [25, 25], "fillStyle": "#ae5700", "strokeStyle": "#000", "lineWidth": "5" }, { "name": "Base_Black", "shape": 2, "startX": 0, "startY": 25, "endX": 50, "endY": 25, "strokeStyle": "#000", "lineWidth": "13" }, { "name": "Base_Brown", "shape": 2, "startX": 2, "startY": 25, "endX": 48, "endY": 25, "strokeStyle": "#ae5700", "lineWidth": "9" }]
        },

        // STONE
        {
            cs: 124,
            list: [{ "name": "Kreis", "shape": 1, "size": 60, "position": 62, "fillStyle": "#909090", "strokeStyle": "#565656", "lineWidth": "4" }]
        },

        // OAK
        {
            cs: 240,
            list: [{ "name": "Stump", "shape": 1, "size": 40, "position": 120, "fillStyle": "#805200", "strokeStyle": "#644100", "lineWidth": "4" }, { "name": "Leaves", "shape": 1, "size": 110, "position": 120, "fillStyle": "#366e3fb4", "strokeStyle": "#24492A", "lineWidth": "4" }]
        },

        // BEECH
        {
            cs: 240,
            list: [{ "name": "Stump", "shape": 1, "size": 30, "position": 120, "fillStyle": "#98612a", "strokeStyle": "#000", "lineWidth": "4" }, { "name": "Leaves", "shape": 1, "size": 90, "position": 120, "fillStyle": "#286332b4", "strokeStyle": "#24492A", "lineWidth": "4" }]
        },

        // APPLE TREE
        {
            cs: 240,
            list: [{ "name": "Stump", "shape": 1, "size": 40, "position": 120, "fillStyle": "#805200", "strokeStyle": "#644100", "lineWidth": "4" }, { "name": "Leaves", "shape": 1, "size": 110, "position": 120, "fillStyle": "#366e3fb4", "strokeStyle": "#24492A", "lineWidth": "4" }, { "name": "Apple_1", "shape": 1, "size": 12, "position": [65, 55], "fillStyle": "#d50000b4", "strokeStyle": "#aa00002A", "lineWidth": "3" }, { "name": "Apple_2", "shape": 1, "size": 12, "position": [125, 200], "fillStyle": "#d50000b4", "strokeStyle": "#aa00002A", "lineWidth": "3" }, { "name": "Apple_3", "shape": 1, "size": 12, "position": [200, 110], "fillStyle": "#d50000b4", "strokeStyle": "#aa00002A", "lineWidth": "3" }, { "name": "Apple_4", "shape": 1, "size": 12, "position": [40, 170], "fillStyle": "#d50000b4", "strokeStyle": "#aa00002A", "lineWidth": "3" }, { "name": "Apple_5", "shape": 1, "size": 12, "position": [140, 50], "fillStyle": "#d50000b4", "strokeStyle": "#aa00002A", "lineWidth": "3" }]
        },

        // BLUEBERRY_BUSCH
        {
            cs: 64,
            list: [{ "name": "Bush", "shape": 1, "size": 30, "position": [32, 32], "fillStyle": "#176635", "strokeStyle": "#24492A", "lineWidth": "2" }, { "name": "Berry_3", "shape": 1, "size": 5, "position": [48, 24], "fillStyle": "#35486C", "strokeStyle": "#000077", "lineWidth": "2" }, { "name": "Berry_2", "shape": 1, "size": 5, "position": [28, 50], "fillStyle": "#35486C", "strokeStyle": "#000077", "lineWidth": "2" }, { "name": "Berry_1", "shape": 1, "size": 5, "position": [20, 18], "fillStyle": "#344E7E", "strokeStyle": "#000077", "lineWidth": "2" }]
        },

        // RASPBERRY_BUSH
        {
            cs: 64,
            list: [{ "name": "Bush", "shape": 1, "size": 30, "position": [32, 32], "fillStyle": "#176635", "strokeStyle": "#24492A", "lineWidth": "2" }, { "name": "Berry_3", "shape": 1, "size": 5, "position": [45, 40], "fillStyle": "#bb0720", "strokeStyle": "#000077", "lineWidth": "2" }, { "name": "Berry_2", "shape": 1, "size": 5, "position": [21, 37], "fillStyle": "#bb0720", "strokeStyle": "#000077", "lineWidth": "2" }, { "name": "Berry_1", "shape": 1, "size": 5, "position": [35, 16], "fillStyle": "#bb0720", "strokeStyle": "#000077", "lineWidth": "2" }]
        },

        // POT
        {
            cs: 64,
            list: [{ "name": "Bottom", "shape": 1, "size": 28, "position": [32, 32], "fillStyle": "#824100", "strokeStyle": "#552b00", "lineWidth": "4" }, { "name": "Top", "shape": 1, "size": 14, "position": [32, 32], "fillStyle": "#c16100", "strokeStyle": "#6f3700", "lineWidth": "4" }]
        },

        // TORCH
        {
            cs: 64,
            list: [{ "name": "Stick", "shape": 1, "size": 10, "position": [32, 32], "fillStyle": "#532900", "strokeStyle": "#341A00", "lineWidth": "5" }, { "name": "Red_Fire", "shape": 1, "size": 16, "position": [32, 32], "fillStyle": "#ff5e0055", "lineWidth": "1" }]
        },

        // CAMPFIRE
        {
            cs: 60,
            list: [{ "name": "Stick_1", "shape": 2, "startX": 2, "startY": 58, "endX": 58, "endY": 2, "strokeStyle": "#532900", "lineWidth": "10" }, { "name": "Stick_0", "shape": 2, "startX": 2, "startY": 2, "endX": 58, "endY": 58, "strokeStyle": "#532900", "lineWidth": "10" }, { "name": "Red_Fire", "shape": 1, "size": 25, "position": 30, "fillStyle": "#da0a00b8", "lineWidth": "1" }, { "name": "Orange_Fire", "shape": 1, "size": 20, "position": 30, "fillStyle": "#ff5e00a6", "lineWidth": "1" }, { "name": "Yellow_Fire", "shape": 1, "size": 10, "position": 30, "fillStyle": "#fee6969c", "lineWidth": "1" }]
        },

        // BARREL
        {
            cs: 60,
            list: [{ "name": "Barrel_Body", "shape": 1, "size": 27, "position": 30, "fillStyle": "#7d3f00", "strokeStyle": "#4d2600", "lineWidth": "4" }, { "name": "Inner_Border", "shape": 1, "size": 29, "position": 30, "strokeStyle": "#000", "lineWidth": "1" }, { "name": "Outer-Border", "shape": 1, "size": 25, "position": 30, "strokeStyle": "#000", "lineWidth": "1" }, { "name": "Line_2", "shape": 2, "startX": 10, "startY": 45, "endX": 50, "endY": 45, "strokeStyle": "#000", "lineWidth": "1" }, { "name": "Line_1", "shape": 2, "startX": 10, "startY": 15, "endX": 50, "endY": 15, "strokeStyle": "#000", "lineWidth": "1" }, { "name": "Line_0", "shape": 2, "startX": 5, "startY": 30, "endX": 55, "endY": 30, "strokeStyle": "#000", "lineWidth": "1" }]
        },

        // WALL
        {
            cs: 34,
            list: [{ "name": "Outer_Circle", "shape": 1, "size": 16, "position": 17, "fillStyle": "#6a3500", "strokeStyle": "#3c1e00", "lineWidth": "3" }, { "name": "Inner_Circle", "shape": 1, "size": 5, "position": 17, "fillStyle": "#914800", "lineWidth": "1" }]
        },

        // SMALL_HOUSE
        {
            cs: 300,
            list: [{ "name": "Base", "shape": 1, "size": 148, "position": [150, 150], "fillStyle": "#ffa54f", "strokeStyle": "#8b5a2b", "lineWidth": "7" }]
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
            list: [{ "name": "Stick", "shape": 2, "startX": 0, "startY": 6, "endX": 45, "endY": 6, "strokeStyle": "#4e350f", "lineWidth": "6" }, { "name": "Stone", "shape": 0, "size": 10, "position": 1, "fillStyle": "#222", "lineWidth": "1" }]
        },

        // AXE
        {
            cs: 64,
            list: [{ "name": "Stick", "shape": 2, "startX": 0, "startY": 58, "endX": 45, "endY": 58, "strokeStyle": "#4e350f", "lineWidth": "6" }, { "name": "Stone", "shape": 2, "startX": 2, "startY": 58, "endX": 14, "endY": 58, "strokeStyle": "#494949", "lineWidth": "10" }]
        },

        // BASIC_AMOUR
        {
            cs: 64,
            list: [{ "name": "Amour", "shape": 0, "size": 38, "position": 13, "strokeStyle": "#000", "lineWidth": "3" }]
        },

        // SMALL_BAGBACK
        {
            cs: 94,
            list: [{ "name": "Body", "shape": 2, "startX": 70, "startY": 22, "endX": 70, "endY": 72, "strokeStyle": "#000", "lineWidth": "6" }, { "name": "Middle", "shape": 2, "startX": 80, "startY": 22, "endX": 80, "endY": 72, "strokeStyle": "#804000", "lineWidth": "14" }, { "name": "Left", "shape": 2, "startX": 70, "startY": 72, "endX": 88, "endY": 72, "strokeStyle": "#000", "lineWidth": "5" }, { "name": "Right", "shape": 2, "startX": 70, "startY": 22, "endX": 88, "endY": 22, "strokeStyle": "#000", "lineWidth": "5" }, { "name": "Shape_4", "shape": 2, "startX": 89, "startY": 22, "endX": 89, "endY": 72, "strokeStyle": "#000", "lineWidth": "4" }]
        },

        // WOODEN_CART
        {
            cs: 200,
            list: [{ "name": "Left_Holding", "shape": 2, "startX": 5, "startY": 130, "endX": 80, "endY": 130, "strokeStyle": "#1d1400", "lineWidth": "10" }, { "name": "Right_Holding", "shape": 2, "startX": 5, "startY": 70, "endX": 80, "endY": 70, "strokeStyle": "#1d1400", "lineWidth": "10" }, { "name": "Left_Wheel", "shape": 2, "startX": 80, "startY": 155, "endX": 140, "endY": 155, "strokeStyle": "#3b230f", "lineWidth": "30" }, { "name": "Right_Wheel", "shape": 2, "startX": 80, "startY": 45, "endX": 140, "endY": 45, "strokeStyle": "#3b230f", "lineWidth": "30" }, { "name": "Base", "shape": 0, "size": 110, "position": [45, 45], "fillStyle": "#ab6740", "strokeStyle": "#4d1d02", "lineWidth": "10" }]
        }
    ],

    /**
     * All the Menubutton-Sprites.
    */
    LIST_MENUBUTTONS = [
        [{ "name": "Shape_0", "shape": 1, "size": 5, "position": [30, 30], "fillStyle": "#000", "lineWidth": "1" }, { "name": "Shape_1", "shape": 1, "size": 5, "position": [30, 70], "fillStyle": "#000", "lineWidth": "1" }, { "name": "Shape_2", "shape": 1, "size": 5, "position": [30, 50], "fillStyle": "#000", "lineWidth": "1" }, { "name": "Shape_3", "shape": 2, "startX": 38, "startY": 30, "endX": 70, "endY": 30, "strokeStyle": "#000", "lineWidth": "10" }, { "name": "Shape_4", "shape": 2, "startX": 38, "startY": 50, "endX": 70, "endY": 50, "strokeStyle": "#000", "lineWidth": "10" }, { "name": "Shape_5", "shape": 2, "startX": 38, "startY": 70, "endX": 70, "endY": 70, "strokeStyle": "#000", "lineWidth": "10" }],
        [],
        [{ "name": "Blob", "shape": 1, "size": 20, "position": [50, 70], "fillStyle": "#1cf3ff", "strokeStyle": "#000", "lineWidth": "3" }, { "name": "Shape_2", "shape": 2, "startX": 45, "startY": 30, "endX": 45, "endY": 60, "strokeStyle": "#000", "lineWidth": "3" }, { "name": "Shape_2", "shape": 2, "startX": 55, "startY": 30, "endX": 55, "endY": 60, "strokeStyle": "#000", "lineWidth": "3" }, { "name": "Shape_3", "shape": 2, "startX": 40, "startY": 30, "endX": 60, "endY": 30, "strokeStyle": "#000", "lineWidth": "6" }],
        [{ "name": "Stick_Background", "shape": 2, "startX": 22, "startY": 78, "endX": 82, "endY": 18, "strokeStyle": "#000", "lineWidth": "12" }, { "name": "Stick", "shape": 2, "startX": 25, "startY": 75, "endX": 80, "endY": 20, "strokeStyle": "#804000", "lineWidth": "9" }, { "name": "Stone_Background", "shape": 2, "startX": 62, "startY": 38, "endX": 78, "endY": 22, "strokeStyle": "#000", "lineWidth": "34" }, { "name": "Stone", "shape": 2, "startX": 65, "startY": 35, "endX": 75, "endY": 25, "strokeStyle": "#404040", "lineWidth": "30" }],
        [{ "name": "Shape_0", "shape": 2, "startX": 70, "startY": 20, "endX": 40, "endY": 40, "strokeStyle": "#c1bae4", "lineWidth": "10" }, { "name": "Shape_1", "shape": 2, "startX": 40, "startY": 40, "endX": 60, "endY": 50, "strokeStyle": "#c1bae4", "lineWidth": "10" }, { "name": "Shape_2", "shape": 2, "startX": 60, "startY": 50, "endX": 30, "endY": 80, "strokeStyle": "#c1bae4", "lineWidth": "10" }, { "name": "Shape_3", "shape": 2, "startX": 60, "startY": 50, "endX": 30, "endY": 80, "strokeStyle": "#fcfaff", "lineWidth": "6" }, { "name": "Shape_4", "shape": 2, "startX": 40, "startY": 40, "endX": 60, "endY": 50, "strokeStyle": "#fcfaff", "lineWidth": "8" }, { "name": "Shape_5", "shape": 2, "startX": 70, "startY": 20, "endX": 40, "endY": 40, "strokeStyle": "#fcfaff", "lineWidth": "8" }],
        [{ "name": "Stick_Background", "shape": 2, "startX": 22, "startY": 78, "endX": 82, "endY": 18, "strokeStyle": "#000", "lineWidth": "12" }, { "name": "Shaft", "shape": 2, "startX": 23, "startY": 77, "endX": 40, "endY": 60, "strokeStyle": "#804000", "lineWidth": "10" }, { "name": "Blade", "shape": 2, "startX": 40, "startY": 60, "endX": 81, "endY": 19, "strokeStyle": "#c9c9c9", "lineWidth": "10" }, { "name": "Middle", "shape": 2, "startX": 30, "startY": 45, "endX": 55, "endY": 70, "strokeStyle": "#222", "lineWidth": "8" }, { "name": "End", "shape": 1, "size": 10, "position": [25, 75], "fillStyle": "#222", "lineWidth": "1" }]
    ],

    /**
     * All the Linkbutton-Sprites.
    */
    LIST_LINKBUTTONS = [
        [{ "name": "Background", "shape": 0, "size": 80, "position": [0, 0], "fillStyle": "#7289da", "lineWidth": "1" }, { "name": "Text", "shape": 4, "position": [30, 70], "text": "d", "font": "60px Consolas", "fontColor": "#fff" }],
        [{ "name": "Background", "shape": 0, "size": 80, "position": [0, 0], "fillStyle": "#e75f27", "lineWidth": "1" }, { "name": "Text", "shape": 4, "position": [30, 70], "text": "i", "font": "60px Consolas", "fontColor": "#fff" }],
        [{ "name": "Background", "shape": 0, "size": 80, "position": [0, 0], "fillStyle": "#8fdaf4", "lineWidth": "1" }, { "name": "Text", "shape": 4, "position": [30, 70], "text": "t", "font": "60px Consolas", "fontColor": "#fff" }],
        [{ "name": "Background", "shape": 0, "size": 80, "position": [0, 0], "fillStyle": "#f05033", "lineWidth": "1" }, { "name": "Text", "shape": 4, "position": [30, 60], "text": "g", "font": "60px Consolas", "fontColor": "#fff" }],
        [{ "name": "Background", "shape": 0, "size": 80, "position": [0, 0], "fillStyle": "#f96855", "lineWidth": "1" }, { "name": "Text", "shape": 4, "position": [30, 60], "text": "p", "font": "60px Consolas", "fontColor": "#fff" }]
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