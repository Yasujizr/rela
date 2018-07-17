// Activate Strict-Mode (ECMAScript version 5)
"use strict";

/*
 * Structure (select the Shortcut, and then Press Ctrl+D or Ctrl+F):
 * - t_a: GLOBAL / CONSTANT     Global Variables
 * - t_b: GENERAL FUNCTIONS     General Functions
 * - t_c: DEVICE                Initialize and Manage the Device
 * - t_d: FRAMEWORK             The Main Framework, for Image-Generation and Rendering
 * - t_e: CANVAS                The Canvas-Class
 * - t_f: WINDOWS               Manage and Control Subwindows, like the Inventory
 * - t_g: GENERAL EVENTS        General Events, like Loading the DOM or Resizing the Window
 * - t_h: BUTTONS               Initialize and Manage all Button-Events
 * - t_i: MOUSE                 Manage and Control Mouse-Inputs
 * - t_j: KEYBOARD              Manage and Control Keyboard-Inputs
 * - t_k: TEXT                  Create and Manage Texts on the Screen
 * - t_l: EFFECTS               General Effects, like Brightening the Screen Up
 * - t_m: PROJECTILES           The Projectile-Class
 * - t_n: CONTAINER             The Container-Class
 * - t_o: DYNAMIC_OBJECTS       Dynamic Objects, like Carts and Vehicles
 * - t_p: PLAYER                The Player-Class
 * - t_q: NPC                   The NPC-Class
 * - t_r: MAP                   The Map-Class
 * - t_s: GENERATE              Create all Resources, set all Lists and Generate the Sprites
 * - t_t: GAME                  The Game-Class
 * - t_u: SAVE                  Manage Saving and Loading the Game
 * - t_v: START/END             Manage the Beginning and the End of the Episode
 * - t_w: CREATE OBJECTS        Create all Main-Objects, like the Player and the Map
*/

// ===============================================================================================
// GLOBAL/CONSTANT t_a
// ===============================================================================================
let
    FRAMERATE = (1000 / 55),
    CANVAS_SCALING_FACTOR = 2,

    CONTROL_NORMAL = 0,
    CONTROL_TOUCH = 1,

    MAXOPACITY = 0.6,

    RIGHT_MOUSEBUTTON = 2,
    LEFT_MOUSEBUTTON = 1,

    RENDER_NORMALSIZE = 1,

    SHOW_ERROR = "[ERROR]:",
    SHOW_INFORMATION = "[INFORMATION]:",
    SHOW_UPDATE = "[UPDATE]:",

    HARVESTING_NOTHING = -1,
    BUILDING_NOTHING = null,
    EQUIPED_NOTHING = -1,

    STORAGE_PUTOUT = 0,
    STORAGE_PUTIN = 1,

    LIST_FIELDS = [],
    LIST_SPRITES = [],

    SOUNDCONTEXT = new (window.AudioContext || window.webkitAudioContext || window.Audio)(),
    PRESSED_KEYLIST = [],

    GAMETIMER = Date.now(),
    CLOCKTIMER = Date.now(),

    HOURLENGTH = 3000,
    DROPPED_REMOVE_TIME = 10000,

    FIELD_SIZE = 500,
    FIELD_AMOUNT = 100,

    PUNCHING_DISTANCE = 20,
    DROPPED_SIZE = 12,
    INVENTORY_SIZE = 10,

    HUNGERTIMER = 8000;

// ===============================================================================================
// GENERAL FUNCTIONS t_b
// ===============================================================================================
/**
 * Get a HTML-Element.
 * 
 * @returns {element} The HTML-Element
 * 
 * @param {string} elementId_ - The ID of the HTML-Element
*/
function getEle(elementId_) {
    return (document.getElementById(elementId_));
} // getEle

/**
 * Set the CSS-Style of an Element.
 * 
 * @param {string} elementId_ - The ID of the HTML-Element
 * @param {string} cssStyle_ - The CSS-Attribute to modify
 * @param {string} newValue_ - The new Value of this CSS-Style
*/
function setCSS(elementId_, cssStyle_, newValue_) {
    let element = (typeof(elementId_) == typeof("")) ? getEle(elementId_) : (elementId_);
    element.style[cssStyle_] = newValue_;
} // setCSS

/**
 * Get the CSS-Style of an Element.
 * 
 * @param {string} elementId_ - The ID of the HTML-Element
 * @param {string} cssStyle_ - The CSS-Attribute
*/
function getCSS(elementId_, cssStyle_) {
    let element = (typeof(elementId_) == typeof("")) ? getEle(elementId_) : (elementId_);
    return (element.style[cssStyle_]);
} // getCSS

/**
 * Set innerHTML-Text of a DOM-Element.
 * 
 * @param {string} elementId_ - The ID of the Element
 * @param {string} text_ - The Inner-HTML-Text to set
*/
function setHTML(elementId_, text_) {
    getEle(elementId_).innerHTML = text_;
} // setHTML

/**
 * Add a Text to the innerHTML-Text of a DOM-Element.
 * 
 * @param {string} elementId_ - The ID of the Element
 * @param {string} text_ - The Text to add to the innerHTML-Text
*/
function addHTML(elementId_, text_) {
    getEle(elementId_).innerHTML += text_;
} // addHTML

/**
 * Set an Attribute of an CSS-Class.
 * 
 * @param {string} selector_ - The CSS-Class to modify.
 * @param {string} cssProp_ - The Attribute to modify
 * @param {string} cssVal_ - The new Value of the Attribute
*/
function changeCSSStyle(selector_, cssProp_, cssVal_) {
    let ssMain = 0,
        cssRules = (document.all) ? 'rules' : 'cssRules';

    for (let i = 0, len = document.styleSheets[ssMain][cssRules].length; i < len; i++) {
        if (document.styleSheets[ssMain][cssRules][i].selectorText === selector_) {
            document.styleSheets[ssMain][cssRules][i].style[cssProp_] = cssVal_;
            return;
        }
    }
} // changeCSSStyle

// ===============================================================================================
// DEVICE t_c
// ===============================================================================================
/**
 * Check if the Device has Touch.
 * 
 * @returns {bool} Is the Device using Touch?
*/
function checkIfTouch() {
    return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
} // checkIfTouch

/**
 * Initialize the Normal Controls for Computers, with a Mouse and a Keyboard.
*/
function initializeComputerControl() {
    /*
     * If the User Moves the Mouse.
    */
    window.addEventListener("mousemove", (event_) => {
        if (Game.processMouseInput) {
            Mouse.updateMousePosition(event_);
        }
    }); // mousemove

    /*
     * If the user Clicks on the Canvas.
    */
    window.addEventListener("mousedown", (event_) => {
        if (Game.gameRunning && Game.processMouseInput) {
            if (Player.currentBuild != BUILDING_NOTHING) {
                // Left-Click
                if (event_.buttons == LEFT_MOUSEBUTTON) {
                    if (Mouse.overCanvas) {
                        Player.build();
                    }
                }

                // Right-Click
                if (event_.buttons == RIGHT_MOUSEBUTTON) {
                    Player.currentBuild = BUILDING_NOTHING;
                }
            }
            else {
                Mouse.pressedMouseButtons[event.which] = true;
            }
        }
    }); // mousedown

    /*
     * If the Player Stops Clicking.
    */
    window.addEventListener("mouseup", (event_) => {
        delete (Mouse.pressedMouseButtons[event_.which]);
    }); // mouseup

    /*
     * If the Mouse is entering the Canvas.
    */
    Canvas.canvas.addEventListener("mouseenter", () => {
        Mouse.overCanvas = true;
    }); // mouseenter

    /*
     * If the Mouse is leaving the Canvas.
    */
    Canvas.canvas.addEventListener("mouseleave", () => {
        Mouse.overCanvas = false;
    }); // mouseleave

    /*
     * If the Mouse is over the Canvas.
    */
    Canvas.canvas.addEventListener("mouseover", () => {
        Mouse.overCanvas = true;
    }); // mouseover

    /*
     * If a Key is Pressed.
    */
    window.addEventListener("keydown", (event_) => {
        if (Game.processKeyboardInput) {
            // If the "ESC"-Key is pressed --> Open Menu
            if (event_.keyCode == 27) { changeWindowVisibility("a"); }
            // If the "Space"-Key is pressed --> Open Storage
            else if (event_.keyCode == 32 && Player.harvest != HARVESTING_NOTHING && Landscape.objectList[Player.harvest].storage) { Player.openStorage(); }
            // If the "C"-Key is pressed --> Open Constructions
            else if (event_.keyCode == 67) { changeWindowVisibility("d"); }
            // If the "E"-Key is pressed --> Open Inventory
            else if (event_.keyCode == 69) { changeWindowVisibility("b"); }
            // If the "F"-Key is pressed --> Open Evolutions
            else if (event_.keyCode == 70) { changeWindowVisibility("e"); }
            // If the "R"-Key is pressed --> Open Recipes
            else if (event_.keyCode == 82) { changeWindowVisibility("c"); }
            // If the "T"-Key is pressed --> Open Equipment
            else if (event_.keyCode == 84) { changeWindowVisibility("f"); }
            // If the Key should be Pressable for a Longer Timer, Add the Key to PRESSED_KEYLIST
            else { PRESSED_KEYLIST[event_.keyCode] = true; }
        }
    }); // keydown

    /*
     * If a Key is Released.
    */
    window.addEventListener("keyup", (event_) => {
        delete (PRESSED_KEYLIST[event_.keyCode]);
    }); // keyup
} // initializeComputerControl

/**
 * Initialize the Touch Controls for Tablets and Smartphones, with Touch.
*/
function initializeMobileControl() {
    Canvas.canvas.addEventListener("touchstart", (event_) => {
        Player.aimX = (Player.x - (Canvas.width / 2)) + event_.touches[0].clientX;
        Player.aimY = (Player.y - (Canvas.height / 2)) + event_.touches[0].clientY;
    });
    Canvas.canvas.addEventListener("mousedown", (event_) => {
        Player.aimX = (Player.x - (Canvas.width / 2)) + event_.clientX;
        Player.aimY = (Player.y - (Canvas.height / 2)) + event_.clientY;
    });
} // initializeMobileControl

/**
 * Change the current Control-Type to the other. So, if the Mobile-Mode is currently active, 
 * the Computer-Mode will be activated. And also the other way around.
*/
function changeControl() {
    let newCanvas = Canvas.canvas.cloneNode(true);
    Canvas.canvas.parentNode.replaceChild(newCanvas, Canvas.canvas);
    Canvas = new NewCanvas("AnimationCanvas");

    Player.aimX = Player.x;
    Player.aimY = Player.y;

    if (Game.controlType == CONTROL_NORMAL) {
        Game.controlType = CONTROL_TOUCH;

        initializeMobileControl();
    }
    else if (Game.controlType == CONTROL_TOUCH) {
        Game.controlType = CONTROL_NORMAL;

        initializeComputerControl();
    }
} // changeControl


// ===============================================================================================
// FRAMEWORK t_d
// ===============================================================================================
/**
 * This function creates a new Canvas, paints all Shapes on it and returns the Canvas.
 * See:
 * - https://davidwalsh.name/convert-canvas-image
 *
 * @returns {element} The Canvas with the Image painted on it
 * 
 * @param {number} canvasSize_ - The Width and Height of the Canvas
 * @param {Object[]} shapeList_ - An Array with all Shapes
 * @param {number} shapeList_[].shape - The Type of the current Shape
 * @param {string} shapeList_[].fillStyle - The Fill-Style of the current Shape
 * @param {string} shapeList_[].strokeStyle - The Stroke-Style of the current Shape
 * @param {string} shapeList_[].lineWidth - The Line-Width of the current Shape
 * 
 * @param {number} shapeList_[].position - The Position of a Circle or Rectangle (X-Position = Y-Position = position)
 * @param {number} shapeList_[].size - The Radius of a Circle or the Height and Width of a Rectangle (Radius = Width = Height = size)
 * @param {number} shapeList_[].startX - Starting X-Position of a Line
 * @param {number} shapeList_[].startY - Starting Y-Position of a Line
 * @param {number} shapeList_[].endX - End X-Position of a Line
 * @param {number} shapeList_[].endY - End Y-Position of a Line
*/
function createImage(canvasSize_, shapeList_) {
    let canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");

    canvas.width = canvasSize_;
    canvas.height = canvasSize_;

    for (let currentShapeIndex in shapeList_) {
        context.save();
        context.beginPath();

        let size = shapeList_[currentShapeIndex].size,
            position = shapeList_[currentShapeIndex].position,
            xPosition = (typeof (position) == typeof []) ? (position[0]) : (position),
            yPosition = (typeof (position) == typeof []) ? (position[1]) : (position);

        switch (shapeList_[currentShapeIndex].shape) {
            // Draw a Rectangle
            case (0):
                context.rect(xPosition, yPosition, size, size);
                break;
            // Draw a Circle
            case (1):
                context.arc(xPosition, yPosition, size, 0, (2 * Math.PI));
                break;
            // Draw a Line
            case (2):
                context.moveTo(shapeList_[currentShapeIndex].startX, shapeList_[currentShapeIndex].startY);
                context.lineTo(shapeList_[currentShapeIndex].endX, shapeList_[currentShapeIndex].endY);
                break;
            // Draw a Hexagon
            case (3):
                let delX = (Math.cos((1 / 3) * Math.PI) * size),
                    delY = (Math.sin((1 / 3) * Math.PI) * size);

                context.moveTo(xPosition - size, yPosition);
                context.lineTo(xPosition - delX, yPosition - delY);
                context.lineTo(delX + xPosition, yPosition - delY);
                context.lineTo(size + xPosition, yPosition);
                context.lineTo(delX + xPosition, delY + yPosition);
                context.lineTo(xPosition - delX, delY + yPosition);
                context.lineTo(xPosition - size, yPosition);

                break;
        }

        if (shapeList_[currentShapeIndex].fillStyle) {
            context.fillStyle = shapeList_[currentShapeIndex].fillStyle;
            context.fill();
        }

        if (shapeList_[currentShapeIndex].strokeStyle) {
            context.strokeStyle = shapeList_[currentShapeIndex].strokeStyle;

            if (shapeList_[currentShapeIndex].lineWidth) {
                context.lineWidth = shapeList_[currentShapeIndex].lineWidth;
            }

            context.stroke();
        }

        context.closePath();
        context.restore();
    }

    return (canvas);
} // createImage

/**
 * Draw an Image on the Animation-Canvas.The specified Position is the Center of the Image.
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 * 
 * @param {element} image_ - The Canvas or the Image to Draw
 * @param {number} x_ -  The X-Position of the Center of the Image
 * @param {number} y_ - The Y-Position of the Center of the Image
 * @param {number} scalingFactor_ - The Scaling-Factor
*/
function renderImage(image_, x_, y_, scalingFactor_) {
    let imageSize = Math.floor(image_.width * scalingFactor_);

    Canvas.context.drawImage(image_, 0, 0, image_.width, image_.width,
        (x_ - (imageSize / 2)),
        (y_ - (imageSize / 2)),
        imageSize,
        imageSize);
} // renderImage

/**
 * Print a Message in the Console.
 * 
 * @param {string} prefix_ - The Prefix to the Message
 * @param {string} messageText_ - The Message to show
*/
function printMessage(prefix_, messageText_) {
    console.log("%c " + (prefix_ + " " + messageText_), "font-weight: bold; ");
} // printMessage

/**
 * Play a specified Sound.
 * See: 
 * - http://marcgg.com/blog/2016/11/01/javascript-audio/
 * - https://developer.mozilla.org/de/docs/Web/API/AudioContext
 *
 * @param {string} type_ - The Type of the Soundwave
 * @param {number} x_ - The Time to End the sound
 * @param {number} frequency_ - The Frequency of the sound
*/
function playSound(waveType_, x_, frequency_ = 400) {
    let oscilliator = SOUNDCONTEXT.createOscillator(),
        gain = SOUNDCONTEXT.createGain();

    oscilliator.connect(gain);

    oscilliator.type = waveType_;

    oscilliator.frequency.value = frequency_;

    gain.connect(SOUNDCONTEXT.destination);

    oscilliator.start(0);

    gain.gain.exponentialRampToValueAtTime(0.00001, SOUNDCONTEXT.currentTime + x_);
} // playSound

// ===============================================================================================
// CANVAS t_e
// ===============================================================================================
// The Canvas-Class
class NewCanvas {
    /**
     * Create a new Canvas-Object to manage and control Animations and Effects on this Canvas.
     *
     * @param {string} elementId_ - The ID of the Canvas-Element
    */
    constructor(elementId_) {
        this.canvas = getEle(elementId_);
        this.context = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.updateResolution();
    } // constructor

    /**
     * Update the Resolution of the Canvas to match the Displays Resolution. Also the Canvas will be resized.
    */
    updateResolution() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        setCSS(this.canvas, "width", this.width + "px");
        setCSS(this.canvas, "height", this.height + "px");
        // Scale Canvas
        this.canvas.width = Math.round(this.width * CANVAS_SCALING_FACTOR);
        this.canvas.height = Math.round(this.height * CANVAS_SCALING_FACTOR);
        this.context.scale(CANVAS_SCALING_FACTOR, CANVAS_SCALING_FACTOR);
    } // updateResolution

    /**
     * Clear the Canvas.
    */
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    } // clear
} // NewCanvas

// ===============================================================================================
// WINDOWS t_f
// ===============================================================================================
/**
 * Change the Visibility of an Element.
 * 
 * @param {string} elementId_ - The ID of the Element
*/
function changeWindowVisibility(elementId_) {
    if (getCSS(elementId_, "display") == "block") {
        setCSS(elementId_, "display", "none");
    }
    else {
        setCSS(elementId_, "display", "block");
    }
} // changeWindowVisibility

/**
 * Make an Element draggable.
 * 
 * @param {element} element_ - A DOM-Element, which should be draggable
*/
function makeElementDraggable(element_) {
    let startX = 0,
        startY = 0,
        finalX = 0,
        finalY = 0;

    // Set Event, when the Mouse is Pressed over the Header
    getEle(element_.id + "header").onmousedown = dragMouseDown;

    // Start Dragging the Element
    function dragMouseDown(e_) {
        Game.processMouseInput = false;

        e_ = (e_ || window.event);

        startX = e_.clientX;
        startY = e_.clientY;

        document.onmouseup = closeDragElement;

        document.onmousemove = elementDrag;
    } // dragMouseDown

    // Move the Element
    function elementDrag(e_) {
        e_ = (e_ || window.event);

        finalX = startX - e_.clientX;
        finalY = startY - e_.clientY;

        startX = e_.clientX;
        startY = e_.clientY;

        setCSS(element_, "top", (element_.offsetTop - finalY) + "px");
        setCSS(element_, "left", (element_.offsetLeft - finalX) + "px");
    } // elementDrag

    // Finish Dragging the Element
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;

        Game.processMouseInput = true;
    } // closeDragElement
} // makeElementDraggable

/**
 * Focus an Element and move it into the view.
 * 
 * @param {string} elementId_ - The ID of the Element
*/
function focusElement(elementId_) {
    getEle(elementId_).scrollIntoView({ behavior: 'smooth' });
} // focusElement

// ===============================================================================================
// GENERAL EVENTS t_g
// ===============================================================================================
/*
 * Initialize the Document, when finished loading.
*/
window.addEventListener("DOMContentLoaded", () => {
    startMenuScreen();
}); // DOMContentLoaded

/*
 * If the Document will be Closed. 
*/
window.addEventListener("unload", () => {
    if (Game.gameRunning) {
        saveToLocalStorage();
    }
}); // beforeunload

/*
 * If the User Resizes the Window.
*/
window.addEventListener("resize", () => {
    Canvas.updateResolution();
    Effects.updateResolution();

    if (!Game.gameRunning) {
        Landscape.render();
        Landscape.renderObjects(0);
        Landscape.renderObjects(1);
    }
}); // resize

// ===============================================================================================
// BUTTONS t_h
// ===============================================================================================
/**
 * Initialize all Buttons and create the Event-Listeners.
*/
function initializeButtons() {
    let buttonList = document.getElementsByClassName("change-window-button");

    for (let buttonIterator = 0; buttonIterator < buttonList.length; buttonIterator++) {
        buttonList[buttonIterator].addEventListener("click", () => {
            changeWindowVisibility(buttonList[buttonIterator].id[buttonList[buttonIterator].id.length - 1]);
        });
    }

    for (let buttonIterator = 0; buttonIterator < LIST_MENUBUTTONS.length; buttonIterator++) {
        let image = "url(" + createImage(100, LIST_MENUBUTTONS[buttonIterator]).toDataURL("image/png") + ")"
        setCSS("open_" + String.fromCharCode(buttonIterator + 97), "backgroundImage", image);
    }
} // initializeButtons

// ===============================================================================================
// MOUSE t_i
// ===============================================================================================
// The Mouse-Class
class NewMouse {
    /**
     * Create a Mouse-Object, to manage and control Mouse-Input and Movement.
    */
    constructor() {
        this.inCanvasXPosition = 0;
        this.inCanvasYPosition = 0;

        this.inMapXPosition = 0;
        this.inMapYPosition = 0;

        this.pressedMouseButtons = [];
        this.overCanvas = false;
    } // constructor

    /**
     * Update the Position of the Mouse in the Window.
     * 
     * @param {event} evt_ - The current Mouse-Event
    */
    updateMousePosition(evt_) {
        let rect = Canvas.canvas.getBoundingClientRect();
        this.inCanvasXPosition = Math.round((evt_.clientX - rect.left) / (rect.right - rect.left) * Canvas.width);
        this.inCanvasYPosition = Math.round((evt_.clientY - rect.top) / (rect.bottom - rect.top) * Canvas.height);
    } // updateMousePosition

    /**
     * Update the Position of the Mouse on the Map.
    */
    calculateRelativePosition() {
        this.inMapXPosition = (Player.x - (Canvas.width / 2) + this.inCanvasXPosition);
        this.inMapYPosition = (Player.y - (Canvas.height / 2) + this.inCanvasYPosition);
    } // calculateRelativePosition

    /**
     * Render Preview, if the Player is Building something.
    */
    render() {
        if (Player.currentBuild != BUILDING_NOTHING) {
            let image = LIST_SPRITES[LISTOBJECTS[Player.currentBuild.object].sprite];
            renderImage(image, this.inCanvasXPosition, this.inCanvasYPosition, RENDER_NORMALSIZE);
        }
    } // render
} // NewMouse

// ===============================================================================================
// KEYBOARD t_j
// ===============================================================================================
/**
 * Process Keyboard-Input.
*/
function processKeyboardInput() {
    if (Player.currentBuild != BUILDING_NOTHING && PRESSED_KEYLIST[17]) {
        alignObjectWhileSetting();
    }

    Mouse.calculateRelativePosition();
} // processKeyboardInput

// ===============================================================================================
// TEXT t_k
// ===============================================================================================
// The Text-Class
class newText {
    /**
     * Create a Text-Object, to manage and process Texts on the Animation-Canvas.
    */
    constructor() {
        this.textList = [{ str: "", x: -10, y: -10, t: 1000 }];
        this.textTimer = Date.now();
    } // constructor

    /**
     * Create a new Text to show on the Animation-Canvas.
     * 
     * @param {string} text_ - The Text to display
     * @param {number} x_ - The X-Position of the Text
     * @param {number} y_ - The Y-Position of the Text
     * @param {number} time_ - The Time, the Text should be displayed in milliseconds
    */
    addText(text_, x_, y_, time_) {
        let notExitsing = true;

        for (let textIterator in this.textList) {
            if (this.textList[textIterator].str == text_) {
                notExitsing = false;

                break;
            }
        }

        if (notExitsing) {
            this.textList.push({ str: text_, x: x_, y: y_, t: time_ });
        }
    } // addText

    /**
     * Remove the currently displayed Text.
    */
    removeCurrentText() {
        this.textList.splice(0, 1);
    } // removeCurrentText

    /**
     * Update the Text-Object.
    */
    update() {
        if (this.textList.length == 0) { this.textTimer = Date.now(); }
        else {
            // If the time has passed
            if ((Date.now() - this.textTimer) >= this.textList[0].t) {
                this.removeCurrentText();
                this.textTimer = (Date.now() - 10);
            }
        }
    } // update

    /**
     * Render the First Element in the List.
    */
    render() {
        if (this.textList.length > 0) {
            Canvas.context.fillStyle = "black";
            Canvas.context.font = "20px Arial";
            Canvas.context.fillText(this.textList[0].str, this.textList[0].x, this.textList[0].y);
        }
    } // render
} // newText

// ===============================================================================================
// EFFECTS t_l
// ===============================================================================================
/**
 * Draw Lights.
*/
function renderLight() {
    try {
        Effects.clear();

        setCSS(Effects.canvas, "opacity", Math.abs(MAXOPACITY * Math.sin(Player.clockTime)));

        Effects.context.translate((-Player.x + (Effects.width / 2)), (-Player.y + (Effects.height / 2)));

        for (let objectIterator in Landscape.visibleObjects) {
            if (LISTOBJECTS[Landscape.objectList[Landscape.visibleObjects[objectIterator]].type].light) {
                Effects.context.beginPath();
                Effects.context.arc(
                    Landscape.objectList[Landscape.visibleObjects[objectIterator]].x,
                    Landscape.objectList[Landscape.visibleObjects[objectIterator]].y,
                    LISTOBJECTS[Landscape.objectList[Landscape.visibleObjects[objectIterator]].type].light,
                    0,
                    (2 * Math.PI));
                Effects.context.fillStyle = "#fdf0c3eb";
                Effects.context.fill();
                Effects.context.closePath();
            }
        }

        Effects.context.translate((Player.x - (Effects.width / 2)), (Player.y - (Effects.height / 2)));
    } catch (e) { }
} // renderLight

// ===============================================================================================
// PROJECTILE t_m
// ===============================================================================================
// The Projectile-Class
class NewProjectile {
    /**
     * Create a new Projectile.
     * 
     * @param {canvas} sprite_ - The Sprite of the Projectile
     * @param {number} x_ - The initial X-Position
     * @param {number} y_ - The initial Y-PositionPosition
     * @param {number} velX_ - The Velocity on the X-Axis
     * @param {number} velY_ - The Velocity on the Y-Axis
     * @param {number} range_ - The Range the Projectile is moving
     * @param {number} damage_ - The Damage the Projectile is dealing
    */
    constructor(sprite_, x_, y_, velX_, velY_, range_, damage_) {
        this.sprite = sprite_;

        this.x = x_;
        this.y = y_;

        this.velX = velX_;
        this.velY = velY_;

        this.range = range_;
        this.damage = damage_;

        this.movingTimer = Date.now();
    } // constructor

    /**
     * Update the Projectile.
    */
    update() {
        this.processMovement();

        this.checkForCollision();
    } // update

    /**
     * Process the Movement of the Particle.
    */
    processMovement() {
        let passedTime = ((Date.now() - this.movingTimer) / FRAMERATE);
        this.movingTimer = Date.now();

        this.x += (this.velX * passedTime);
        this.y += (this.velY * passedTime);
    } // processMovement

    /**
     * Check if the Particle is hitting something.
    */
    checkForCollision() {

    } // checkForCollision
} // NewProjectile

// ===============================================================================================
// CONTAINER t_n
// ===============================================================================================
// The Container-Class
class NewContainer {
    /**
     * Create a new Container.
     * 
     * @param {number} [maxSize_ = INVENTORY_SIZE] - The max. Amount of Items in the Container
    */
    constructor(maxSize_ = INVENTORY_SIZE) {
        this.maxSize = maxSize_;
        this.itemList = [];
    } // constructor

    /**
     * Load an exitisting Container.
     * 
     * @param {Object} savedata_ - The Object of the existing Container
    */
    load(savedata_) {
        Object.assign(this, savedata_);
    } // load

    /**
     * Add a new Item to the Container.
     * 
     * @param {number} item_ - The Item-Type
    */
    add(item_) {
        if (this.itemList.length < this.maxSize) {
            this.itemList.push(item_);
        }
    } // add

    /**
      * Remove an Item from the Container.
      * 
      * @param {Object[]} removeList_ - The List of Items to remove
      * @param {number} removeList_[].item - The Type of Item to remove
      * @param {number} removeList_[].amount - The Amount of this Item to remove
     */
    remove(removeList_) {
        for (let removeListIterator in removeList_) {
            let itemInventoryInstances = this.find(removeList_[removeListIterator].item);

            if (itemInventoryInstances.length < removeList_[removeListIterator].amount) {
                removeList_[removeListIterator].amount = itemInventoryInstances.length;
            }

            for (let currentItemAmount = (removeList_[removeListIterator].amount - 1); currentItemAmount >= 0; currentItemAmount--) {
                this.itemList.splice(itemInventoryInstances[currentItemAmount], 1);
            }
        }

    } // remove

    /**
     * Get the Indexes of all Instances of this Item in the Container.
     * 
     * @returns {Array} All Instances of this Item in the Container
     * 
     * @param {number} item_ - The Item to search for 
    */
    find(item_) {
        let allInstances = [];

        for (let inventoryIterator in this.itemList) {
            if (this.itemList[inventoryIterator] == item_) {
                allInstances.push(inventoryIterator);
            }
        }

        return (allInstances);
    } // find

    /**
     * Remove Items, if they don't fit into the inventory anymore.
    */
    reset() {
        if (this.itemList.length > this.maxSize) {
            this.itemList = this.itemList.slice((this.itemList.length - this.maxSize), (this.itemList.length));
        }
    } // reset

    /**
     * Is there still space left in the Container?
     * 
     * @returns {boolean} Is still Space left?
    */
    isFull() {
        if (this.itemList.length < this.maxSize) {
            return (true);
        }
        return (false);
    } // isFull
} // newContainer

// ===============================================================================================
// DYNAMIC_OBJECTS t_o
// ===============================================================================================
// The Cart-Class
class NewCart {
    /**
     * Creating a new Cart, which be dragged around.
     * 
     * @param {type} type_ - The Type of Cart
     * @param {number} x_ - The X-Position
     * @param {number} y_ - The Y-Position
    */
    constructor(type_, x_, y_) {
        this.type = type_;

        this.x = x_;
        this.y = y_;

        this.rotation = 0;
        this.sprite = LISTDYNAMIC[type_].sprite;

        this.size = LISTDYNAMIC[type_].size;

        this.isDragged = LISTDYNAMIC[type_].draggable;
    } // constructor

    /**
     * Update this Cart.
    */
    update() {
        if (this.isDragged) {
            this.rotation = Math.atan2((this.y - Player.y), (this.x - Player.x));
            if (this.rotation < 0) this.rotation = ((2 * Math.PI) + this.rotation);

            let deltaX = (Player.x - this.x),
                deltaY = (Player.y - this.y),
                distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
                minimalDistance = (this.size + (Player.size / 2) + 15);

            // console.log(deltaX, deltaY, distance);
            if(distance >= minimalDistance) {
                this.x += ((deltaX / ((deltaX != 0) ? (Math.abs(deltaX)) : (0.1))) * Player.maxVelocity);
                this.y += ((deltaY / ((deltaY != 0) ? (Math.abs(deltaY)) : (0.1))) * Player.maxVelocity);
            }

            
        }
    } // update

    /**
     * Render this Cart, with the current Rotation.
    */
    render() {
        Canvas.context.save();

        let xpos = ((-Player.x + (Canvas.width / 2)) + this.x),
            ypos = ((-Player.y + (Canvas.height / 2)) + this.y);

        Canvas.context.translate(xpos, ypos);

        Canvas.context.rotate(this.rotation);

        renderImage(LIST_SPRITES[this.sprite], 0, 0, 1);

        Canvas.context.restore();
    } // render
} // NewCart

/**
 * Render all visible Verhicles and Carts.
*/
function renderDynamic() {
    for (let dynamicIterator in DynamicList) {
        DynamicList[dynamicIterator].update();
        DynamicList[dynamicIterator].render();
    }
} // renderDynamic

// ===============================================================================================
// PLAYER t_p
// ===============================================================================================
// The Player-Class
class NewPlayer {
    /**
     * Create the Player-Object.
    */
    constructor() {
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.maxHunger = 100;
        this.hunger = this.maxHunger;
        this.size = 42;

        this.x = ((FIELD_AMOUNT * FIELD_SIZE) / 2);
        this.y = this.x;

        this.isPunching = false;
        this.hittingCycleCounter = 0;

        this.velX = 0;
        this.velY = 0;
        this.acceleration = 0.1;
        this.deceleration = 0.9;
        this.maxVelocity = 1;
        this.rotation = (Math.PI / 2);

        this.aimX = this.x;
        this.aimY = this.y;

        this.inventory = new NewContainer();
        this.harvest = HARVESTING_NOTHING;

        this.constructions = [];
        this.currentBuild = BUILDING_NOTHING;

        this.evolutionPoints = 0;
        this.discoveredItems = [];
        this.evolutions = [0];

        this.recipes = [];
        this.equipment = [EQUIPED_NOTHING, EQUIPED_NOTHING,
            EQUIPED_NOTHING, EQUIPED_NOTHING];

        this.clockTime = 0;
        this.hungerTimer = Date.now();
        this.lastMovementTimer = Date.now();
    } // constructor

    /**
     * Load an existing Character from a Savefile.
     * 
     * @param {Object} savefile_ - The Savefile
    */
    load(savefile_) {
        Object.assign(this, savefile_);

        this.inventory = new NewContainer();
        this.inventory.load(savefile_.inventory);

        this.lastMovementTimer = Date.now();
        this.hungerTimer = Date.now();
    } // load

    /**
     * Update the Player.
    */
    update() {
        this.resetStats();

        if (Game.controlType == CONTROL_TOUCH) {
            this.processPath();
        }

        if ((this.velX != 0 || this.velY != 0) && Game.processKeyboardInput) {
            let nearestObjectData = Landscape.checkIfOverlapping((this.x + this.velX), this.y, (this.size / 2));
            if (nearestObjectData.distance <= 0 && !LISTOBJECTS[Landscape.objectList[nearestObjectData.index].type].passable) {
                this.velX = (this.velX > 0) ? (-0.2) : (0.2);
            }
            nearestObjectData = Landscape.checkIfOverlapping(this.x, (this.y + this.velY), (this.size / 2));
            if (nearestObjectData.distance <= 0 && !LISTOBJECTS[Landscape.objectList[nearestObjectData.index].type].passable) {
                this.velY = (this.velY > 0) ? (-0.2) : (0.2);
            }

            // let nearestObject = Landscape.checkIfOverlapping((this.x + this.velX), (this.y + this.velY), (this.size / 2));
            // if(nearestObject.distance <= 0 && !LISTOBJECTS[Landscape.objectList[nearestObject.index].type].passable) {
            //     this.velX = 0;
            //     this.velY = 0;
            //     let radius = (this.size + Landscape.objectList[nearestObject.index].size),
            //         absDelX = Math.abs(nearestObject.deltaX),
            //         absDelY = Math.abs(nearestObject.deltaY);

            //     if(absDelX > absDelY) {

            //     }
            //     else {

            //     }
            // }

            let objectInRadius = Landscape.checkRadiusForObject(this.x, this.y, ((this.size / 2) + 4));
            if (this.harvest == HARVESTING_NOTHING && objectInRadius != -1) {
                this.harvest = objectInRadius;

                if (Landscape.objectList[this.harvest].storage) {
                    setHTML("gameHeader", (LISTOBJECTS[Landscape.objectList[this.harvest].type].obj + " - Press Space!"));
                }
                else {
                    setHTML("gameHeader", (LISTOBJECTS[Landscape.objectList[this.harvest].type].obj));
                }
            }

            this.processMovement();

            if (this.harvest != -1 && Landscape.objectList[this.harvest] == undefined) {
                this.harvest = HARVESTING_NOTHING;
            }

            if (this.harvest != HARVESTING_NOTHING) {
                this.checkHarvestObject();
            }
        }
        else {
            this.lastMovementTimer = Date.now();
            this.velX = 0;
            this.velY = 0;
        }
    } // update

    /**
     * Draw the Player in the Middle of the Canvas.
    */
    render() {
        Canvas.context.save();

        Canvas.context.translate((Canvas.width / 2), (Canvas.height / 2));

        Canvas.context.rotate(this.rotation);

        // Draw Body
        Canvas.context.beginPath();
        Canvas.context.rect(-(this.size / 2), -(this.size / 2), this.size, this.size);
        Canvas.context.fillStyle = "#969696";
        Canvas.context.fill();
        Canvas.context.strokeStyle = "#000";
        Canvas.context.stroke();
        Canvas.context.closePath();

        // Movement
        let handSize = 12;

        // Punching-Animation
        let leftHandMovement = 0,
            rightHandMovement = 0;
        // The Left Hand
        if (this.hittingCycleCounter >= 0 && this.hittingCycleCounter <= 100) {
            leftHandMovement = Math.abs(Math.sin((this.hittingCycleCounter / 100) * Math.PI) * PUNCHING_DISTANCE);
        }
        // The Right Hand
        else if (this.hittingCycleCounter >= 100 && this.hittingCycleCounter <= 200) {
            rightHandMovement = Math.abs(Math.sin((this.hittingCycleCounter / 100) * Math.PI) * PUNCHING_DISTANCE);
        }

        // Only hit with one Hand, if only one Item is equiped
        if (this.equipment[0] == EQUIPED_NOTHING && this.equipment[1] != EQUIPED_NOTHING) {
            leftHandMovement = Math.max(leftHandMovement, rightHandMovement);
            rightHandMovement = 0;
        }
        if (this.equipment[0] != EQUIPED_NOTHING && this.equipment[1] == EQUIPED_NOTHING) {
            rightHandMovement = Math.max(leftHandMovement, rightHandMovement);
            leftHandMovement = 0;
        }

        // Draw Tools
        for (let equipmentIterator in this.equipment) {
            if (this.equipment[equipmentIterator] != EQUIPED_NOTHING) {
                let movementPosition = 0;
                if (equipmentIterator == 0) { movementPosition = rightHandMovement; }
                if (equipmentIterator == 1) { movementPosition = leftHandMovement; }
                renderImage(LIST_SPRITES[LISTEQUIPMENT[this.equipment[equipmentIterator]].sprite], -movementPosition, 0, RENDER_NORMALSIZE);
            }
        }

        // Draw Hands
        Canvas.context.beginPath();
        Canvas.context.fillStyle = "#969696";
        Canvas.context.strokeStyle = "#000";
        Canvas.context.rect(-(handSize / 2) - leftHandMovement, ((this.size / 2) - (handSize / 2) + 2), handSize, handSize);
        Canvas.context.rect(-(handSize / 2) - rightHandMovement, (-(this.size / 2) - (handSize / 2) - 2), handSize, handSize);
        Canvas.context.fill();
        Canvas.context.stroke();
        Canvas.context.closePath();

        Canvas.context.restore();
    } // render

    /**
     * Render the current Stats of the Player.
    */
    renderStats() {
        Canvas.context.fillStyle = "#A00101";
        Canvas.context.fillRect((window.innerWidth / 2), 5, (window.innerWidth * 0.3) * (this.health / this.maxHealth), (window.innerHeight * 0.02));
        Canvas.context.fillStyle = "#0DA702";
        Canvas.context.fillRect((window.innerWidth / 2) - (window.innerWidth * 0.3) * (this.hunger / this.maxHunger), 5, (window.innerWidth * 0.3) * (this.hunger / this.maxHunger), (window.innerHeight * 0.02));
    } // renderStats

    /**
     * Reset and Update Values and Parameters.
    */
    resetStats() {
        if (this.x < 0) { this.x = 0; this.velX = 0; }
        else if (this.x > (FIELD_AMOUNT * FIELD_SIZE)) { this.x = (FIELD_AMOUNT * FIELD_SIZE); this.velX = 0; }
        else if (this.y < 0) { this.y = 0; this.velY = 0; }
        else if (this.y > (FIELD_AMOUNT * FIELD_SIZE)) { this.y = (FIELD_AMOUNT * FIELD_SIZE); this.velY = 0; }

        this.velX *= this.deceleration;
        if (Math.abs(this.velX) < 0.04) this.velX = 0;
        this.velY *= this.deceleration;
        if (Math.abs(this.velY) < 0.04) this.velY = 0;

        if (Game.controlType == CONTROL_NORMAL) {
            this.rotation = Math.atan2(((Canvas.height / 2) - Mouse.inCanvasYPosition), ((Canvas.width / 2) - Mouse.inCanvasXPosition));
            if (this.rotation < 0) this.rotation = ((2 * Math.PI) + this.rotation);
        }
        else if (this.velX != 0 || this.velY != 0) {
            this.rotation = Math.atan2(this.velY, this.velX);
            if (this.rotation < 0) this.rotation = ((2 * Math.PI) + this.rotation);
        }

        let passedHungerTime = Date.now() - this.hungerTimer;
        if (passedHungerTime > HUNGERTIMER) {
            this.hungerTimer = (Date.now() - (passedHungerTime % HUNGERTIMER));

            if (this.hunger > 0) {
                this.hunger -= 1;
            }
            else {
                this.health -= 1;
            }
        }

        if (this.isPunching) {
            this.hittingCycleCounter += 5;

            if (this.hittingCycleCounter % 100 == 0 && this.hittingCycleCounter != 0) {
                this.isPunching = false;
            }
            if (this.hittingCycleCounter > 200) {
                this.hittingCycleCounter = 0;
            }
        }
    } // resetStats

    /**
     * Reset all Effects of the equiped tools.
    */
    resetEffects() {
        this.inventory.maxSize = INVENTORY_SIZE;

        for (let equipmentIterator in this.equipment) {
            if (this.equipment[equipmentIterator] != EQUIPED_NOTHING) {
                let currentEquipment = this.equipment[equipmentIterator];

                for (let effectIterator in LISTEQUIPMENT[currentEquipment].effects) {
                    let currentEffect = LISTEQUIPMENT[currentEquipment].effects[effectIterator];

                    switch (currentEffect.type) {
                        case (EFFECT_INVENTORY):
                            this.inventory.maxSize = (INVENTORY_SIZE + currentEffect.info);
                            break;
                    }
                }
            }
        }
    } // resetEffects

    /**
     * If Touch-Control is active. Process and Update the current Path of the Player.
    */
    processPath() {
        let deltaX = this.x - this.aimX,
            deltaY = this.y - this.aimY;

        if (deltaX != 0) {
            if (deltaX > 0) {
                if (this.velX > -this.maxVelocity) {
                    this.velX -= this.acceleration;
                }
            }
            else {
                if (this.velX < this.maxVelocity) {
                    this.velX += this.acceleration;
                }
            }
        }

        if (deltaY != 0) {
            if (deltaY > 0) {
                if (this.velY > -this.maxVelocity) {
                    this.velY -= this.acceleration;
                }
            }
            else {
                if (this.velY < this.maxVelocity) {
                    this.velY += this.acceleration;
                }
            }
        }

        if (Math.abs(deltaX) < Math.abs(this.velX)) { this.velX = deltaX; }
        if (Math.abs(deltaY) < Math.abs(this.velY)) { this.velY = deltaY; }

        if (Math.abs(deltaX) < 0.4) { this.x = this.aimX; this.velX = 0; }
        if (Math.abs(deltaY) < 0.4) { this.y = this.aimY; this.velY = 0; }
    } // processPath

    /**
     * Move the Player on the Map.
    */
    processMovement() {
        let factor = ((Date.now() - this.lastMovementTimer) / FRAMERATE);
        this.lastMovementTimer = Date.now();

        this.x += (this.velX * factor);
        this.y += (this.velY * factor);
    } // processMovement

    /**
     * Process Keyboard-Input.
    */
    processInput() {
        // "W"-Key or "UpArow"-Key is pressed
        if (PRESSED_KEYLIST[87] || PRESSED_KEYLIST[38]) {
            if (this.velY > (-this.maxVelocity)) this.velY -= this.acceleration;
        }
        // "S"-Key  or "DownArow"-Key is pressed
        else if (PRESSED_KEYLIST[83] || PRESSED_KEYLIST[40]) {
            if (this.velY < (this.maxVelocity)) this.velY += this.acceleration;
        }
        // "D"-Key  or "RightArow"-Key is pressed
        if (PRESSED_KEYLIST[68] || PRESSED_KEYLIST[39]) {
            if (this.velX < (this.maxVelocity)) this.velX += this.acceleration;
        }
        // "A"-Key or "LeftArow"-Key is pressed
        else if (PRESSED_KEYLIST[65] || PRESSED_KEYLIST[37]) {
            if (this.velX > (-this.maxVelocity)) this.velX -= this.acceleration;
        }
        
        
        // Left- Mouse-Button or "Space"-Key
        if ((PRESSED_KEYLIST[32] || Mouse.pressedMouseButtons[1]) && Mouse.overCanvas) {
            this.gatherItem();
            this.collectDropped();

            this.updateWindows();
        }
    } // processInput

    /**
     * Check if the Position is near the Player.
     * 
     * @return {boolean} Is the Position near the Player
     * 
     * @param {number} x_ - The X-Position
     * @param {number} y_ - The Y-Position
    */
    checkIfNearPlayer(x_, y_) {
        let deltaX = this.x - x_,
            deltaY = this.y - y_,
            distance = Math.sqrt(Math.pow(deltaX, 2) + (deltaY, 2));

        if (distance < Math.sqrt(Math.pow((window.innerWidth * 1.5), 2) + ((window.innerHeight * 1.5), 2))) {
            return (true);
        }
        return (false);
    } // checkIfNearPlayer

    /**
     * Check if the Player is still near the same Object to harvest.
    */
    checkHarvestObject() {
        let deltaX = (this.x - Landscape.objectList[this.harvest].x),
            deltaY = (this.y - Landscape.objectList[this.harvest].y),
            distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        if (distance > (Landscape.objectList[this.harvest].size + (this.size / 2) + 4)) {
            this.harvest = HARVESTING_NOTHING;
            setHTML("gameHeader", "");

            setCSS("g", "display", "none");
            setHTML("storageList", "");

            this.updateWindows();
        }
    } // checkHarvestObject

    /**
     * Check if a new Item is discovered.
     * 
     * @param {number} item_ - The Item to check
    */
    checkIfDiscovered(item_) {
        let itemAlreadyDiscovered = false;

        for (let discoveredListIterator in this.discoveredItems) {
            if (this.discoveredItems[discoveredListIterator] == item_) {
                itemAlreadyDiscovered = true;
                break;
            }
        }

        if (!itemAlreadyDiscovered) {
            this.discoveredItems.push(item_);
            this.evolutionPoints += 20;
        }
    } // checkIfDiscovered

    /**
     * Update all Windows.
    */
    updateWindows() {
        // Inventory
        let inventoryInnerHtml = "";

        for (let inventoryIterator in this.inventory.itemList) {
            inventoryInnerHtml +=
                "<li class='window-list-element window-list-element-item' style='background-color: " + LISTITEMS[this.inventory.itemList[inventoryIterator]].color + "'> " +
                LISTITEMS[this.inventory.itemList[inventoryIterator]].name + "<div class='window-list-element-buttons'>";

            if (this.harvest != -1 && Landscape.objectList[this.harvest] != undefined && Landscape.objectList[this.harvest].storage) {
                inventoryInnerHtml +=
                    "<button class='window-list-element-button' onclick='manageStorage(" + this.harvest + ", STORAGE_PUTIN, " + inventoryIterator + ")'>>></button>";
            }
            else {
                if (LISTITEMS[this.inventory.itemList[inventoryIterator]].use) {
                    inventoryInnerHtml +=
                        "<button class='window-list-element-button' onclick='Player.useItem(" + this.inventory.itemList[inventoryIterator] + ")'>Use</button>";
                }

                if (LISTITEMS[this.inventory.itemList[inventoryIterator]].tool != undefined) {
                    inventoryInnerHtml +=
                        "<button class='window-list-element-button' onclick='Player.equipItem(" + this.inventory.itemList[inventoryIterator] + ")'>Equip</button>";
                }
            }

            inventoryInnerHtml +=
                "<button class='window-list-element-button window-list-element-remove' onclick='Player.dropItem(" + this.inventory.itemList[inventoryIterator] + ");'>X</button>" +
                "</div></li>";
        }

        setHTML("itemList", inventoryInnerHtml);

        // Constructions
        let constructionsInnerHtml = "";

        for (let constructionIterator in this.constructions) {
            let titleText = "";
            for (let itemIterator in LISTCONSTRUCTIONS[this.constructions[constructionIterator]].necessary) {
                let nessecary = LISTCONSTRUCTIONS[this.constructions[constructionIterator]].necessary[itemIterator];
                titleText += (this.inventory.find(nessecary.item).length + "/" + nessecary.amount + " " +
                    LISTITEMS[nessecary.item].name + "  ");
            }

            constructionsInnerHtml +=
                "<li class='window-list-element' title='" + titleText + "'>" +
                LISTOBJECTS[LISTCONSTRUCTIONS[this.constructions[constructionIterator]].object].obj +
                "<button class='window-list-element-button' onclick='Player.currentBuild = LISTCONSTRUCTIONS[Player.constructions[" + constructionIterator + "]]'>Build!</button>" +
                "</li>";
        }

        setHTML("constructionList", constructionsInnerHtml);

        // Recipes
        let recipesInnerHtml = "";

        for (let recipeIterator in this.recipes) {
            let titleText = "";
            for (let itemIterator in LISTRECIPES[this.recipes[recipeIterator]].necessaryItems) {
                let nessecary = LISTRECIPES[this.recipes[recipeIterator]].necessaryItems[itemIterator];
                titleText += (this.inventory.find(nessecary.item).length + "/" + nessecary.amount + " " +
                    LISTITEMS[nessecary.item].name + "  ");
            }

            recipesInnerHtml +=
                "<li class='window-list-element' title='" + titleText + "'>" +
                LISTITEMS[LISTRECIPES[this.recipes[recipeIterator]].item].name +
                "<button class='window-list-element-button' onclick='Player.craftItem(" + this.recipes[recipeIterator] + ")'>Craft</button>" +
                "</li>";
        }

        setHTML("recipeList", recipesInnerHtml);

        // Equipment
        let equipmentInnerHtml = "";

        for (let equipmentIterator in this.equipment) {
            if (this.equipment[equipmentIterator] != EQUIPED_NOTHING) {
                equipmentInnerHtml +=
                    "<li class='window-list-element'>" +
                    LISTITEMS[LISTEQUIPMENT[this.equipment[equipmentIterator]].item].name +
                    "<button class='window-list-element-button' onclick='Player.unequipItem(" + this.equipment[equipmentIterator] + ")'>Unequip</button>" +
                    "</li>";
            }
        }

        setHTML("equipedList", equipmentInnerHtml);

        // Update Evolutions
        setHTML("evolutionPoints", ("Points: " + this.evolutionPoints));

        let evolutionsInnerHtml = "";

        for (let evolutionIterator in this.evolutions) {
            evolutionsInnerHtml +=
                "<li class='window-list-element'>" +
                LISTEVOLUTIONS[this.evolutions[evolutionIterator]].name +
                "<button class='window-list-element-button' onclick='Player.getEvolution(" +
                this.evolutions[evolutionIterator] + ")'>Get</button>" +
                "</li>";
        }

        setHTML("evolutionList", evolutionsInnerHtml);
    } // updateWindows

    /**
     * Open a Storage near the Player.
    */
    openStorage() {
        setCSS("b", "display", "block");
        setCSS("g", "display", "block");
        
        let itemsInStorage = Landscape.objectList[this.harvest].storage,
            storageInnerHtml = "";

        for (let storageIterator in itemsInStorage) {
            storageInnerHtml +=
                "<li class='window-list-element window-list-element-item' style='background-color: " + LISTITEMS[itemsInStorage[storageIterator]].color + "'> " +
                LISTITEMS[itemsInStorage[storageIterator]].name;

            storageInnerHtml +=
                "<div class='window-list-element-buttons'><button class='window-list-element-button' onclick='manageStorage(" + this.harvest + ", STORAGE_PUTOUT, " + storageIterator + ");'><<</button>";

            storageInnerHtml +=
                "<button class='window-list-element-button window-list-element-remove' onclick='Landscape.objectList[" + this.harvest + "].storage.splice(" + storageIterator + ", 1);  Player.openStorage();'>X</button>" +
                "</div></li>";
        }

        setHTML("storageList", storageInnerHtml);

        this.updateWindows();
    } // openStorage

    /**
     * Collect dropped Items if possible.
    */
    collectDropped() {
        let removeList = [];

        for (let droppedIterator in Landscape.droppedItems) {
            if (this.inventory.isFull()) {
                let delX = this.x - Landscape.droppedItems[droppedIterator].x,
                    delY = this.y - Landscape.droppedItems[droppedIterator].y,
                    distance = Math.sqrt(Math.pow(delX, 2) + Math.pow(delY, 2));

                if (distance <= (this.size + DROPPED_SIZE)) {
                    this.checkIfDiscovered(Landscape.droppedItems[droppedIterator].item);
                    this.inventory.add(Landscape.droppedItems[droppedIterator].item);
                    removeList.push(droppedIterator);
                }
            }
            else {
                break;
            }
        }

        for (let removeIterator = (removeList.length - 1); removeIterator >= 0; removeIterator--) {
            Landscape.droppedItems.splice(removeList[removeIterator], 1);
        }
    } // collectDropped

    /**
     * Gather new Items.
    */
    gatherItem() {
        if (!this.isPunching) {
            if (this.harvest != HARVESTING_NOTHING) {
                Landscape.objectList[this.harvest].size -= LISTOBJECTS[Landscape.objectList[this.harvest].type].damaging;

                let currentObjectType = Landscape.objectList[this.harvest].type;

                if (LISTOBJECTS[currentObjectType].item != undefined) {
                    let probability = Math.random();

                    for (let itemGatherIterator in LISTOBJECTS[currentObjectType].item) {
                        if (probability >= LISTOBJECTS[currentObjectType].item[itemGatherIterator].get) {
                            let harvestItemAmount = 1;

                            if (this.equipment) {
                                for (let evolutionIterator in this.equipment) {
                                    if (this.equipment[evolutionIterator] != EQUIPED_NOTHING) {
                                        let effects = LISTEQUIPMENT[this.equipment[evolutionIterator]].effects;

                                        for (let effectIterator in effects) {
                                            if (effects[effectIterator].type == EFFECT_HARVESTINCREASE) {
                                                for (let effectObjectIterator in effects[effectIterator].info.i) {
                                                    if (Landscape.objectList[this.harvest].type == effects[effectIterator].info.i[effectObjectIterator]) {
                                                        harvestItemAmount += effects[effectIterator].info.f;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            for (let currentItemAmount = 0; currentItemAmount < harvestItemAmount; currentItemAmount++) {
                                if (this.inventory.isFull()) {
                                    this.checkIfDiscovered(LISTOBJECTS[currentObjectType].item[itemGatherIterator].item);
                                    this.inventory.add(LISTOBJECTS[currentObjectType].item[itemGatherIterator].item);
                                }
                                else {
                                    Landscape.droppedItems.push({ x: Player.x, y: Player.y, item: LISTOBJECTS[currentObjectType].item[itemGatherIterator].item, time: Date.now() });
                                    textManager.addText("I can't carry more!", (Canvas.width / 2 - 95), (Canvas.height / 2 - 50), 400);
                                }
                            }
                        }

                    }
                }
            }

            this.isPunching = true;
        }
    } // gatherItem

    /**
     * Drop an Item on the Floor.
     * 
     * @param {number} item_ - The Type of Item to drop
    */
    dropItem(item_) {
        Landscape.droppedItems.push({ x: this.x, y: this.y, item: item_, time: Date.now() });
        this.inventory.remove([{ item: item_, amount: 1 }]);

        this.updateWindows();
    } // dropItem

    /**
     * Use an Item.
     * 
     * @param {number} item_ - The Item to use
    */
    useItem(item_) {
        let itemInstances = this.inventory.find(item_);

        if (itemInstances.length > 0) {
            if (LISTITEMS[item_].use) {
                switch (LISTITEMS[item_].use.type) {
                    case (USE_EAT):
                        if (this.hunger < this.maxHunger) {
                            this.hunger = Math.min(this.maxHunger, (this.hunger + LISTITEMS[item_].use.info));
                            this.inventory.remove([{ item: item_, amount: 1 }]);

                            if (LISTITEMS[item_].use.responseItem) {
                                this.inventory.add(LISTITEMS[item_].use.responseItem);
                            }
                        }
                        break;
                    case (USE_BUILD):
                        this.currentBuild = {
                            object: LISTITEMS[item_].use.info,
                            necessary: [{ item: item_, amount: 1 }]
                        };
                        break;
                }
            }
        }

        this.updateWindows();
    } // useItem

    /**
     * Craft a new Item, with a recipe.
     * 
     * @param {number} recipe_: The Index of the Recipe in LISTRECIPES to Use
    */
    craftItem(recipe_) {
        let neededItemsList = LISTRECIPES[recipe_].necessaryItems;
        for (let neededItemIterator in neededItemsList) {
            if (this.inventory.find(neededItemsList[neededItemIterator].item).length <
                neededItemsList[neededItemIterator].amount) {

                textManager.addText("I don't have all nessecary items!", (Canvas.width / 2 - 165), (Canvas.height / 2 - 50), 800);
                return;
            }
        }

        this.checkIfDiscovered(LISTRECIPES[recipe_].item);
        this.inventory.remove(LISTRECIPES[recipe_].necessaryItems);
        this.inventory.add(LISTRECIPES[recipe_].item);

        this.updateWindows();
    } // craftItem

    /**
     * Equip an Item.
     * 
     * @param {Number} item_ - The Item to Equip
    */
    equipItem(item_) {
        if (LISTITEMS[item_].tool != undefined) {
            if (this.equipment[LISTEQUIPMENT[LISTITEMS[item_].tool].position] == EQUIPED_NOTHING) {
                this.inventory.remove([{ item: item_, amount: 1 }]);

                this.equipment[LISTEQUIPMENT[LISTITEMS[item_].tool].position] = LISTITEMS[item_].tool;
            }
            else {
                textManager.addText("Unequip the other item first!", (Canvas.width / 2 - 145), (Canvas.height / 2 - 50), 800);
            }
        }
        else {
            textManager.addText("I can't equip that!", (Canvas.width / 2 - 95), (Canvas.height / 2 - 50), 800);
        }

        this.resetEffects();

        this.updateWindows();
    } // equipItem

    /**
     * Unequip an Item and put it bach into the Inventory.
     * 
     * @param {number} equipedItem_ - The Index of the equiped Tool in LISTEQUIPMENT
    */
    unequipItem(equipedItem_) {
        if (this.inventory.isFull()) {
            Player.inventory.add(LISTEQUIPMENT[equipedItem_].item);

            this.equipment[LISTEQUIPMENT[equipedItem_].position] = EQUIPED_NOTHING;
        }

        this.resetEffects();
        this.inventory.reset();

        this.updateWindows();
    } // unequipItem

    /**
     * Get a new Evolution.
     * 
     * @param {number} evolution_ - The Evolution to buy
    */
    getEvolution(evolution_) {
        for (let evolutionIterator in this.evolutions) {
            if (this.evolutions[evolutionIterator] == evolution_) {
                if (this.evolutionPoints >= LISTEVOLUTIONS[evolution_].neededPoints) {
                    let improvements = LISTEVOLUTIONS[this.evolutions[evolutionIterator]].improvements;
                    for (let improvementIterator in improvements) {
                        switch (improvements[improvementIterator].type) {

                            case (IMPROV_EVOL): this.evolutions.push(improvements[improvementIterator].index); break;

                            case (IMPROV_RECI): this.recipes.push(improvements[improvementIterator].index); break;

                            case (IMPROV_CONS): this.constructions.push(improvements[improvementIterator].index); break;
                        }
                    }

                    this.evolutions.splice(evolutionIterator, 1);

                    this.evolutionPoints -= LISTEVOLUTIONS[evolution_].neededPoints;

                    this.updateWindows();
                }
                else {
                    textManager.addText("I don't have enough Points!", (Canvas.width / 2 - 135), (Canvas.height / 2 - 50), 800);
                }
            }
            break;
        }
    } // getEvolution

    /**
     * Build a new Object.
    */
    build() {
        if (Landscape.checkRadiusForObject(Mouse.inMapXPosition, Mouse.inMapYPosition,
            LISTOBJECTS[this.currentBuild.object].size) == -1) {

            let removeItemsList = [],
                necessaryItemsList = this.currentBuild.necessary;

            for (let itemIterator in necessaryItemsList) {
                if (this.inventory.find(necessaryItemsList[itemIterator].item).length < necessaryItemsList[itemIterator].amount) {
                    textManager.addText("I don't have enough Items!", (Canvas.width / 2 - 130), (Canvas.height / 2 - 50), 2000);
                    return;
                }

                removeItemsList.push({ item: necessaryItemsList[itemIterator].item, amount: necessaryItemsList[itemIterator].amount });
            }

            this.inventory.remove(removeItemsList);

            Landscape.addObject(
                this.currentBuild.object,
                Mouse.inMapXPosition,
                Mouse.inMapYPosition,
                (LISTOBJECTS[this.currentBuild.object].minSize || LISTOBJECTS[this.currentBuild.object].size)
            );

            if (this.currentBuild.callback) {
                this.currentBuild.callback();
            }

            this.currentBuild = BUILDING_NOTHING;
        }
        else {
            textManager.addText("I can't build there!", (Canvas.width / 2 - 95), (Canvas.height / 2 - 50), 2000);
        }

        this.updateWindows();
    } // build
} // NewPlayer

// ===============================================================================================
// NPC t_q
// ===============================================================================================
// The NPC-Class
class NewNPC {
    /**
     * Create a new NPC.
    */
    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;

        this.velX = 0;
        this.velY = 0;

        this.rotate = 0;
        this.size = 30;

        this.sprite = createImage(60, [{ "name": "Body", "shape": 3, "size": 28, "position": 30, "fillStyle": "#707070", "strokeStyle": "#373737", "lineWidth": "4" }, { "name": "Shape_2", "shape": 2, "startX": 22, "startY": 35, "endX": 22, "endY": 45, "strokeStyle": "#fff", "lineWidth": "10" }, { "name": "Shape_2", "shape": 2, "startX": 22, "startY": 15, "endX": 22, "endY": 25, "strokeStyle": "#fff", "lineWidth": "10" }]);

        this.lastMovementTimer = Date.now();
        this.pathMovementTimer = Date.now();
    } // constructor

    /**
     * Load an old NPC.
     * 
     * @param {Object} savefile_ - The old Data
    */
    load(savefile_) {
        Object.assign(this, savefile_);
        this.sprite = createImage(60, [{ "name": "Body", "shape": 3, "size": 28, "position": 30, "fillStyle": "#707070", "strokeStyle": "#373737", "lineWidth": "4" }, { "name": "Shape_2", "shape": 2, "startX": 22, "startY": 35, "endX": 22, "endY": 45, "strokeStyle": "#fff", "lineWidth": "10" }, { "name": "Shape_2", "shape": 2, "startX": 22, "startY": 15, "endX": 22, "endY": 25, "strokeStyle": "#fff", "lineWidth": "10" }]);
    } // load

    /**
     * Update the NPC.
    */
    update() {
        this.resetStats();

        this.updatePath();

        this.processMovement();
    } // update

    /**
     * Render this NPC.
    */
    render() {
        Canvas.context.save();

        let xpos = ((-Player.x + (Canvas.width / 2)) + this.x),
            ypos = ((-Player.y + (Canvas.height / 2)) + this.y);

        Canvas.context.translate(xpos, ypos);

        Canvas.context.rotate(this.rotate);

        renderImage(this.sprite, 0, 0, 1);

        Canvas.context.restore();
    } // render

    /**
     * Reset and Update stats.
    */
    resetStats() {
        this.rotation = Math.atan2(this.velY,
            this.velX);
        if (this.rotation < 0) this.rotation = ((2 * Math.PI) + this.rotation);

    } // resetStats

    /**
     * Update the Path and the Direction of the NPC.
    */
    updatePath() {
        if (this.velX == 0 && this.velY == 0) {
            if ((Date.now() - this.pathMovementTimer) >= 6000) {
                this.velX = (Math.round(Math.random() * 4) - 2),
                    this.velY = (Math.round(Math.random() * 4) - 2);

                this.pathMovementTimer = Date.now();
            }
        }
        else {
            if ((Date.now() - this.pathMovementTimer) >= 1000) {
                this.velX = 0;
                this.velY = 0;

                this.pathMovementTimer = Date.now();
            }
        }
    } // updatePath

    /**
     * Move the NPC on the Map.
    */
    processMovement() {
        let factor = ((Date.now() - this.lastMovementTimer) / FRAMERATE);
        this.lastMovementTimer = Date.now();

        this.x += (this.velX * factor);
        this.y += (this.velY * factor);
    } // processMovement
} // NewNPC

/**
 * Create NPC and place them on the Map.
*/
function createNPCs() {
    printMessage(SHOW_INFORMATION, "Set NPCs...");

    for (let currentNPCIterator in createNPCList) {
        let currentNPC = createNPCList[currentNPCIterator],
            minPosition = (currentNPC.minPos) ? (currentNPC.minPos) : (0),
            maxPosition = (currentNPC.maxPos) ? (currentNPC.maxPos) : (FIELD_AMOUNT * FIELD_SIZE);

        for (let currentNPCAmount = 0; currentNPCAmount < currentNPC.amount;) {
            let xpos = ((Math.random() * (maxPosition - minPosition)) + minPosition),
                ypos = ((Math.random() * (maxPosition - minPosition)) + minPosition),
                canbePlaced = true;

            for (let objectIterator in Landscape.objectList) {
                let delX = (xpos - Landscape.objectList[objectIterator].x),
                    delY = (ypos - Landscape.objectList[objectIterator].y),
                    distance = Math.sqrt(Math.pow(delX, 2) + Math.pow(delY, 2));

                if (distance <= (50 + Landscape.objectList[objectIterator].size)) {
                    canbePlaced = false;
                    break;
                }
            }

            for (let npcIterator in NPCList) {
                let delX = (xpos - NPCList[npcIterator].x),
                    delY = (ypos - NPCList[npcIterator].y),
                    distance = Math.sqrt(Math.pow(delX, 2) + Math.pow(delY, 2));

                if (distance <= 70) {
                    canbePlaced = false;
                    break;
                }
            }

            if (canbePlaced) {
                NPCList.push(new NewNPC(xpos, ypos));

                currentNPCAmount++;
            }
        }
    }

    printMessage(SHOW_INFORMATION, "NPCs set!");
} // createNPCs

/**
 * Load all NPC.
 * 
 * @param {Array} savedList_ - The Savefile-Data
*/
function loadNPCs(savedList_) {
    for (let npcIterator in savedList_) {
        let currentNPC = savedList_[npcIterator];
        let newNPCObject = new NewNPC(0, 0);
        newNPCObject.load(currentNPC);
        NPCList.push(newNPCObject);
    }
} // loadNPCs

/**
 * Update all NPCs on the Map.
*/
function updateNPCs() {
    for (let npcIterator in NPCList) {
        let currentNPC = NPCList[npcIterator];
        if (Player.checkIfNearPlayer(currentNPC.x, currentNPC.y)) {
            currentNPC.update();
        }
    }
} // updateNPCs

/**
 * Render all NPCs on the Map.
*/
function renderNPCs() {
    for (let npcIterator in NPCList) {
        let currentNPC = NPCList[npcIterator];
        if (Player.checkIfNearPlayer(currentNPC.x, currentNPC.y)) {
            currentNPC.render();
        }
    }
} // renderNPCs

// ===============================================================================================
// MAP t_r
// ===============================================================================================
// The Map-Class
class NewMap {
    /**
     * Create the Map-Object to generate, control and manage the Landscape and all Objects on it.
    */
    constructor() {
        this.fieldList = [];
        this.objectList = [];
        this.visibleObjects = [];
        this.droppedItems = [];
    } // constructor

    /**
     * Load an existing map.
     *
     * @param {Object} savefile_ - The Savefile with the existing Data
    */
    load(savefile_) {
        Object.assign(this, savefile_);
    } // load

    /**
     * Add a new Object to the World.
     * 
     * @returns {number} The Index of the Object
     * 
     * @param {number} object_ - The Object to create
     * @param {number} x_ - The X-Position of the new Object
     * @param {number} y_ - The Y-Position of the new Object
     * @param {number} [size_] - The initial Size of the Object
    */
    addObject(object_, x_, y_, size_) {
        if (!size_) { size_ = LISTOBJECTS[object_].size; }

        let newObject = { type: object_, x: x_, y: y_, size: size_ };

        if (LISTOBJECTS[object_].storage) { newObject.storage = []; }

        if (LISTOBJECTS[object_].position == 0) {
            this.objectList.unshift(newObject);
        }
        else {
            this.objectList.push(newObject);
        }

        return (this.objectList.length - 1);
    } // addObject

    /**
     * Remove an Object.
     * 
     * @param {number} index_ - The Index of the Object
    */
    removeObject(index_) {
        this.objectList.splice(index_, 1);
    } // removeObject

    /**
     * Create Fields on the Map.
    */
    createFields() {
        printMessage(SHOW_INFORMATION, "Set Fields...");

        for (let borderSize = 1; borderSize < 3; borderSize++) {
            for (let fieldIterator = 0; fieldIterator < FIELD_AMOUNT; fieldIterator++) {
                this.fieldList.push({
                    x: (-borderSize),
                    y: fieldIterator,
                    type: 0
                });

                this.fieldList.push({
                    x: (FIELD_AMOUNT - 1 + borderSize),
                    y: fieldIterator,
                    type: 0
                });
            }
        }

        for (let borderSize = 1; borderSize < 3; borderSize++) {
            for (let fieldIterator = 0; fieldIterator < (FIELD_AMOUNT + (4 * borderSize)); fieldIterator++) {
                this.fieldList.push({
                    x: ((-2 * borderSize) + fieldIterator),
                    y: (-borderSize),
                    type: 0
                });

                this.fieldList.push({
                    x: ((-2 * borderSize) + fieldIterator),
                    y: (FIELD_AMOUNT - 1 + borderSize),
                    type: 0
                });
            }
        }


        for (let beachFieldIterator = 0; beachFieldIterator < FIELD_AMOUNT; beachFieldIterator++) {
            if (beachFieldIterator != 0 && beachFieldIterator != (FIELD_AMOUNT - 1)) {
                this.fieldList.push({
                    x: beachFieldIterator,
                    y: 0,
                    type: 1
                });

                this.fieldList.push({
                    x: beachFieldIterator,
                    y: (FIELD_AMOUNT - 1),
                    type: 1
                });
            }

            this.fieldList.push({
                x: 0,
                y: beachFieldIterator,
                type: 1
            });

            this.fieldList.push({
                x: (FIELD_AMOUNT - 1),
                y: beachFieldIterator,
                type: 1
            });
        }


        for (let xIterator = 1; xIterator < (FIELD_AMOUNT - 1); xIterator++) {
            for (let yIterator = 1; yIterator < (FIELD_AMOUNT - 1); yIterator++) {
                if (Math.random() > 0.9) {
                    this.fieldList.push({
                        x: xIterator,
                        y: yIterator,
                        type: 2
                    });
                }
            }
        }

        printMessage(SHOW_INFORMATION, "Fields set.");
    } // createFields

    /**
     * Create Objects on the Map.
    */
    createObjects() {
        printMessage(SHOW_INFORMATION, "Set Objects...");

        for (let currentObjectIterator in createObjectList) {
            let currentObject = createObjectList[currentObjectIterator],
                minPosition = (currentObject.minPos) ? (currentObject.minPos) : (0),
                maxPosition = (currentObject.maxPos) ? (currentObject.maxPos) : (FIELD_AMOUNT * FIELD_SIZE);

            for (let currentObjectAmount = 0; currentObjectAmount < currentObject.amount;) {
                let xpos = ((Math.random() * (maxPosition - minPosition)) + minPosition),
                    ypos = ((Math.random() * (maxPosition - minPosition)) + minPosition),
                    canbePlaced = true;

                for (let objectIterator in this.objectList) {
                    let delX = (xpos - this.objectList[objectIterator].x),
                        delY = (ypos - this.objectList[objectIterator].y),
                        distance = Math.sqrt(Math.pow(delX, 2) + Math.pow(delY, 2));

                    if (distance <= (this.objectList[objectIterator].size + LISTOBJECTS[currentObject.object].size - 20)) {
                        canbePlaced = false;
                        break;
                    }
                }

                if (canbePlaced) {
                    let newObject = { type: currentObject.object, x: xpos, y: ypos, size: LISTOBJECTS[currentObject.object].size };

                    if (LISTOBJECTS[currentObject.object].storage) {
                        newObject.storage = [];

                        if (LISTOBJECTS[currentObject.object].loot) {
                            let itemAmount = Math.floor(LISTOBJECTS[currentObject.object].storage / 3);

                            for(let itemAmountIterator = 0; itemAmountIterator < itemAmount; itemAmountIterator++) {
                                newObject.storage.push(Math.floor(5 * Math.random()) + 1);   
                            }
                        }
                    }

                    if (LISTOBJECTS[currentObject.object].position == 0) {
                        this.objectList.unshift(newObject);
                    }
                    else {
                        this.objectList.push(newObject);
                    }

                    currentObjectAmount++;
                }
            }
        }

        printMessage(SHOW_INFORMATION, "Objects set!");
    } // createObjects

    /**
     * Draw the Background-Fields.
    */
    render() {
        for (let fieldIterator in this.fieldList) {
            let field = this.fieldList[fieldIterator],
                xpos = (-(Player.x) + (Canvas.width / 2)) + (field.x * FIELD_SIZE),
                ypos = (-(Player.y) + (Canvas.height / 2)) + (field.y * FIELD_SIZE);

            if (Player.checkIfNearPlayer((field.x * FIELD_SIZE), (field.y * FIELD_SIZE))) {
                Canvas.context.drawImage(
                    LIST_FIELDS[field.type],
                    xpos,
                    ypos
                );
            }
        }

        let xPosition = ((-(Player.x) + (Canvas.width / 2)) + (Math.floor(Player.x / FIELD_SIZE) * FIELD_SIZE) - FIELD_SIZE),
            yPosition = ((-(Player.y) + (Canvas.height / 2)) + (Math.floor(Player.y / FIELD_SIZE) * FIELD_SIZE) - FIELD_SIZE),
            width = (Math.ceil(Canvas.width / FIELD_SIZE) + 2),
            height = (Math.ceil(Canvas.height / FIELD_SIZE) + 2);

        Canvas.context.fillStyle = "#0d4600";
        for (let verticalIterator = 0; verticalIterator < width; verticalIterator++) {
            Canvas.context.fillRect((xPosition + (verticalIterator * FIELD_SIZE)), 0, 2, Canvas.height);
        }

        for (let horizontalIterator = 0; horizontalIterator < height; horizontalIterator++) {
            Canvas.context.fillRect(0, (yPosition + (horizontalIterator * FIELD_SIZE)), Canvas.width, 2);
        }
    } // render

    /**
     * Draw all Objects.
     * 
     * @param {number} position_ - Which position should be rendered?
    */
    renderObjects(position_) {
        Canvas.context.translate((-Player.x + (Canvas.width / 2)), (-Player.y + (Canvas.height / 2)));

        let removeList = [];

        for (let currentObjectIndex in this.objectList) {
            let currentObject = this.objectList[currentObjectIndex];

            if (LISTOBJECTS[currentObject.type].position == position_) {
                if (Player.checkIfNearPlayer(currentObject.x, currentObject.y)) {
                    if (currentObject.size >= LISTOBJECTS[currentObject.type].breakSize) {
                        this.visibleObjects.push(currentObjectIndex);

                        renderImage(
                            LIST_SPRITES[LISTOBJECTS[currentObject.type].sprite],
                            this.objectList[currentObjectIndex].x,
                            this.objectList[currentObjectIndex].y,
                            (this.objectList[currentObjectIndex].size / LISTOBJECTS[this.objectList[currentObjectIndex].type].size)
                        );
                    }
                    else {
                        removeList.push(currentObjectIndex);
                    }
                }
            }
        }

        for (let objectIterator in removeList) {
            this.removeObject(removeList[objectIterator]);
        }

        Canvas.context.translate((Player.x - (Canvas.width / 2)), (Player.y - (Canvas.height / 2)));
    } // renderObjects

    /**
     * Render all dropped Items, and remove them, if they were rendered for a too long time.
    */
    renderDroppedItems() {
        Canvas.context.save();
        Canvas.context.translate((-Player.x + (Canvas.width / 2)), (-Player.y + (Canvas.height / 2)));

        for (let itemIterator = (this.droppedItems.length - 1); itemIterator >= 0; itemIterator--) {
            let currentItem = this.droppedItems[itemIterator];

            if ((Date.now() - currentItem.time) >= DROPPED_REMOVE_TIME) {
                this.droppedItems.splice(itemIterator, 1);
            }
            else {
                Canvas.context.beginPath();
                Canvas.context.arc(currentItem.x, currentItem.y, DROPPED_SIZE, 0, 2 * Math.PI);
                Canvas.context.fillStyle = LISTITEMS[currentItem.item].color;
                Canvas.context.strokeStyle = "#222";
                Canvas.context.lineWidth = "5";
                Canvas.context.fill();
                Canvas.context.stroke();
                Canvas.context.closePath();
            }
        }

        Canvas.context.restore();
    } // renderDroppedItems

    /**
     * Update the Landscape and the Objects on the Map.
    */
    update() {
        this.visibleObjects = [];
    } // update

    /**
     * Update the growing plants every hour.
    */
    updateGrowth() {
        for (let objectIterator in this.objectList) {
            let currentObject = this.objectList[objectIterator];

            if (LISTOBJECTS[currentObject.type].growing) {
                currentObject.size = Math.min(LISTOBJECTS[currentObject.type].size,
                    (currentObject.size + LISTOBJECTS[currentObject.type].growing));
            }
        }
    } // updateGrowth

    /**
     * Check if the Player Overlapps with an Object.
     * 
     * @returns {number} The Distance between the nearest Object to the given Position
     * 
     * @param {number} x_ - The X-Position
     * @param {number} y_ - The Y-Position
     * @param {number} radius_ - The Radius
    */
    checkIfOverlapping(x_, y_, radius_) {
        let smallestDistance = 3000,
            smallestDeltaX = 3000,
            smallestDeltaY = 3000,
            smallestDistanceIndex = 0;

        for (let objectIterator in this.visibleObjects) {
            try {
                let deltaX = (x_ - this.objectList[this.visibleObjects[objectIterator]].x),
                    deltaY = (y_ - this.objectList[this.visibleObjects[objectIterator]].y),
                    distance = (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) - this.objectList[this.visibleObjects[objectIterator]].size - radius_);

                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    smallestDeltaX = deltaX;
                    smallestDeltaY = deltaY;
                    smallestDistanceIndex = objectIterator;
                }
            } catch (e) { printMessage(SHOW_ERROR, e); }
        }

        return ({
            index: smallestDistanceIndex,
            deltaX: smallestDeltaX,
            deltaY: smallestDeltaY,
            distance: smallestDistance
        });
    } // checkIfOverlapping

    /**
     * Get the nearest Object to the Player.
     * 
     * @returns {number} The Index of the nearest Object
     * 
     * @param {number} x_ - The X-Position
     * @param {number} y_ - The Y-Position
    */
    getNearestObject(x_, y_) {
        let smallestDistance = 50000,
            smallestDistanceIndex = 0;

        for (let objectIterator in this.objectList) {
            try {
                let deltaX = (x_ - this.objectList[objectIterator].x),
                    deltaY = (y_ - this.objectList[objectIterator].y),
                    distance = (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));

                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    smallestDistanceIndex = objectIterator;
                }
            } catch (e) { printMessage(SHOW_ERROR, e); }
        }

        return (smallestDistanceIndex);
    } // getNearestObject

    /**
     * Look for an Object in the Radius, to Harvest.
     * 
     * @returns {number} The Index of the Object, or -1 if no Object was found
     * 
     * @param {number} x_ - The X-Position
     * @param {number} y_ - The Y-Position
     * @param {number} r_ - The Radius to check for
    */
    checkRadiusForObject(x_, y_, r_) {
        for (let objectIterator in this.visibleObjects) {
            try {
                let deltaX = (x_ - this.objectList[this.visibleObjects[objectIterator]].x),
                    deltaY = (y_ - this.objectList[this.visibleObjects[objectIterator]].y),
                    distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

                if (distance <= (this.objectList[this.visibleObjects[objectIterator]].size + r_)) {
                    return (this.visibleObjects[objectIterator]);
                }
            }
            catch (e) { }
        }

        return (-1);
    } // checkRadiusForObject
} // NewMap

/**
 * Process the In-Game-Time.
*/
function processTime() {
    let passedHourTime = (Date.now() - CLOCKTIMER);
    if (passedHourTime >= HOURLENGTH) {
        CLOCKTIMER = (Date.now() - (passedHourTime % HOURLENGTH));

        Player.clockTime = (Player.clockTime + 0.001);

        Landscape.updateGrowth();
    }
} // processTime

/**
 * Manage a Storage and Put things out of it our put something into it.
 * 
 * @param {number} objectIndex_ - The Index of the Object in objectList to interact with
 * @param {number} action_ - What to do
 * @param {number} index_ - The Index of the Items in the specific Lists
*/
function manageStorage(objectIndex_, action_, item_) {
    if (action_ == STORAGE_PUTIN) {
        if (Landscape.objectList[objectIndex_].storage.length < LISTOBJECTS[Landscape.objectList[objectIndex_].type].storage) {
            Landscape.objectList[objectIndex_].storage.push(Player.inventory.itemList[item_]);
            Player.inventory.remove([{ item: Player.inventory.itemList[item_], amount: 1 }]);
        }
    }
    else if (action_ == STORAGE_PUTOUT) {
        if (Player.inventory.isFull()) {
            Player.inventory.add(Landscape.objectList[objectIndex_].storage[item_]);
            Landscape.objectList[objectIndex_].storage.splice(item_, 1);
        }
    }

    Player.updateWindows();
    Player.openStorage();
} // manageStorage

/**
 * Align an Object next to an other Object when building it.
*/
function alignObjectWhileSetting() {
    let nearestObjectIndex = Landscape.getNearestObject(Mouse.inMapXPosition, Mouse.inMapYPosition),
        xPosition = Landscape.objectList[nearestObjectIndex].x,
        yPosition = Landscape.objectList[nearestObjectIndex].y,
        deltaX = Mouse.inMapXPosition - xPosition,
        deltaY = Mouse.inMapYPosition - yPosition,
        distance = (LISTOBJECTS[Player.currentBuild.object].size + LISTOBJECTS[Landscape.objectList[nearestObjectIndex].type].size);

    if (Math.abs(deltaX) < 20) {
        Mouse.inCanvasXPosition = ((-Player.x + (Canvas.width / 2)) + xPosition);

        if (Math.abs(deltaY) <= distance) {
            Mouse.inCanvasYPosition = ((-Player.y + (Canvas.height / 2)) + yPosition) + ((distance + 1) * ((deltaY < 0) ? (-1) : (1)));
        }
    }
    else if (Math.abs(deltaY) < 20) {
        Mouse.inCanvasYPosition = ((-Player.y + (Canvas.height / 2)) + yPosition);

        if (Math.abs(deltaX) <= distance) {
            Mouse.inCanvasXPosition = ((-Player.x + (Canvas.width / 2)) + xPosition) + ((distance + 1) * ((deltaX < 0) ? (-1) : (1)));
        }
    }
} // alignObjectWhileSetting

// ===============================================================================================
// GENERATE t_s
// ===============================================================================================
/**
 * Create all Sprites in LIST_SPRITES.
*/
function createSprites() {
    printMessage(SHOW_INFORMATION, "Creating General-Sprites...");

    LIST_SPRITES = [];

    for (let objectIndex in createSpriteList) {
        LIST_SPRITES.push(createImage(createSpriteList[objectIndex].cs, createSpriteList[objectIndex].list));
    }

    printMessage(SHOW_INFORMATION, "Created General-Sprites!");
} // createSprites

/**
 * Create the Sprites for all Fields.
*/
function createFields() {
    printMessage(SHOW_INFORMATION, "Generating Field-Sprites...");

    for (let fieldIterator in createFieldList) {
        let canvas = document.createElement("canvas"),
            context = canvas.getContext("2d");

        canvas.width = FIELD_SIZE;
        canvas.height = FIELD_SIZE;

        let basicColor = createFieldList[fieldIterator].basic;
        context.fillStyle = "rgb(" + basicColor[0] + "," + basicColor[1] + "," + basicColor[2] + ")";
        context.fillRect(0, 0, FIELD_SIZE, FIELD_SIZE);

        let codeFields = createFieldList[fieldIterator].code,
            codeFieldSize = Math.floor(FIELD_SIZE / codeFields.length);

        for (let currentFieldLine = 0; currentFieldLine < codeFields.length; currentFieldLine++) {
            for (let elementIterator in codeFields) {
                context.fillStyle = "rgb(" +
                    (basicColor[0] + Number(codeFields[elementIterator][0])) + "," +
                    (basicColor[1]) + "," +
                    (basicColor[2] + Number(codeFields[elementIterator][1])) + ")";

                context.fillRect((elementIterator * codeFieldSize), (currentFieldLine * codeFieldSize), codeFieldSize, codeFieldSize);
            }

            codeFields.reverse();
        }

        LIST_FIELDS.push(canvas);
    }

    printMessage(SHOW_INFORMATION, "Created Field-Sprites!");
} // createFields

// ===============================================================================================
// GAME t_t
// ===============================================================================================
/*
 * The Game-Object.
*/
let Game = {
    // Is the Device using Touch? (Smartphones and Tablets)
    controlType: CONTROL_NORMAL, //(checkIfTouch()) ? (CONTROL_TOUCH) : (CONTROL_NORMAL),

    gameRunning: false,

    processMouseInput: false,
    processKeyboardInput: false,
} // Game

/**
 * Initialize the Game. Creating the Sprites, the Fields and Setting Objects, Fields and NPCs.
*/
function initializeGame() {
    createFields();
    createSprites();

    Landscape.createFields();
    Landscape.createObjects();

    Player.updateWindows();

    // if (Game.controlType == CONTROL_TOUCH) {
    //     setHTML("currentControlMode", "Touch-Mode");
    //     printMessage(SHOW_INFORMATION, "Using Mobile-Control!");
    //     initializeMobileControl();
    // }
    // else {
    //     setHTML("currentControlMode", "Normal-Mode");
    //     printMessage(SHOW_INFORMATION, "Using Computer-Control!");
    //     initializeComputerControl();
    // }

    printMessage(SHOW_INFORMATION, "Using Computer-Control!");
    initializeComputerControl();
} // initializeGame

/**
 * Start the Game.
*/
function startGame() {
    let elementList = document.getElementsByClassName("draggable");
    for (let elementIterator = 0; elementIterator < elementList.length; elementIterator++) {
        makeElementDraggable(elementList[elementIterator]);
    }

    setCSS("initialMenu", "display", "none");
    setCSS("windows", "display", "block");
    setCSS("menuButtons", "display", "block");

    initializeButtons();

    if (Player.health > 0) {
        Game.gameRunning = true;
        Game.processMouseInput = true;
        Game.processKeyboardInput = true;

        Player.updateWindows();

        printMessage(SHOW_INFORMATION, "Start Game!");
        requestAnimationFrame(runGame);
    }
    else {
        startEndCard();
    }
} // startGame

/**
 * This Function is the Main Game-Loop. 
 * The Function will call itself recursivly until <Game.gameRunning> is false.
*/
function runGame() {
    if (Game.gameRunning) {
        requestAnimationFrame(runGame);
    }

    let passedTime = (Date.now() - GAMETIMER);
    if (GAMETIMER >= FRAMERATE) {
        GAMETIMER = (Date.now() - (passedTime % FRAMERATE));

        processTime();

        Mouse.calculateRelativePosition();

        processKeyboardInput();

        if (!Game.deviceIsTouch) {
            Player.processInput();
        }

        Player.update();

        Landscape.update();

        textManager.update();

        renderGame();
        renderLight();

        if (Player.health <= 0) {
            Game.gameRunning = false;
            Game.processMouseInput = false;
            Game.processKeyboardInput = false;

            startEndCard();
        }
    }
} // runGame

/**
 * Render the Game.
*/
function renderGame() {
    Canvas.clear();

    Landscape.render();

    Landscape.renderDroppedItems();

    Landscape.renderObjects(0);

    renderDynamic();

    Player.render();

    Landscape.renderObjects(1);

    textManager.render();

    Mouse.render();

    Player.renderStats();
} // renderGame

// ===============================================================================================
// SAVE t_u
// ===============================================================================================
/**
 * Load Game from LocalStorage.
*/
function loadLocalStorage() {
    printMessage(SHOW_INFORMATION, "Load LocalStorage");

    try {
        if (localStorage) {
            let loadPlayer = JSON.parse(localStorage.getItem("player")),
                loadMap = JSON.parse(localStorage.getItem("map")),
                loadNPCList = JSON.parse(localStorage.getItem("npc"));

            Player.load(loadPlayer);
            Landscape.load(loadMap);
            loadNPCs(loadNPCList);

            startGame();
        }
    } catch (e) {
        setHTML("loadingMessages", "We're sorry. An Error Occured!");
    }
} // loadLocalStorage

/**
 * Load Game from a JSON-Savefile.
*/
function loadJSONFile(file) {
    printMessage(SHOW_INFORMATION, "Load JSON-File");

    try {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            try {
                var fileDate = JSON.parse(evt.target.result);
            } catch (e) {
                setHTML("loadingMessages", "This Savefile is not valid! We're deeply sorry.");
            }
            Player.load(fileDate.player);
            Landscape.load(fileDate.map);
            loadNPCs(fileDate.npc);

            startGame();
        }
    } catch (e) {
        setHTML("loadingMessages", "We're sorry. An Error Occured!");
    }
} // loadJSONFile

/**
 * Save the Game to LocalStorage.
*/
function saveToLocalStorage() {
    if (localStorage) {
        let JSON_savePlayer = JSON.stringify(Player),
            JSON_saveMap = JSON.stringify(Landscape),
            JSON_saveNPCs = JSON.stringify(NPCList);

        localStorage.setItem("player", JSON_savePlayer);
        localStorage.setItem("map", JSON_saveMap);
        localStorage.setItem("npc", JSON_saveNPCs);
    }
} // saveToLocalStorage

/**
 * Save the whole Game in an ordinary JSON-File.
*/
function saveGameToJSONFile() {
    let a = document.createElement("a"),
        file = new Blob([JSON.stringify({ player: Player, map: Landscape, npc: NPCList })], { type: 'text/plain' });

    a.href = URL.createObjectURL(file);
    a.download = "save.json";
    a.click();
} // saveGameToJSONFile

// ===============================================================================================
// START/END t_v
// ===============================================================================================
/**
 * Setup Menu-Screen.
*/
function startMenuScreen() {
    Canvas.clear();
    Effects.clear();

    setCSS("loadingAnimationDiv", "display", "block");
    setCSS(Effects.canvas, "opacity", 1);
    setCSS(Effects.canvas, "backgroundColor", "#000");

    setCSS("initialMenu", "display", "block");
    setCSS("windows", "display", "none");
    setCSS("menuButtons", "display", "none");
    setCSS("endcard", "display", "none");
    
    initializeGame();

    Landscape.render();
    Landscape.renderObjects(0);
    Landscape.renderObjects(1);

    setCSS("loadingAnimationDiv", "display", "none");
    setCSS(Effects.canvas, "opacity", 0);
} // startMenuScreen

/**
 * Start the EndCard.
*/
function startEndCard() {
    localStorage.clear();

    Canvas.clear();
    Effects.clear();

    setCSS(Effects.canvas, "opacity", 1);
    setCSS(Effects.canvas, "backgroundColor", "#131313");
    setCSS(Effects.canvas, "transitionDuration", "0ms");
    setCSS("window", "display", "none");
    setCSS("menuButtons", "display", "none");
    setCSS("endcard", "display", "block");

    // /**
    //  * Load the YT-Video.
    // */
    // function loadVideo() {
    //     let linkList = [
    //         "TkLT5krv_6c",
    //         "ALZHF5UqnU4",
    //         "S3fTw_D3l10",
    //         "8PIPyPMNnp8"
    //     ];

    //     let linkIndex = Math.floor(Math.random() * linkList.length);

    //     setHTML("videoPart", "<iframe id='ytVideoScreen' src='https://www.youtube-nocookie.com/embed/" + (linkList[linkIndex]) + "?autoplay=1&controls=0&showinfo=0' allow='autoplay; encrypted-media;'>");
    // } // loadVideo

    // /**
    //  * Update the Size of the Video.
    // */
    // function updateVideoSize() {
    //     let videoWidth = window.innerWidth * 0.4,
    //         videoHeight = videoWidth * 0.56;

    //     let videoElement = getEle("ytVideoScreen");
    //     videoElement.width = videoWidth;
    //     videoElement.height = videoHeight;
    //     videoElement.style.width = videoWidth + "px";
    //     videoElement.style.height = videoHeight + "px";

    // } // updateVideoSize

    // loadVideo();
    // updateVideoSize();

    // window.addEventListener("resize", updateVideoSize);
} // startEndCard

// ===============================================================================================
// CREATE OBJECTS t_w
// ===============================================================================================
let
    Canvas = new NewCanvas("AnimationCanvas"),
    Effects = new NewCanvas("EffectCanvas"),

    Mouse = new NewMouse(),

    textManager = new newText(),

    Landscape = new NewMap(),

    Player = new NewPlayer(),

    NPCList = [],

    DynamicList = [];