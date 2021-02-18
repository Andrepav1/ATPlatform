var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');
const { Strategy } = require('../models/strategy');


// Get all strategies
router.get('/', (req, res, next) => {
  Strategy.find({}, (error, strategies) => {
    if(error) return res.json({error});
    res.json({strategies});
  })
})

// get single strategy
router.get('/:id', (req, res, next) => {

})

// delete strategy
router.delete('/:id', (req, res, next) => {

})

// create strategy
router.post('/', (req, res, next) => {

  const { strategy } = req.body;
  
  // Create an instance of model
  var strategy_instance = new Strategy(strategy);

  // Save the new model instance, passing a callback
  strategy_instance.save((error) => {
    if (error) return res.json({ error })
    console.log("strategy saved");
  });

  res.json({strategy});
})

module.exports = router;
