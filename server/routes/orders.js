var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('orders')
});


router.post('/place', (req, res, next) => {
  const query = req.query;
  const params = req.params;

  console.log(query, params);

})

module.exports = router;
