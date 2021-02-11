var express = require('express');
var router = express.Router();

const fx = require('simple-fxtrade');


const getAccounts = async (callback) => {
  try {
    const { accounts } = await fx.accounts();
    callback(accounts);
  } catch (error) {
    callback(null, error);
  }
}


router.get('/accounts', function(req, res, next) {
  
  const { apiKey } = req.query;
  
  fx.configure({ apiKey });

  getAccounts((accounts, error) => {
    if(error) return res.json({ error });

    res.json({ accounts });

  })
});

// login only sets the API key and the account ID for the next calls 
router.post('/login', function(req, res, next) {
  
  const { apiKey, accountId } = req.body;

  fx.configure({ apiKey, accountId });

  res.json({ apiKey, accountId })

});

module.exports = router;
