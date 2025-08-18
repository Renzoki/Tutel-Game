const background = document.querySelector("#background-container")
const backgroundRect = document.querySelector("#background-container").getBoundingClientRect()
let xGrid1
let previousRandNums = []

let cloudSpeed = 2
let clouds = []
let cloudsPos = []

function animateBackground() {
    fillXGrid()
    spawnClouds()
    moveClouds()
}

function fillXGrid() {
    let gap = (backgroundRect.bottom - 100) / 3
    xGrid1 = [0]

    for (let i = 0; i < 6; i++) {
        xGrid1.push(xGrid1[i] + gap)
    }
}

function spawnClouds() {
    setInterval(() => {
        let randNum = Math.floor(Math.random() * 5)
        let cloud = document.createElement("img")

        cloud.id = "cloud"

        let randCloud = Math.floor(Math.random() * 7) + 1
        cloud.src = `../Assets/Icons/cloud${randCloud}.png`
        cloud.style.left = -500 + "px"

        while (previousRandNums.includes(randNum)) {
            randNum = Math.floor(Math.random() * 5)
        }

        cloud.style.top = xGrid1[randNum] + "px"
        previousRandNums.push(randNum)

        if (previousRandNums.length > 2)
            previousRandNums.splice(0, 1)

        clouds.push(cloud)
        cloudsPos.push(-500)
        background.append(cloud)
    }, 1500)
}

function moveClouds() {
    setInterval(() => {
        for (let i = 0; i < clouds.length; i++) {
            cloudsPos[i] += cloudSpeed
            clouds[i].style.left = cloudsPos[i] + "px"

            if (cloudsPos[i] > backgroundRect.right + 150) {
                background.removeChild(clouds[i])
                clouds.splice(i, 1)
                cloudsPos.splice(i, 1)
            }
        }
    }, 30)
}

animateBackground()