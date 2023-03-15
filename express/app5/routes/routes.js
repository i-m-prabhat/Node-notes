const express = require("express");
const router = express.Router();
const indexController = require("../controller/IndexController")

router.get("/routes", indexController.home)
router.get("/contact", indexController.contact)
router.get("/gallery", indexController.gallery)

module.exports = router