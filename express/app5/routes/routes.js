const express = require("express");
const router = express.Router();
const indexController = require("../controller/IndexController")
const path = require("path")

router.get("/routes", indexController.home)
router.get("/contact", indexController.contact)
router.get("/gallery", indexController.gallery)

router.get("/home", (req, res, next) =>
{
    let home_page = path.join(__dirname, "../pages/home.html")
    res.sendFile(home_page)
})

module.exports = router