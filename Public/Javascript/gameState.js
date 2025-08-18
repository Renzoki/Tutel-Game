export const gameState = {
    game: {
        frames: 0,
        points: 0,
        time: 1,
        isPaused: false,
    },
    player: {
        lives: 3,
        isMovingLeft: false,
        isMovingRight: false,
        centerX: window.innerWidth / 2,
        left: 0,
        top: 0
    },
    physics: {
        movementRate: 0.2,
        friction: -3,
        gravity: 0.9
    },
    objects: {
        fallingObj: [],
        fallingObjPos: []
    },
    elements: {
        tutel: document.querySelector("#tutel"),
        gameContainer: document.querySelector("#game-container"),
        containerRect: document.querySelector("#game-container").getBoundingClientRect(),
        hearts: document.querySelector("#heart-container"),
        pointsPlaceholder: document.querySelector("#score-placeholder"),
        originalFallingObject: document.querySelector(".falling-object"),
        copyOfHeart: document.querySelector("#heart-container").querySelector("#heart"),
        pauseBG: document.querySelector("#pause"),
        restartBG: document.querySelector("#restart"),
    },

    initializeElementValues() {
        let containerRect = this.elements.containerRect

        this.physics.movementRate = 0.2
        this.physics.friction = -3
        this.game.frames = 0
        this.game.points = 0
        this.game.time = 1

        this.player.lives = 3
        this.player.isMovingLeft = false
        this.player.isMovingRight = false
        this.player.left = (window.innerWidth / 2) - 60
        this.player.top = containerRect.bottom - 95

        this.objects.fallingObj.length = 0
        this.objects.fallingObjPos.length = 0

        this.elements.tutel.src = "../Assets/Icons/tutel-right.png"
        this.elements.tutel.style.left = this.player.left + "px"
        this.elements.tutel.style.top = this.player.top + "px"
        this.elements.pointsPlaceholder.innerText = 0
        this.elements.pointsPlaceholder.style.left = (window.innerWidth / 2) - 20 + "px"
        this.elements.pointsPlaceholder.style.top = containerRect.top + 60 + "px"
        this.elements.restartBG.style.opacity = 0
    }
};