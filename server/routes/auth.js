var express = require('express');
var router = express.Router();

const fx = require('simple-fxtrade');

// login only sets the API key and the account ID for the next calls 
router.post('/login', function(req, res, next) {
  
  const { apiKey, accountId, live } = req.body;

  try {
    fx.configure({ apiKey, accountId, live });
  } catch (error) {
    next(error)
  }

  res.json({ apiKey, accountId })

});

module.exports = router;
