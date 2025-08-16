export const gameState = {
    game: {
        frames: 0,
        points: 0,
        isPaused: false,
    },
    weather: {
        time: 1,
        timeEvent: ["day", "sunset", "night", "sunset"],
        specialEvent: ["poopRain", "friesRain"]
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
        gravity: 0.7
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
    },

    initializeElementValues() {
        let containerRect = this.elements.containerRect

        this.player.left = (window.innerWidth / 2) - 60
        this.player.top = containerRect.bottom - 95
        this.elements.tutel.style.left = this.player.left + "px"
        this.elements.tutel.style.top = this.player.top + "px"

        this.elements.pointsPlaceholder.style.left = (window.innerWidth / 2) - 20 + "px"
        this.elements.pointsPlaceholder.style.top = containerRect.top + 60 + "px"
    }
};