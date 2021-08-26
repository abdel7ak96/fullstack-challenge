var express = require('express');
var router = express.Router();
var lodash = require('lodash');

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

  let group = lodash.groupBy(games.data, 'game');
  let reduce = lodash.reduce(group, function(result, value, key) {

    let users = [];

    value.map((element) => {
      if(!users.includes(element.userId)) {
        users.push(element.userId);
      }
    })
    result.push({
      'game': key,
      'platforms': value[0].platforms,
      'genre': value[0].genre,
      'numberOfPlayers': users.length
    });
    
    return result;
  }, []);

  let order = lodash.orderBy(reduce, ['numberOfPlayers'], ['desc']);

  res.send(order);
});

module.exports = router;
