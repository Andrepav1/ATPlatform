var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');

// get all instruments
router.get('/', async (req, res, next) => {

  try {
   
    const {instruments} = await fx.instruments(); 
    res.json({ instruments });

  } catch (error) {
    res.json({error});
  }

});


module.exports = router;
