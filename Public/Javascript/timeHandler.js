const background = document.querySelector("#background-container")
const day = document.querySelector("#day")
const sunset = document.querySelector("#sunset")
const night = document.querySelector("#night")
const dawn = document.querySelector("#dawn")

export function changeTime(gameState) {
    const { game } = gameState

    if (game.frames > 0 && game.points >= 0) {
        if (game.time === 0) {
            game.time += swapVisibility(day, dawn)
            background.classList.add("bg-day")
            background.classList.remove("bg-dawn")
        } else if (game.time === 1) {
            game.time += swapVisibility(sunset, day)
            background.classList.add("bg-sunset")
            background.classList.remove("bg-day")
        } else if (game.time === 2) {
            game.time += swapVisibility(night, sunset)
            background.classList.add("bg-night")
            background.classList.remove("bg-sunset")
        } else if (game.time === 3) {
            game.time = swapVisibility(dawn, night, "res")
            background.classList.add("bg-dawn")
            background.classList.remove("bg-night")
        }
    }

    console.log(background.classList)
}

export function resetTime() {
    background.classList.add("bg-day")
    background.classList.remove("bg-dawn")
    background.classList.remove("bg-sunset")
    background.classList.remove("bg-night")
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