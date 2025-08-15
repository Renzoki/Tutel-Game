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
let copyOfHeart = hearts.querySelector("#heart")
let points

let isPaused = false
//==============================================

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "a") {
        tutelLeft -= 30
        isMovingLeft = true
        tutel.src = "../Assets/Icons/tutel-left.png"
    }

    if (e.key.toLowerCase() === "d") {
        tutelLeft += 30
        isMovingRight = true
        tutel.src = "../Assets/Icons/tutel-right.png"
    }

    if (e.code === "Space" && !isPaused && lives > 0) {
        isPaused = true
    } else {
        isPaused = false
    }
})

function tutelMovement() {
    if (isMovingLeft && isWithinBounds("left")) {
        friction += movementRate
        tutelLeft += friction
        tutel.style.left = tutelLeft + "px"
    }

    if (isMovingRight && isWithinBounds("right")) {
        friction += movementRate
        tutelLeft -= friction
        tutel.style.left = tutelLeft + "px"
    }

    if (friction > 0) {
        isMovingLeft = false
        isMovingRight = false
        friction = -3
    }
}

function tutelMovement(direction) {
    if (isMovingLeft && isWithinBounds("left")) {
        friction += movementRate
        tutelLeft += friction
        tutel.style.left = tutelLeft + "px"
    }

    if (isMovingRight && isWithinBounds("right")) {
        friction += movementRate
        tutelLeft -= friction
        tutel.style.left = tutelLeft + "px"
    }

    if (friction > 0) {
        isMovingLeft = false
        isMovingRight = false
        friction = -3
    }
}

function isWithinBounds(direction) {
    if (direction === "left")
        return tutel.getBoundingClientRect().left >= containerRect.left
    else if (direction === "right")
        return tutel.getBoundingClientRect().right <= containerRect.right
}

function generateFallingObject(difficulty, frames) {
    let object = fallingObject.cloneNode()
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

    gameContainer.append(object)
    fallingObj.push(object)
    fallingObjPos.push(containerRect.top)
}

function updateFallingObjects(difficulty, frames) {
    for (let i = 0; i < fallingObj.length; i++) {
        fallingObjPos[i] += gravity
        fallingObj[i].style.top = fallingObjPos[i] + "px"

        if (fallingObjPos[i] >= tutelTop - 90)
            if (parseFloat(fallingObj[i].style.left) < tutelLeft + 70 && parseFloat(fallingObj[i].style.left) > tutelLeft - 70) {
                contactHandler(i)
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

function contactHandler(i) {
    if (!fallingObj[i].src.includes("poop")) {
        chompSFX.play()
        changeTutel("yummy")
    } else {
        takeDamage()
        changeTutel("yuck")
    }

    gameContainer.removeChild(fallingObj[i])
    fallingObj.splice(i, 1)
    fallingObjPos.splice(i, 1)
}

function changeTutel(type) {
    if (tutel.src.includes("right"))
        tutel.src = `../Assets/Icons/tutel-${type}-right.png`
    else
        tutel.src = `../Assets/Icons/tutel-${type}-left.png`

    if (lives > 0) {
        setTimeout(() => {
            if (tutel.src.includes("right"))
                tutel.src = "../Assets/Icons/tutel-right.png"
            else
                tutel.src = "../Assets/Icons/tutel-left.png"
        }, 500)
    }

}

function takeDamage() {
    hurtSFX.play()
    copyOfHeart = hearts.querySelector("#heart").cloneNode()
    hearts.removeChild(hearts.querySelector("#heart"))
    lives -= 1
}

function restartGame() {
    for (let i = 0; i < 3; i++) {
        newHeart = copyOfHeart.cloneNode(true)
        hearts.append(newHeart)
    }

    lives = 3 //reset lives

    fallingObj = [] //remove all projectiles on screen
    fallingObjPos = []

    let currentObjects = gameContainer.querySelectorAll(".falling-object")
    currentObjects.forEach((obj) => {
        gameContainer.removeChild(obj)
    })

    tutelLeft = centerX - 60
    tutel.style.left = centerX - 60 + "px" // reset tutel position
    movementRate = 0.2
    friction = -3
    frames = 0

    isMovingLeft = false
    isMovingRight = false

    gameLoop()
}

function gameLoop() {
    if (!isPaused) {
        tutelMovement()

        if (frames % 200 === 0)
            generateFallingObject("Normal", frames)

        updateFallingObjects("Easy", frames)
        frames++
    }

    if (lives > 0)
        requestAnimationFrame(gameLoop)
}

gameLoop()