var express = require("express");
var router = express.Router();
const fx = require("simple-fxtrade");

var { getAccountSummary } = require("../util/accounts");

const TRANSACTION_PER_PAGE = 20;

const getTransactionSinceId = (id) => {
  return new Promise((resolve, reject) => {
    fx.transactions
      .sinceid({ id })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getTransactionsPage = (page, accountId) => {
  return new Promise(function (resolve, reject) {
    getAccountSummary(accountId)
      .then(({ lastTransactionID }) => {
        const sinceId =
          parseInt(lastTransactionID) - page * TRANSACTION_PER_PAGE;

        getTransactionSinceId(sinceId)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* GET home page. */
router.get("/", (req, res, next) => {
  const { page, accountId } = req.query;
  let tPage = page ? parseInt(page) : 1;

  getTransactionsPage(tPage, accountId)
    .then(({ transactions }) => {
      res.json(transactions);
    })
    .catch((error) => {
      res.json({ error });
    });
});

router.get("/idrange", (req, res, next) => {
  const { from, to } = req.query;
  fx.transactions
    .idrange({ from, to })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error });
    });
});

router.get("/sinceid", (req, res, next) => {
  const { id } = req.query;

  getTransactionSinceId(id)
    .then((result) => {
      console.log("res", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

module.exports = router;
