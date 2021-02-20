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
    console.log(result);
    res.json(result);
  }).catch((error) => {
    console.log(error);
    res.json({ error });
  });
});

router.post(('/close'), (req, res, next) => {

  const { id } = req.body;
  console.log(id);
  fx.trades.close({ id })
  .then((result) => {
    console.log(result);
    res.json(result);
  }).catch((error) => {
    console.log(error);
    res.json({ error });
  });

});

module.exports = router;
