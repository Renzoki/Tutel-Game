const express = require("express")
const app = express()
const path = require('path')
const { listIcons } = require("./src/loadAssetAddresses.js");
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Templates'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/icons", async (req, res) => {
    try {
        const icons = await listIcons()
        res.json(icons)
    } catch (e) {
        res.status(500).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log("Listening at PORT 3000")
})