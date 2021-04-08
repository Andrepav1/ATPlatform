const BASE_URL = "http://localhost:5000/api/v1";
const SOCKET_IO_ENDPOINT = "http://localhost:5000/";
const CURRENCY_PAIR_UNIT = 1000;
const METAL_UNIT = 50;
const INDEX_UNIT = 1;

const comparisons = {
  LESS_THAN: 0,
  EQUALS: 1,
  GREATER_THAN: 2,
  CROSS_DOWN: 3,
  CROSS: 4,
  CROSS_UP: 5,
};

export {
  BASE_URL,
  SOCKET_IO_ENDPOINT,
  CURRENCY_PAIR_UNIT,
  METAL_UNIT,
  INDEX_UNIT,
  comparisons,
};
