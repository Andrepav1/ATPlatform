const {
  calculateIndicatorValues,
  getIndicatorSignal,
  getIndicatorExpectedInput,
  signals,
} = require("../util/technical-indicator");
const { latestValues, extractInputData } = require("./tests-util");

test("Testing DoubleMovingAverageCrossover", () => {
  const inputData = {
    shortMethod: "SMA",
    longMethod: "SMA",
    values: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
    ],
    shortPeriod: 7,
    longPeriod: 15,
  };

  const result = calculateIndicatorValues(
    { name: "DoubleMovingAverageCrossover" },
    inputData
  );

  const expected = [
    { short: 12, long: 8 },
    { short: 13, long: 9 },
    { short: 14, long: 10 },
    { short: 15, long: 11 },
    { short: 16, long: 12 },
    { short: 17, long: 13 },
    { short: 18, long: 14 },
    { short: 19, long: 15 },
    { short: 20, long: 16 },
    { short: 21, long: 17 },
    { short: 22, long: 18 },
  ];

  expect(result).toEqual(expected);
});

// test('ATR Testing', () => {

//   const expectedInput = getIndicatorExpectedInput("ATR");
//   let inputData = extractInputData(latestValues, expectedInput);
//   inputData = { ...inputData, period: 14, format: (a) => a.toFixed(4) };

//   const values = calculateIndicatorValues({ name: "ATR" }, inputData);

// })

test("Testing int, float, string values equivalence (on Stochastic)", () => {
  const expectedInput = getIndicatorExpectedInput("Stochastic");
  let inputData = extractInputData(latestValues, expectedInput);

  intInputData = {
    ...inputData,
    period: 14,
    signalPeriod: 4,
    format: (a) => a.toFixed(4),
  };
  const intValues = calculateIndicatorValues({ name: "ATR" }, intInputData);

  stringInputData = {
    ...inputData,
    period: "14",
    signalPeriod: "4",
    format: (a) => a.toFixed(4),
  };
  const stringValues = calculateIndicatorValues(
    { name: "ATR" },
    stringInputData
  );

  floatInputData = {
    ...inputData,
    period: 14.0,
    signalPeriod: 4.0,
    format: (a) => a.toFixed(4),
  };
  const floatValues = calculateIndicatorValues({ name: "ATR" }, floatInputData);

  expect(intValues).toEqual(stringValues);
  expect(stringValues).toEqual(floatValues);
  expect(floatValues).toEqual(intValues);
});

test("Testing crossover function", () => {});
