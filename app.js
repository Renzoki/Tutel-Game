const express = require("express")
const app = express()
const path = require('path')
const { listIcons } = require("./src/loadAssetAddresses.js");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Templates'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/icons", async (req, res) => {
    try {
        const icons = await listIcons()
        console.log(icons)
        res.json(icons)
    } catch (e) {
        res.status(500).send(err.message)
    }
})

app.listen(3000, () => {
    console.log("Listening at PORT 3000")
})