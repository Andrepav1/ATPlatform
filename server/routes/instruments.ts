import express from 'express';
import fx from 'simple-fxtrade';
import { getInstrument } from '../util/instruments';

const router = express.Router();

// get all instruments
router.get('/', async (req, res, next) => {
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
router.get('/candles/', async (req, res, next) => {
  const { id, granularity, count } = req.body;

  getInstrument({ id, granularity, count })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error });
    });
});

export default router;
