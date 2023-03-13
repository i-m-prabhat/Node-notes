var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>This is Prabhat Patel</h1>');

  // write + end - send
});

module.exports = router;
