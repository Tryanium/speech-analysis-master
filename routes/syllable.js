var express = require('express');
var router = express.Router();

var syllable = require('syllable');

router.post('/', function (req, res) {
  let total = 0;
  //Nb de syllable total dans le text
  let text = req.body.text;
  text.forEach(function (words) {
    total += syllable(words);
  });
  res.send(total.toString());
});

module.exports = router;
