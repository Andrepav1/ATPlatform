var express = require("express");
var router = express.Router();
const { Bot } = require("../models/bot");
const { getBots, updateBot } = require("../util/bots");

// Get all bots
router.get("/", (req, res, next) => {
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
router.get("/", (req, res, next) => {});

// delete bot
router.delete("/", (req, res, next) => {});

// create bot
router.post("/", (req, res, next) => {
  const { bot } = req.body;

  // Create an instance of model
  var bot_instance = new Bot(bot);

  // Save the new model instance, passing a callback
  bot_instance.save((error) => {
    if (error) return res.json({ error });
    console.log("bot saved");

    res.json({ bot });
  });
});

router.put("/update", (req, res, next) => {
  const { id, live } = req.body;

  updateBot(id, { live })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error });
    });
});

module.exports = router;
