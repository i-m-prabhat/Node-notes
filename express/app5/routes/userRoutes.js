const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController")

const user = new UserController();

router.get('/', (req, res, next) =>
{
    user.home(req, res, next);
})
router.get('/create', (req, res, next) =>
{
    user.create(req, res, next);
})
router.get('/show', (req, res, next) =>
{
    user.show(req, res, next)
})

module.exports = router