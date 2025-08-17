export function changeWeather(gameState) {
    const { game } = gameState

    const day = document.querySelector("#day")
    const sunset = document.querySelector("#sunset")
    const night = document.querySelector("#night")
    const dawn = document.querySelector("#dawn")

    if (game.points % 10 === 0 && game.points > 0) {
        if (game.time === 0) {
            game.time += swapVisibility(day, dawn)
        } else if (game.time === 1) {
            game.time += swapVisibility(sunset, day)
        } else if (game.time === 2) {
            game.time += swapVisibility(night, sunset)
        } else if (game.time === 3) {
            game.time = swapVisibility(dawn, night, "reset")
        }
    }
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
    changeWeather
}