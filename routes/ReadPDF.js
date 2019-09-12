var express = require('express');
var router = express.Router();

/** PDF READER **/
const fs = require('fs');
//const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('docTEST.pdf');

router.post('/', function (req, res) {
  /*
  let pdfFile = req.body;
  console.log(pdfFile);
  pdf(dataBuffer).then(function(data) {
      res.send(data.text);
  }).catch(function(error){
    console.log(error);
  });
  */
  res.send("OKAY");
});

module.exports = router;
