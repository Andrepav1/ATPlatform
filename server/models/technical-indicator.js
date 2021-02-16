const db = require('../db');


// all config temporarily set to float, TODO: change to correct type
const indicatorSchema = new db.Schema({
  name: String,
  StdDev:	Int16Array,
  fastPeriod:	Int16Array,
  slowPeriod: Int16Array,
  signalPeriod: Int16Array,
  period: Int16Array,
  noOfBars: Int16Array,
  step: Float32Array,
  max: Float32Array,
  dPeriod: Int16Array,
  kPeriod: Int16Array,
  rsiPeriod: Int16Array,
  stochasticPeriod: Int16Array,

  // TODO: ADD FOLLOWING
  // SimpleMAOscillator: Boolean,
  // SimpleMASignal: Boolean
});

const Indicator = db.model('Indicator', indicatorSchema);

module.exports = Indicator;