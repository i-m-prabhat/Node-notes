const express = require("express");
const router = express.Router();
const studentController = require("../controller/StudentController")

router.get("/", studentController.home)
router.get("/create", studentController.create)
router.get("/delete", studentController.delete)
router.get("/update", studentController.update)

module.exports = router