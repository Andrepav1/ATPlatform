var express = require("express");
var router = express.Router();
const { getTrades, closeTrade } = require("../util/trades");

router.get("/", (req, res, next) => {
  getTrades()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.post("/close", (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  closeTrade(id)
    .then((result) => {
      // console.log();
      res.json(result);
    })
    .catch((error) => {
      res.json({ error });
    });
});

module.exports = router;
