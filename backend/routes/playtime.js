var express = require('express');
var router = express.Router();
var lodash = require('lodash');
var cors = require('cors');
var readData = require('../middlewares/readData');

// Access-Control-Allow-Origin setting
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

/* GET games that have the highest total playtime between users. */
router.get('/', readData, cors(corsOptions), function(req, res, next) {

  let queryGenre = req.query.genre;
  let queryPlatform = req.query.platform;

  let group = lodash.groupBy(req.jsonObject.data, 'game');
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
        return lodash.includes(lodash.toLower(element.genre), lodash.toLower(queryGenre)) &&
        lodash.some(element.platforms, function (o) {
          return lodash.includes(lodash.toLower(o) ,lodash.toLower(queryPlatform));
        });
      });
    }
    else if(queryPlatform !== undefined) {
      filter = lodash.filter(reduce, function(element) {
        return lodash.some(element.platforms, function (o) {
          return lodash.includes(lodash.toLower(o) ,lodash.toLower(queryPlatform));
        });
      });
    }
    else {
      filter = lodash.filter(reduce, function(element) {
        return lodash.includes(lodash.toLower(element.genre), lodash.toLower(queryGenre));
      });
    }
  }

  let order = lodash.orderBy(filter, ['totalPlayTime'], ['desc']);
  
  res.send(order);
});

module.exports = router;
