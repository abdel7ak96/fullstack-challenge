var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var fs = require('fs');

/* GET games with the highest number of unique players */
router.get('/', function(req, res, next) {

  let games;
  let queryGenre = req.query.genre;
  let queryPlatform = req.query.platform;
  let users = [];

  try {
    const jsonString = fs.readFileSync('./public/data/games.json');
    games = JSON.parse(jsonString);
  } catch (err) {
    console.log(err)
    return
  }

  let group = lodash.groupBy(games.data, 'game');
  let reduce = lodash.reduce(group, function(result, value, key) {


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

  let filter = reduce;
  if(queryPlatform !== undefined || queryGenre !== undefined) {
    if(queryPlatform !== undefined && queryGenre !== undefined) {
      filter = lodash.filter(reduce, function(element) {
        return lodash.startsWith(element.genre, queryGenre) &&
        lodash.some(element.platforms, function (o) {
          return lodash.startsWith(o ,queryPlatform);
        });
      });
    }
    else if(queryPlatform !== undefined) {
      filter = lodash.filter(reduce, function(element) {
        return lodash.some(element.platforms, function (o) {
          return lodash.startsWith(o ,queryPlatform);
        });
      });
    }
    else {
      filter = lodash.filter(reduce, function(element) {
        return lodash.startsWith(element.genre, queryGenre);
      });
    }
  }

  let order = lodash.orderBy(filter, ['numberOfPlayers'], ['desc']);

  res.send(order);
});

module.exports = router;
