const express = require("express")
const app = express()
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Templates'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index")
})
app.listen(3000, () => {
    console.log("Listening at PORT 3000")
})