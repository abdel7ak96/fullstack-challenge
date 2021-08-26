var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var fs = require('fs');

/* GET games that have the highest total playtime between users. */
router.get('/', function(req, res, next) {

  let games;

  try {
    const jsonString = fs.readFileSync('./public/data/games.json');
    games = JSON.parse(jsonString);
  } catch (err) {
    console.log(err)
    return
  }

  let group = lodash.groupBy(games.data, 'game');
  let reduce = lodash.reduce(group, function(result, value, key) {
    let sum = 0;
    value.map((element) => {
      sum = sum + element.playTime;
    })
    result.push({
      'game': key,
      'platforms': value[0].platforms,
      'genre': value[0].genre,
      'totalPlayTime': sum
    });
    
    return result;
  }, []);

  let order = lodash.orderBy(reduce, ['totalPlayTime'], ['desc']);

  res.send(order);
});

module.exports = router;
