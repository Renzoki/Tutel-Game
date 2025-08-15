const gameContainer = document.querySelector("#game-container")
let containerRect = gameContainer.getBoundingClientRect();

let movementRate = 0.2
let friction = -3
let frames = 0

//========== TUTEL ===============

let lives = 3
const tutel = document.querySelector("#tutel")
const centerX = window.innerWidth / 2;

let isMovingLeft = false
let isMovingRight = false

let tutelLeft = centerX - 60
let tutelTop = containerRect.bottom - 95

tutel.style.left = centerX - 60 + "px"
tutel.style.top = containerRect.bottom - 95 + "px"

//=========== FALLING OBJECTS ==============
const fallingObject = document.querySelector(".falling-object")
const possibleObjects = ["donut.png", "fries.png", "jabee.png", "samgyup.png", "yowell.png", "poop.png"]

let gravity = 0.7
let fallingObj = []
let fallingObjPos = []

//============= POINTS & LIVES =================
const hearts = document.querySelector("#heart-container")
let copyOfHeart = hearts.querySelector("#copyOfHeart")
let points

let isPaused = false
//==============================================

let gameState = {
    game: {
        frames: frames,
        isPaused: isPaused,
    },
    player: {
        lives: lives,
        isMovingLeft: isMovingLeft,
        isMovingRight: isMovingRight,
        left: tutelLeft,
        top: tutelTop
    },
    objects: {
        fallingObj: fallingObj,
        fallingObjPos: fallingObjPos
    },
    elements: {
        tutel: tutel,
        gameContainer: gameContainer,
        hearts: hearts
    }
};

function handleUserInput(gameState) {
    const { player, elements, game } = gameState

    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "a") {
            player.left -=  30
            player.isMovingLeft = true
            elements.tutel.src = "../Assets/Icons/tutel-left.png"
        }

        if (e.key.toLowerCase() === "d") {
            player.left += 30
            player.isMovingRight = true
            elements.tutel.src = "../Assets/Icons/tutel-right.png"
        }

        if (e.code === "Space" && !game.isPaused && player.lives > 0) {
            game.isPaused = true
        } else {
            game.isPaused = false
        }
    })
}

function tutelMovement(gameState) {
    const { player, elements,game } = gameState

    if (player.isMovingLeft && isWithinBounds("left") && !game.isPaused) {
        friction += movementRate
        player.left += friction
        elements.tutel.style.left = player.left + "px"
    }

    if (player.isMovingRight && isWithinBounds("right") && !game.isPaused) {
        friction += movementRate
        player.left -= friction
        tutel.style.left = player.left + "px"
    }

    if (friction > 0) {
        player.isMovingLeft = false
        player.isMovingRight = false
        friction = -3
    }
}

function isWithinBounds(gameState, direction) {
    const { elements } = gameState

    if (direction === "left")
        return elements.tutel.getBoundingClientRect().left >= containerRect.left
    else if (direction === "right")
        return elements.tutel.getBoundingClientRect().right <= containerRect.right
}

function generateFallingObject(gameState, difficulty) {
    const { objects, elements } = gameState

    let object = fallingObject.cloneNode() // copy from the original
    object.removeAttribute("hidden")

    let randNum = Math.floor(Math.random() * (containerRect.right * 0.95 - containerRect.left)) + containerRect.left; //fall on a random x val
    object.style.top = containerRect.top + "px"
    object.style.left = randNum + "px"

    if (difficulty = "Easy") { //Generate more poop depending on difficulty
        let randNum = Math.floor(Math.random() * 5 + 1);
        object.setAttribute("src", "../Assets/Icons/" + possibleObjects[randNum])
    } else if (difficulty = "Normal") {
        let randNum = Math.floor(Math.random() * 6);
        object.setAttribute("src", "../Assets/Icons/" + possibleObjects[randNum])
    } else if (difficulty = "Hard") {

    }

    elements.gameContainer.append(object)
    objects.fallingObj.push(object)
    objects.fallingObjPos.push(containerRect.top)
}

function updateFallingObjects(gameState, difficulty) {
    const { player, objects, elements } = gameState
    const { fallingObj, fallingObjPos } = objects
    const { gameContainer } = elements

    for (let i = 0; i < fallingObj.length; i++) {
        fallingObjPos[i] += gravity
        fallingObj[i].style.top = fallingObjPos[i] + "px"

        if (fallingObjPos[i] >= player.top - 90)
            if (parseFloat(fallingObj[i].style.left) < player.left + 70 && parseFloat(fallingObj[i].style.left) > player.left - 70) {
                contactHandler(gameState, i)
            }

        if (fallingObjPos[i] >= containerRect.bottom - 80) {
            if (!fallingObj[i].src.includes("poop")) {
                takeDamage()
                changeTutel("yuck")
            }

            gameContainer.removeChild(fallingObj[i])
            fallingObj.splice(i, 1)
            fallingObjPos.splice(i, 1)
        }
    }
}

function contactHandler(gameState, i) {
    const { objects } = gameState
    const { fallingObj, fallingObjPos } = objects
    const { gameContainer } = elements

    if (!fallingObj[i].src.includes("poop")) {
        chompSFX.play()
        changeTutel(gameState, "yummy")
    } else {
        takeDamage(gameState)
        changeTutel(gameState, "yuck")
    }

    gameContainer.removeChild(fallingObj[i])
    fallingObj.splice(i, 1)
    fallingObjPos.splice(i, 1)
}

function takeDamage(gameState) {
    const { player, elements } = gameState
    const { hearts } = elements

    hurtSFX.play()
    copyOfHeart = hearts.querySelector("#copyOfHeart").cloneNode()
    hearts.removeChild(hearts.querySelector("#heart"))
    player.lives -= 1
}

function changeTutel(gameState, type) {
    const { player, elements } = gameState
    const { tutel } = elements

    if (tutel.src.includes("right"))
        tutel.src = `../Assets/Icons/tutel-${type}-right.png`
    else
        tutel.src = `../Assets/Icons/tutel-${type}-left.png`

    if (player.lives > 0) {
        setTimeout(() => {
            if (tutel.src.includes("right"))
                tutel.src = "../Assets/Icons/tutel-right.png"
            else
                tutel.src = "../Assets/Icons/tutel-left.png"
        }, 500)
    }
}

function restartGame(gameState) {
    const { player, objects, elements } = gameState
    const { fallingObj, fallingObjPos } = objects
    const { gameContainer, hearts, tutel } = elements

    for (let i = 0; i < 3; i++) {
        let newHeart = copyOfHeart.cloneNode(true)
        hearts.append(newHeart)
    }

    player.lives = 3 //reset lives

    fallingObj.length = 0 //remove all projectiles on screen
    fallingObjPos.length = 0

    let currentObjects = gameContainer.querySelectorAll(".falling-object")
    currentObjects.forEach((obj) => {
        gameContainer.removeChild(obj)
    })

    movementRate = 0.2
    friction = -3
    frames = 0

    player.isMovingLeft = false
    player.isMovingRight = false
    player.left = centerX - 60
    tutel.style.left = centerX - 60 + "px" // reset tutel position

    gameLoop()
}

function gameLoop() {
    if (!gameState.game.isPaused) {
        tutelMovement(gameState)

        // if (game.frames % 200 === 0)
        //     generateFallingObject(gameState, "Normal")

        updateFallingObjects(gameState, "Easy")
        gameState.game.frames++
    }

    if (gameState.player.lives > 0) requestAnimationFrame(tick);
}

function tick(timestamp) {
  gameLoop(gameState);   // pass whatever args you want
}


handleUserInput(gameState)
gameLoop()