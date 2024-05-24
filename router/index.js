const Router = require("express").Router

const router = new Router()

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/settings", (req, res) => {
    res.render("settings")
})

router.post("/connect", urlencodedParser, (req, res) => {
    res.render("paintPlace", {
        name: req.body.name,
        room: req.body.room
    })
})

module.exports = router