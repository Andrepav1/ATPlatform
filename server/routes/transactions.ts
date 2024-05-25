import express from 'express';
import fx from 'simple-fxtrade';
import { getAccountSummary } from '../util/accounts';

const router = express.Router();

const TRANSACTION_PER_PAGE = 20;

const getTransactionSinceId = async (id) => {
  return await fx.transactions.sinceid({ id });
};

const getTransactionsPage = async (page, accountId) => {
  const accountSummary = await getAccountSummary(accountId);

  const sinceId =
    parseInt(accountSummary.lastTransactionID) - page * TRANSACTION_PER_PAGE;

  return await getTransactionSinceId(sinceId);
};

/*Gets n transaction pages. */
router.get('/', (req, res, next) => {
  const { page, accountId } = req.query;

  let tPage = page ? parseInt(String(page)) : 1;

  getTransactionsPage(tPage, accountId)
    .then(({ transactions }) => {
      res.json(transactions);
    })
    .catch((error) => {
      res.json({ error });
    });
});

router.get('/idrange', (req, res, next) => {
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

router.get('/sinceid/', (req, res, next) => {
  const { id } = req.query;

  getTransactionSinceId(id)
    .then((result) => {
      console.log('res', result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

export default router;
