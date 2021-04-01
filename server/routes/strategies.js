var express = require('express');
var router = express.Router();
const { Strategy } = require('../models/strategy');

const updateStrategy = (strategy) => {
  return new Promise((resolve, reject) => {
    Strategy.findByIdAndUpdate(strategy._id, strategy, null, (error) => {
      if(error) return reject(error);
      resolve();
    })
  })
}

// Get all strategies
router.get('/', (req, res, next) => {

  if(req.query.id) {
    const _id = req.query.id;
    Strategy.findOne({ _id }, (error, strategy) => {
      if(error) return res.json({error});
      res.json({strategy});
    })
  }
  else {
    Strategy.find({}, (error, strategies) => {
      if(error) return res.json({error});
      res.json({strategies});
    })
  }
})

// delete strategy
router.delete('/', (req, res, next) => {
  const strategyId = req.query.id;
  Strategy.findByIdAndRemove(strategyId, (error, strategy) => {
    if(error) return res.json({ error })
      res.json({strategy});
  });
})

// create strategy
router.post('/', (req, res, next) => {

  const { strategy } = req.body;
  
  // Create an instance of model
  var strategy_instance = new Strategy(strategy);

  // Save the new model instance, passing a callback
  strategy_instance.save((error, strategy) => {
    if (error) return res.json({ error })
    console.log("strategy saved");
    res.json({strategy});
  });

})

router.patch('/', (req, res, next) => {
  const { strategy } = req.body;
  console.log(strategy._id);
  updateStrategy(strategy)
  .then(() => {
    res.json({ message: "Strategy updated successfully" });
  }).catch((error) => {
    console.log(error);
    res.json({error});
  });
})

module.exports = router;
