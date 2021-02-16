var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');
const { technicalIndicators, getIndicatorConfig } = require('../util/technical-indicator')


// get all indicators
router.get('/', (req, res, next) => {

  const formattedIndicators = technicalIndicators.map((indicator) => {
    return {
      name: indicator.name,
      config: getIndicatorConfig(indicator.name)
    }
  })

  res.json(formattedIndicators);
  
})


module.exports = router;
