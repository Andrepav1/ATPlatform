var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');


// Get all strategies
router.get('/', (req, res, next) => {

  res.json([])
})

// get single strategy
router.get('/:id', (req, res, next) => {

})

// delete strategy
router.delete('/:id', (req, res, next) => {

})

// create strategy
router.post('/:id', (req, res, next) => {
  const query = req.query;
  const params = req.params;

  console.log(query, params);
})

module.exports = router;
