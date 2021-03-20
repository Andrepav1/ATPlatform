
const CURRENCY_PAIR_UNIT = 1000;
const METAL_UNIT = 50;
const INDEX_UNIT = 1;

const signals = {
	STRONG_SELL: 0,
	SELL: 1,
  NEUTRAL: 2,
  BUY: 3, 
  STRONG_BUY: 4
}

const comparisons = {
  LESS_THAN: 0,
  EQUALS: 1,
  GREATER_THAN: 2,
  CROSS_DOWN: 3,
  CROSS: 4,
  CROSS_UP: 5,
}

module.exports = {
  CURRENCY_PAIR_UNIT,
  METAL_UNIT,
  INDEX_UNIT,
  signals,
  comparisons,
}