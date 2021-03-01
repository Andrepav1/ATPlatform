var express = require('express');
var router = express.Router();
const fx = require('simple-fxtrade');
const { technicalIndicators, getIndicatorConfig, getIndicatorSignalConfig } = require('../util/technical-indicator')


// get all indicators
router.get('/', (req, res, next) => {

  let tiArray = Object.values(technicalIndicators)
  const formattedIndicators = tiArray.map((indicator) => {
    return {
      name: indicator.name,
      config: getIndicatorConfig(indicator.name),
      signalConfig: getIndicatorSignalConfig(indicator.name),
    }
  })

  res.json(formattedIndicators);
})


module.exports = router;
