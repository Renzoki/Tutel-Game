let imageCache = []

function preloadAssets() {
    fetch("/icons").then(res => res.json())
        .then(data => storeImage(data))
}

function storeImage(addresses) {
    for(let i = 0; i < addresses.length; i++){
        const img = new Image()
        img.src = addresses[i]
        imageCache.push(img)
    }
}

preloadAssets()