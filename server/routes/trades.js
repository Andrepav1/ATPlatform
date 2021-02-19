var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');

const getTrades = () => {
  return new Promise(function(resolve, reject) {
    fx.trades()
    .then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
}

router.get('/', (req, res, next) => {

  getTrades()
  .then((result) => {
    
    res.json(result);
  }).catch((error) => {
    console.log(error);
    res.json({ error });
  });
});


module.exports = router;
