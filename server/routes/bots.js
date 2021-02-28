var express = require('express');
const ObjectId = require('mongoose').Types.ObjectId; 
var router = express.Router();
const fx = require('simple-fxtrade');
const { Bot } = require('../models/bot');
const { getBots } = require('../util/bots');

// Get all bots
router.get('/', (req, res, next) => {
  getBots()
  .then((bots) => {
    // console.log(bots);
    res.json({ bots });
  }).catch((error) => {
    // console.log(error);
    res.json({ error });
  });
})

// get single bot
router.get('/:id', (req, res, next) => {

})

// delete bot
router.delete('/:id', (req, res, next) => {

})

// create bot
router.post('/', (req, res, next) => {

  const { bot } = req.body;
  
  // Create an instance of model
  var bot_instance = new Bot(bot);

  // Save the new model instance, passing a callback
  bot_instance.save((error) => {
    if (error) return res.json({ error })
    console.log("bot saved");
  });

  res.json({bot});
})

router.put('/update', (req, res, next) => {

  const { id, status } = req.body;

  Bot.findByIdAndUpdate(id, { $set: { live: status } }, null, (error, result) => {
    if(error) return res.json({error});
    res.json(result);
  })

})

module.exports = router;
