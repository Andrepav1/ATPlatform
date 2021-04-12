var express = require("express");
var router = express.Router();
const fx = require("simple-fxtrade");

const getOrders = () => {
  return new Promise(function (resolve, reject) {
    fx.orders()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* GET home page. */
router.get("/", (req, res, next) => {
  getOrders()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.post("/place", (req, res, next) => {
  const query = req.query;
  const params = req.params;

  console.log(query, params);
});

module.exports = router;
