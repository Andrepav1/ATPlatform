var express = require("express");
var router = express.Router();
const fx = require("simple-fxtrade");
const { getInstrument } = require("../util/instruments");

// get all instruments
router.get("/", async (req, res, next) => {
  try {
    const { instruments } = await fx.instruments();

    instruments.sort((a, b) => a.name.localeCompare(b.name));

    res.json({ instruments });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// get all instruments
router.get("/candles/", async (req, res, next) => {
  const { id, granularity, count } = req.body;

  getInstrument({ id, granularity, count })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error });
    });
});

module.exports = router;
