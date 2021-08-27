var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var fs = require('fs');

/* GET games with the highest number of unique players */
router.get('/', function(req, res, next) {

  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  let jsonObject;
  let queryGenre = req.query.genre;
  let queryPlatform = req.query.platform;
  let users = [];

  try {
    const jsonString = fs.readFileSync('./public/data/games.json');
    jsonObject = JSON.parse(jsonString);
  } catch (err) {
    console.log(err)
    return
  }

  let group = lodash.groupBy(jsonObject.data, 'game');
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
          return lodash.startsWith(lodash.toLower(o) ,lodash.toLower(queryPlatform));
        });
      });
    }
    else if(queryPlatform !== undefined) {
      filter = lodash.filter(reduce, function(element) {
        return lodash.some(element.platforms, function (o) {
          return lodash.startsWith(lodash.toLower(o) ,lodash.toLower(queryPlatform));
        });
      });
    }
    else {
      filter = lodash.filter(reduce, function(element) {
        return lodash.startsWith(lodash.toLower(element.genre), lodash.toLower(queryGenre));
      });
    }
  }

  let order = lodash.orderBy(filter, ['numberOfPlayers'], ['desc']);

  res.send(order);
});

module.exports = router;
