const db = require('../db');

const indicatorSchema = new db.Schema({
  name: String,
  config: Object
});

const Indicator = db.model('Indicator', indicatorSchema);

module.exports = Indicator;