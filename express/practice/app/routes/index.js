const express = require('express')
const router = express.Router()
const indexController = require("../controller/Controller")

router.get("/", (req, res) =>
{
    res.send("Hello world");
});

router.get("/user", indexController.user)

module.exports = router;