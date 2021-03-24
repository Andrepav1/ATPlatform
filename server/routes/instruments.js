var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');

// get all instruments
router.get('/', async (req, res, next) => {

  try {
   
    const {instruments} = await fx.instruments(); 

    instruments.sort((a,b) => a.name.localeCompare(b.name));

    res.json({ instruments });

  } catch (error) {
    console.log(error);
    res.json({error});
  }

});


module.exports = router;
