var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');
const { Bot } = require('../models/bot');


// Get all bots
router.get('/', (req, res, next) => {
  Bot.find({}, (error, bots) => {
    if(error) return res.json({error});
    res.json({bots});
  })
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

module.exports = router;
