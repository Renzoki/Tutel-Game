import { gameState } from "./gameState.js"
import soundFX from "./SoundFX.js"
import timeHandler from "./timeHandler.js"
import playerMovement from "./playerMovement.js"
import fallingObjects from "./fallingObjects.js"
import backgroundAnimations from "./backgroundAnimations.js"

function startGame() {
    setRestartListener()
    soundFX.allowAudio()
    gameState.initializeElementValues()
    backgroundAnimations.animateBackground()
    playerMovement.handleUserInput(gameState)
    gameLoop()
}

function gameLoop() {
    if (!gameState.game.isPaused) {
        playerMovement.tutelMovement(gameState)

        if (gameState.game.frames % 200 === 0)
            fallingObjects.generateFallingObject(gameState, "Normal")

        if (gameState.game.frames % 4000 === 0) 
            timeHandler.scheduleTimeChange(gameState)

        fallingObjects.updateFallingObjects(gameState, "Easy")
        gameState.game.frames++
        console.log(gameState.game.frames)
    }

    if (gameState.player.lives > 0)
        requestAnimationFrame(gameLoop)
    else
        displayGameOver()
}

function restartGame() {
    const { elements } = gameState
    const { gameContainer, hearts, copyOfHeart } = elements

    let currentObjects = gameContainer.querySelectorAll(".falling-object")
    currentObjects.forEach((obj) => {
        gameContainer.removeChild(obj)
    })

    for (let i = 0; i < 3; i++) {
        let newHeart = copyOfHeart.cloneNode(true)
        hearts.append(newHeart)
    }

    soundFX.allowAudio()
    timeHandler.resetTime()
    gameState.initializeElementValues()
    gameLoop()
}

function displayGameOver() {
    const { game, elements } = gameState
    const { restartBG } = elements

    const score = restartBG.querySelector("#gained-money")
    score.innerText = game.points
    restartBG.style.opacity = 0.9

    soundFX.superMarioTheme.stop()
}

function setRestartListener() {
    const { player } = gameState

    window.addEventListener("keydown", (e) => {
        if (e.code === "Space" && player.lives === 0)
            restartGame()
    })
}

startGame()