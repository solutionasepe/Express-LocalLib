const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/cool', function(req, res, next) {
  res.render('example', {title: "You're cool"});
});

module.exports = router;
