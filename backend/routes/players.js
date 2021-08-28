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

/* GET games with the highest number of unique players */
router.get('/', readData, cors(corsOptions), function(req, res, next) {
  
  let queryGenre = req.query.genre;
  let queryPlatform = req.query.platform;
  
  let group = lodash.groupBy(req.jsonObject.data, 'game');
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

  let order = lodash.orderBy(filter, ['numberOfPlayers'], ['desc']);

  res.send(order);
});

module.exports = router;
