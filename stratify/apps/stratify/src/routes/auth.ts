import express from 'express';
import fx from 'simple-fxtrade';
import { User } from '../models/user';

const router = express.Router();

// login only sets the API key and the account ID for the next calls and saves the user object
router.post('/login', async (req, res, next) => {
  const { apiKey, accountId, live } = req.body;

  try {
    fx.configure({ apiKey, accountId, live });

    const user_instance = new User({
      api_key: apiKey,
      primary_account: accountId
    });

    await user_instance.save();
  } catch (error) {
    next(error);
  }
  res.json({ apiKey, accountId });
});

export default router;
