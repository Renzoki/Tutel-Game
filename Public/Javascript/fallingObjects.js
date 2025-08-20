import soundFX from "../Javascript/SoundFX.js"

const possibleObjects = ["donut.png", "fries.png", "jabee.png", "samgyup.png", "yowell.png", "poop.png"]

export function generateFallingObject(gameState, difficulty) {
    const { objects, elements } = gameState
    const { containerRect } = elements

    let object = elements.originalFallingObject.cloneNode() // copy from the original
    let randNum = Math.floor(Math.random() * (containerRect.right * 0.95 - containerRect.left)) + containerRect.left; //fall on a random x val
    object.style.top = containerRect.top + "px"
    object.style.left = randNum + "px"

    if (difficulty === "Easy") { //Generate more poop depending on difficulty
        let randNum = Math.floor(Math.random() * 5 + 1);
        object.setAttribute("src", "../Assets/Icons/" + possibleObjects[randNum])
    } else if (difficulty === "Normal") {
        let randNum = Math.floor(Math.random() * 6);
        object.setAttribute("src", "../Assets/Icons/" + possibleObjects[randNum])
    } else if (difficulty = "Hard") {

    }

    object.removeAttribute("hidden")
    elements.gameContainer.append(object)
    objects.fallingObj.push(object)
    objects.fallingObjPos.push(containerRect.top)
}

export function updateFallingObjects(gameState, difficulty) {
    const { player, physics, objects, elements } = gameState
    const { fallingObj, fallingObjPos } = objects
    const { gameContainer, containerRect } = elements

    for (let i = 0; i < fallingObj.length; i++) {
        fallingObjPos[i] += physics.gravity
        fallingObj[i].style.top = fallingObjPos[i] + "px"

        if (fallingObjPos[i] >= player.top - 90)
            if (parseFloat(fallingObj[i].style.left) < player.left + 70 && parseFloat(fallingObj[i].style.left) > player.left - 70) {
                handleContact(gameState, i)
            }

        if (fallingObjPos[i] >= containerRect.bottom - 80) {
            if (!fallingObj[i].src.includes("poop")) {
                takeDamage(gameState)
                changeTutel(gameState, "yuck")
            }


            gameContainer.removeChild(fallingObj[i])
            fallingObj.splice(i, 1)
            fallingObjPos.splice(i, 1)
        }
    }
}

function handleContact(gameState, i) {
    const { objects, game, elements } = gameState
    const { fallingObj, fallingObjPos } = objects
    const { gameContainer, pointsPlaceholder } = elements

    if (!fallingObj[i].src.includes("poop")) {
        game.points++
        pointsPlaceholder.innerText = game.points

        soundFX.chompSFX.play()
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

    soundFX.hurtSFX.play()
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

export default {
    generateFallingObject,
    updateFallingObjects
}