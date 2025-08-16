import { gameState } from "../Javascript/gameState.js" 
import playerMovement from "../Javascript/playerMovement.js" 
import fallingObjects from "../Javascript/fallingObjects.js" 
import soundFX from "../Javascript/SoundFX.js"

gameState.initializeElementValues()

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
    const { game, player, objects, elements } = gameState
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

    physics.movementRate = 0.2
    physics.friction = -3
    game.frames = 0

    player.isMovingLeft = false
    player.isMovingRight = false
    player.left = player.centerX - 60
    tutel.style.left = player.centerX - 60 + "px" // reset tutel position

    gameLoop()
}

soundFX.allowAudio()
playerMovement.handleUserInput(gameState)
gameLoop()