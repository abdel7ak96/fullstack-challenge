var fs = require('fs');

module.exports = (req, res, next) => {
    let jsonObject;
    try {
        const jsonString = fs.readFileSync('./public/data/games.json');
        jsonObject = JSON.parse(jsonString);
      } catch (err) {
        console.log(err)
        return
      }
    req.jsonObject = jsonObject;
    next();
}