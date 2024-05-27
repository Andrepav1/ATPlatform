import express from 'express';
import { getBots, updateBot } from '../util/bots';
import { Bot } from '../models/bot';

const router = express.Router();

// Get all bots
router.get('/', (req, res, next) => {
  getBots()
    .then((bots) => {
      // console.log(bots);
      res.json({ bots });
    })
    .catch((error) => {
      // console.log(error);
      res.json({ error });
    });
});

// get single bot
router.get('/', (req, res, next) => {
  return null;
});

// delete bot
router.delete('/', (req, res, next) => {
  return null;
});

// create bot
router.post('/', (req, res, next) => {
  const { bot } = req.body;

  // Create an instance of model
  const bot_instance = new Bot(bot);

  // Save the new model instance, passing a callback
  bot_instance.save().then((bot) => {
    console.log('bot saved');
    res.json({ bot });
  });
});

router.put('/update', (req, res, next) => {
  const { id, live } = req.body;

  updateBot(id, { live })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error });
    });
});

export default router;
