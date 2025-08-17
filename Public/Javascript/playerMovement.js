export function handleUserInput(gameState) {
    const { player, elements, game } = gameState

    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "a" && isWithinBounds(gameState, "left") && !game.isPaused) {
            player.left -= 30
            player.isMovingLeft = true
            elements.tutel.src = "../Assets/Icons/tutel-left.png"
        }

        if (e.key.toLowerCase() === "d" && isWithinBounds(gameState, "right") && !game.isPaused) {
            player.left += 30
            player.isMovingRight = true
            elements.tutel.src = "../Assets/Icons/tutel-right.png"
        }

        if (e.code === "Space" && player.lives > 0) {
            if (!game.isPaused) {
                elements.pauseBG.style.opacity = 0.7
                game.isPaused = true
            } else {
                elements.pauseBG.style.opacity = 0
                game.isPaused = false
            }
        }
    })
}

export function tutelMovement(gameState) {
    const { player, physics, elements, game } = gameState
    const { tutel } = elements

    if (player.isMovingLeft && isWithinBounds(gameState, "left") && !game.isPaused) {
        physics.friction += physics.movementRate
        player.left += physics.friction
        elements.tutel.style.left = player.left + "px"
    }

    if (player.isMovingRight && isWithinBounds(gameState, "right") && !game.isPaused) {
        physics.friction += physics.movementRate
        player.left -= physics.friction
        tutel.style.left = player.left + "px"
    }

    if (physics.friction > 0) {
        player.isMovingLeft = false
        player.isMovingRight = false
        physics.friction = -3
    }
}

export function isWithinBounds(gameState, direction) {
    const { elements } = gameState
    const { containerRect } = elements

    if (direction === "left")
        return elements.tutel.getBoundingClientRect().left >= containerRect.left
    else if (direction === "right")
        return elements.tutel.getBoundingClientRect().right <= containerRect.right
}

export default {
    handleUserInput,
    tutelMovement,
    isWithinBounds
}