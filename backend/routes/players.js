var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET games with the highest number of unique players */
router.get('/', function(req, res, next) {
  let games;

  try {
    const jsonString = fs.readFileSync('./public/data/games.json');
    games = JSON.parse(jsonString);
  } catch (err) {
    console.log(err)
    return
  }

  res.send(games);
});

module.exports = router;
