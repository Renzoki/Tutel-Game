import { gameState } from "./gameState.js"
import playerMovement from "./playerMovement.js"
import fallingObjects from "./fallingObjects.js"
import soundFX from "./SoundFX.js"

function gameLoop() {
    if (!gameState.game.isPaused) {
        playerMovement.tutelMovement(gameState)

        if (gameState.game.frames % 200 === 0)
            fallingObjects.generateFallingObject(gameState, "Normal")

        fallingObjects.updateFallingObjects(gameState, "Easy")
        gameState.game.frames++
    }

    if (gameState.player.lives > 0)
        requestAnimationFrame(gameLoop)

}

function restartGame(gameState) {
    const { elements } = gameState
    const { gameContainer, hearts } = elements

    let currentObjects = gameContainer.querySelectorAll(".falling-object")
    currentObjects.forEach((obj) => {
        gameContainer.removeChild(obj)
    })

    for (let i = 0; i < 3; i++) {
        let newHeart = copyOfHeart.cloneNode(true)
        hearts.append(newHeart)
    }

    gameState.initializeElementValues()
    soundFX.allowAudio()
    gameLoop()
}

soundFX.allowAudio()
gameState.initializeElementValues()
playerMovement.handleUserInput(gameState)
gameLoop()