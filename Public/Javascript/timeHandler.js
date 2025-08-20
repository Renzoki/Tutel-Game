const background = document.querySelector("#background-container")
const day = document.querySelector("#day")
const sunset = document.querySelector("#sunset")
const night = document.querySelector("#night")
const dawn = document.querySelector("#dawn")

export function scheduleTimeChange(gameState){
    setTimeout(() => changeTime(gameState), 0)
}

function changeTime(gameState) {
    const { game } = gameState

    if (game.frames > 0 && game.points >= 0) {
        if (game.time === 0) {
            game.time += swapVisibility(day, dawn)
            background.className = "bg-day"
        } else if (game.time === 1) {
            game.time += swapVisibility(sunset, day)
            background.className = "bg-sunset"
        } else if (game.time === 2) {
            game.time += swapVisibility(night, sunset)
            background.className = "bg-night"
        } else if (game.time === 3) {
            game.time = swapVisibility(dawn, night, "res")
            background.className = "bg-dawn"
        }
    }
}

export function resetTime() {
    background.className = "bg-day"
    day.classList.add("visible")
    sunset.classList.remove("visible")
    night.classList.remove("visible")
    dawn.classList.remove("visible")
}

function swapVisibility(element1, element2, operation = "inc") {
    element1.classList.add("visible")
    element2.classList.remove("visible")

    if (operation === "inc")
        return 1
    else
        return 0
}

export default {
    scheduleTimeChange,
    resetTime
}