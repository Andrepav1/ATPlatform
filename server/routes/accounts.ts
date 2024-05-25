import express from 'express';
import fx from 'simple-fxtrade';
import { getAccountSummary, getAccounts } from '../util/accounts';

const router = express.Router();

router.get('/', function (req, res, next) {
  const { apiKey, live } = req.query;

  // live is turned to string, need to turn it back to boolean
  let isLive = live == 'true';

  fx.configure({ apiKey, live: isLive });

  getAccounts()
    .then(({ accounts }) => {
      const promises = [];
      for (let i = 0; i < accounts.length; i++) {
        promises.push(getAccountSummary(accounts[i].id));
      }

      Promise.all(promises)
        .then((accounts) => {
          res.json({ accounts });
        })
        .catch((error) => {
          console.log(error);
          res.json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get('/summary', function (req, res, next) {
  const { accountId } = req.query;

  getAccountSummary(accountId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

export default router;
