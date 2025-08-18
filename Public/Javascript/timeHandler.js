const day = document.querySelector("#day")
const sunset = document.querySelector("#sunset")
const night = document.querySelector("#night")
const dawn = document.querySelector("#dawn")

export function changeTime(gameState) {
    const { game } = gameState

    if (game.frames > 0 && game.points >= 0) {
        if (game.time === 0) {
            game.time += swapVisibility(day, dawn)
            background.style.backgroundColor = "var(--dayBackground)"
        } else if (game.time === 1) {
            game.time += swapVisibility(sunset, day)
            background.style.backgroundColor = "var(--sunsetBackground)"
        } else if (game.time === 2) {
            game.time += swapVisibility(night, sunset)
            background.style.backgroundColor = "var(--nightBackground)"
        } else if (game.time === 3) {
            game.time = swapVisibility(dawn, night, "res")
            background.style.backgroundColor = "var(--dawnBackground)"
        }
    }
}

export function resetTime() {
    day.style.opacity = 1
    sunset.style.opacity = 0
    night.style.opacity = 0
    dawn.style.opacity = 0
    background.style.backgroundColor = "var(--dayBackground)"
}

function swapVisibility(element1, element2, operation = "inc") {
    element1.style.opacity = 1
    element2.style.opacity = 0

    if (operation === "inc")
        return 1
    else
        return 0
}

export default {
    changeTime,
    resetTime
}