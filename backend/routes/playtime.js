var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var fs = require('fs');

/* GET games that have the highest total playtime between users. */
router.get('/', function(req, res, next) {

  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  let queryGenre = req.query.genre;
  let queryPlatform = req.query.platform;
  let jsonObject;

  try {
    const jsonString = fs.readFileSync('./public/data/games.json');
    jsonObject = JSON.parse(jsonString);
  } catch (err) {
    console.log(err)
    return
  }

  let group = lodash.groupBy(jsonObject.data, 'game');
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

  let order = lodash.orderBy(filter, ['totalPlayTime'], ['desc']);
  
  res.send(order);
});

module.exports = router;
