import express from 'express';
import { Strategy } from '../models/strategy';
import { updateStrategy } from '../util/strategies';

const router = express.Router();

// Get all strategies
router.get('/', (req, res, next) => {
  if (req.query.id) {
    const _id = req.query.id;
    Strategy.findOne({ _id }, (error, strategy) => {
      if (error) return res.json({ error });
      res.json({ strategy });
    });
  } else {
    Strategy.find({}, (error, strategies) => {
      if (error) return res.json({ error });
      res.json({ strategies });
    });
  }
});

// delete strategy
router.delete('/', (req, res, next) => {
  const strategyId = req.query.id;
  Strategy.findByIdAndRemove(strategyId, {}, (error, strategy) => {
    if (error) return res.json({ error });
    res.json({ strategy });
  });
});

// create strategy
router.post('/', (req, res, next) => {
  const { strategy } = req.body;

  // Create an instance of model
  var strategy_instance = new Strategy(strategy);

  // Save the new model instance, passing a callback
  strategy_instance.save((error, strategy) => {
    if (error) return res.json({ error });
    console.log('strategy saved');
    res.json({ strategy });
  });
});

router.patch('/', (req, res, next) => {
  const { strategy } = req.body;
  console.log(strategy._id);

  // Quick fix, to remove in the future
  strategy.indicators.forEach((indicator) => delete indicator._id);

  updateStrategy(strategy)
    .then(() => {
      res.json({ message: 'Strategy updated successfully' });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

export default router;
