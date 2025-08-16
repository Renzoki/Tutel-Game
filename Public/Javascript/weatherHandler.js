export function changeWeather(gameState) {
    const { game, weather } = gameState

    const day = document.querySelector("#day")
    const sunset = document.querySelector("#sunset")
    const night = document.querySelector("#night")
    const dawn = document.querySelector("#dawn")

    if (game.points % 10 === 0 && game.points > 0) {
        if (weather.time === 0) {
            day.style.opacity = 1
            dawn.style.opacity = 0
            weather.time++
        } else if (weather.time === 1) {
            sunset.style.opacity = 1
            day.style.opacity = 0
            weather.time++
        } else if (weather.time === 2) {
            night.style.opacity = 1
            sunset.style.opacity = 0
            weather.time++
        } else if (weather.time === 3) {
            dawn.style.opacity = 1
            night.style.opacity = 0
            weather.time = 0
        }
    }
}

export default {
    changeWeather
}