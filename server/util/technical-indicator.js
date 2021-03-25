const {
  // ADL,
  ADX,
  ATR,
  AwesomeOscillator,
  BollingerBands,
  CCI,
  ForceIndex,
  MFI,
  MACD,
  OBV,
  PSAR,
  ROC,
  RSI,
  SMA,
  Stochastic,
  StochasticRSI,
  TRIX,
  VWAP,
  EMA,
  WMA,
  WEMA,
  WilliamsR,
  IchimokuCloud,
} = require('technicalindicators');

const { Comparison, Signal } = require('../util/constants');

function getMovingAverageObject(type) {
  switch (type) {
    case "SMA":
      return SMA;
    case "EMA":
      return EMA;
    case "WMA":
      return WMA;
    case "WEMA":
      return WEMA;
    default:
      return SMA;
  }
}

class MovingAverage {
  constructor() {
    this.name = "MovingAverage";
    this.label = "Moving Average"
  }

  calculate({ type, values, period, format }) {
    return MovingAverage.calculate({ type, values, period, format })
  }
  
  static calculate({ type, values, period, format = x => x }) {
    const maObj = getMovingAverageObject(type);
    return maObj.calculate({ values, period, format });
  }
} 

class DoubleMovingAverage {
  constructor() {
    this.name = "DoubleMovingAverage";
    this.label = "Double Moving Average"
  }

  calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format }) {
    return DoubleMovingAverage.calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format })
  }
  
  static calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format = x => x }) {

    const shortMA = getMovingAverageObject(shortMethod);
    const longMA = getMovingAverageObject(longMethod);

    const shortValues = shortMA.calculate({ values, period: shortPeriod, format }).reverse();
    const longValues = longMA.calculate({ values, period: longPeriod, format }).reverse();

    const result = []

    let arrLength = longValues.length;
    for (let i = 0; i < arrLength; i++) {
      let short = shortValues.shift();
      let long = longValues.shift();
      result.unshift({ shortMA: short, longMA: long });
    }

    return result;
  }
} 

class TripleMovingAverage {
  constructor() {
    this.name = "TripleMovingAverage";
    this.label = "Triple Moving Average"
  }

  calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format }) {
    return TripleMovingAverage.calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format })
  }

  static calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format = x => x }) {
    
    const shortMA = getMovingAverageObject(shortMethod);
    const mediumMA = getMovingAverageObject(mediumMethod);
    const longMA = getMovingAverageObject(longMethod);

    const shortValues = shortMA.calculate({ values, period: shortPeriod, format }).reverse();
    const mediumValues = mediumMA.calculate({ values, period: mediumPeriod, format }).reverse();
    const longValues = longMA.calculate({ values, period: longPeriod, format }).reverse();

    const result = []

    let arrLength = longValues.length;
    for (let i = 0; i < arrLength; i++) {
      let short = shortValues.shift();
      let medium = mediumValues.shift();
      let long = longValues.shift();
      result.unshift({ short, medium, long });
    }

    return result;
  }
} 


const technicalIndicators = {
  ADX,
  ATR,
  AwesomeOscillator,
  BollingerBands,
  CCI,
  ForceIndex,
  MFI,
  MACD,
  OBV,
  PSAR,
  ROC,
  RSI,
  Stochastic,
  StochasticRSI,
  TRIX,
  VWAP,
  WilliamsR,
  IchimokuCloud,
  // MOVING AVERAGE CROSSOVER INDICATORS
  MovingAverage,
  DoubleMovingAverage,
  TripleMovingAverage
};

// returns an array
// CROSS_UP,  if line A crosses above line B
// CROSS_DOWN, if line A crosses below line B 
// NO_CROSS otherwise
const getCrossOver = (values, a, b) => {
  let result = [];
  for (let i = 0; i < values.length-1; i++) {
    let currValues = values[i];
    let nextValues = values[i+1];
    
    if(nextValues[a] >= nextValues[b] && currValues[a] < currValues[b]) { // line A crossing above
      result[i] = Comparison.CROSS_UP;
    }
    else if(nextValues[a] <= nextValues[b] && currValues[a] > currValues[b]) { // line A crossing below
      result[i] = Comparison.CROSS_DOWN;
    }
    else {
      result[i] = Comparison.NO_CROSS;
    }
  }
  return result;
}

// returns an array
// GREATER_THAN, if A > B
// LESS_THAN, if A < B 
const getComparison = (values, a, b) => {
  let result = [];
  for (let i = 0; i < values.length; i++) {
    let currValues = values[i];
    if(currValues[a] >= currValues[b]) {
      result.push(Comparison.GREATER_THAN);
    }
    else {
      result.push(Comparison.LESS_THAN);
    }
  }
  return result;
}

const getIndicatorObject = (name) => {
  return technicalIndicators[name];
}

const getIndicatorComponents = (name) => {
  switch (name) {
    case "ADL":
      return ["ADL", "price", "number"];
    case "ADX":
      return ["adx","mdi","pdi", "price", "number"];
    case "ATR":
      return ["ATR", "price", "number"];
    case "AwesomeOscillator":
      return ["AwesomeOscillator", "price", "number"];
    case "BollingerBands":
      return ["lower", "middle", "upper", "price", "number"]; 
    case "CCI":
      return ["CCI", "price", "number"];
    case "ForceIndex":
      return ["ForceIndex", "price", "number"];
    case "MFI":
      return ["MFI", "price", "number"];
    case "MACD":
      return ["MACD", "price", "number", "histogram", "signal" ];
    case "OBV":
      return ["OBV", "price", "number"];
    case "PSAR":
      return ["PSAR", "price", "number"];
    case "ROC":
      return ["ROC", "price", "number"];
    case "RSI":
      return ["RSI", "price", "number"];
    case "Stochastic":
      return ["d", "k", "price", "number"];
    case "StochasticRSI":
      return ["StochasticRSI", "price", "number"];
    case "TRIX":
      return ["TRIX", "price", "number"];
    case "VWAP":
      return ["VWAP", "price", "number"];
    case "WilliamsR":
      return ["WilliamsR", "price", "number"];
    case "IchimokuCloud":
      return ["conversion", "base", "spanA", "spanB"];
    case "MovingAverage":
      return ["MA", "price", "number"];
    case "DoubleMovingAverage":
      return ["shortMA", "longMA", "price", "number"];
    case "TripleMovingAverage":
      return ["shortMA", "mediumMA", "longMA", "price", "number"];
    default:
      return ["price", "number"];
  }
}

const getIndicatorExpectedInput = (name) => {
  switch (name) {
    case "ADL":
      return ["volume","high","low","close"];
    case "ADX":
      return ["high","low","close"];
    case "ATR":
      return ["high","low","close"];
    case "AwesomeOscillator":
      return ["high","low"];
    case "BollingerBands":
      return ["values"]; 
    case "CCI":
      return ["high","low","open","close"];
    case "ForceIndex":
      return ["volume","high","low","open","close"];
    // case "KST": // NOT CURRENTLY AVAILABLE 
    //   return ["values"];
    case "MFI":
      return ["volume","high","low","close"];
    case "MACD":
      return ["values"];
    case "OBV":
      return ["volume","close"];
    case "PSAR":
      return ["high","low"];
    case "ROC":
      return ["values"];
    case "RSI":
      return ["values"];
    case "Stochastic":
      return ["high","low","close"];
    case "StochasticRSI":
      return ["values"];
    case "TRIX":
      return ["values"];
    // case "TypicalPrice": // NOT CURRENTLY AVAILABLE 
    //   return ["high","low","close"];
    case "VWAP":
      return ["volume","high","low","open","close"];
    // case "VolumeProfile": // NOT CURRENTLY AVAILABLE 
    //   return ["volume","high","low","open","close"];
    case "WilliamsR":
      return ["high","low","close"];
    case "IchimokuCloud":
      return ["high","low"];
    case "MovingAverage":
      return ["values"];
    case "DoubleMovingAverage":
      return ["values"];
    case "TripleMovingAverage":
      return ["values"];
    default:
      return [];
  }
}

const calculateIndicatorValues = ({ name }, inputData) => {

  switch (name) {
    case "ADX":
      return ADX.calculate(inputData);
    case "ATR":
      return ATR.calculate(inputData);
    case "AwesomeOscillator":
      return AwesomeOscillator.calculate(inputData);
    case "BollingerBands":
      return BollingerBands.calculate(inputData);
    case "CCI":
      return CCI.calculate(inputData);
    case "ForceIndex":
      return ForceIndex.calculate(inputData);
    case "MFI":
      return MFI.calculate(inputData);
    case "MACD":
      return MACD.calculate(inputData);
    case "OBV":
      return OBV.calculate(inputData);
    case "PSAR":
      return PSAR.calculate(inputData);
    case "ROC":
      return ROC.calculate(inputData);
    case "RSI":
      return RSI.calculate(inputData);
    case "Stochastic":
      return Stochastic.calculate(inputData);
    case "StochasticRSI":
      return StochasticRSI.calculate(inputData);
    case "TRIX":
      return TRIX.calculate(inputData);
    case "VWAP":
      return VWAP.calculate(inputData);
    case "WilliamsR":
      return WilliamsR.calculate(inputData);
    case "IchimokuCloud":
      return IchimokuCloud.calculate(inputData);
    case "MovingAverage":
      return MovingAverage.calculate(inputData);
    case "DoubleMovingAverage":
      return DoubleMovingAverage.calculate(inputData);
    case "TripleMovingAverage":
      return TripleMovingAverage.calculate(inputData);
    default:
      return [];
  }
}

const signalTriggered = (signal, values) => {

  // console.log(signal);

  if(signal.b === "number") {
    for (let i = 0; i < values.length; i++) {
      values[i].bN = signal.bN;
    }
  }

  switch (signal.comparison) {
    case Comparison.LESS_THAN:
    case Comparison.GREATER_THAN:
      let comparisonValues = getComparison(values, signal.a, signal.b);
      return (comparisonValues[1] === signal.comparison);
    case Comparison.CROSS:
    case Comparison.CROSS_DOWN:
    case Comparison.CROSS_UP:
      let crossOverValues = getCrossOver(values, signal.a, signal.b);
      
      if(signal.comparison === Comparison.CROSS) {
        return (crossOverValues[0] === Comparison.CROSS_DOWN || crossOverValues[0] === Comparison.CROSS_UP);
      }
      else {
        return (crossOverValues[0] === signal.comparison);
      }
    default:
      return false;
  }
}

const indicatorTriggered = (signals, values) => {

  // console.log(signals.length, "signals");

  let triggerSignal = true;

  for (const signal of signals) {
    let signalTrigger = signalTriggered(signal, values);

    // To provide a BUY/SELL signal all signals configurations have to trigger
    if(!signalTrigger) {
      triggerSignal = false;
    }

  }

  if(triggerSignal) {
    // All signals triggered, on each indicator signal types are all the same
    return signals[0].type==="BUY"?Signal.BUY:Signal.SELL;
  }
  else {
    return Signal.NEUTRAL;    
  }
}

const getIndicatorSignal = ({ config, signals }, values, prices) => {

  // keepSignalFor temporarily removed (on front-end too): TO ADD LATER ON (maybe)
  // values and prices are oldest to newest (ASC order).
  // keepSignalFor-1 as "Do not keep signal" (= 0) needs to only check the last value (= 1)
  // let latestValues = values.slice(values.length - config.keepSignalFor-1, values.length);
  // let latestPrices = prices.slice(prices.length - config.keepSignalFor-1, prices.length);
  // for (let i = 0; i < latestValues.length; i++) {
  //   latestValues[i].price = latestPrices[i];
  // }
  
  let latestValues = values.slice(values.length-2, values.length);
  let latestPrices = prices.slice(prices.length-2, prices.length);
  for (let i = 0; i < latestValues.length; i++) {
    latestValues[i].price = latestPrices[i];
  }
  console.log(latestValues);
  
  return indicatorTriggered(signals, latestValues);
}

// extract the values needed by the indicator from the instrument candles
const extractInputData = (candles, values) => {
  let inputData = {}

  values.forEach(value => {
    switch (value) {
      case "volume":
        inputData.volume = candles.map(_ => _.volume);
        break;
      case "values": // use "close" as default value, could be changed in the future no problemo
        inputData.values = candles.map(_ => parseFloat(_.mid.c));
        break;
      default: // open (o), close (c), high (h), low (l)
        inputData[value] = candles.map(_ => parseFloat(_.mid[value.charAt(0)]));
        break;
    }
  });
  return inputData;
}

// returns an array of values using the indicator config and expected input
const getIndicatorValues = (indicator, candles) => {
  let expectedInput = getIndicatorExpectedInput(indicator.name);
  let inputData = extractInputData(candles, expectedInput);
  inputData = { ...indicator.config, ...inputData, format: (a) => a.toFixed(4) };

  return calculateIndicatorValues(indicator, inputData);
}

const getIndicatorConfig = (name) => {

  switch (name) {
    case "ADL":
      return [];
    case"ADX":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case"ATR":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "AwesomeOscillator":
      return [
        {
          name: "fastPeriod",
          type: "number",
          defaultValue: 5
        },
        {
          name: "slowPeriod",
          type: "number",
          defaultValue: 34
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "BollingerBands":
      return [
        {
          name: "stdDev",
          type: "number",
          defaultValue: 2
        },
        {
          name: "period",
          type: "number",
          defaultValue: 20
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "CCI":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 20
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 13
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "MFI":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "MACD":
      return [
        {
          name: "fastPeriod",
          type: "number",
          defaultValue: 12
        },
        {
          name: "slowPeriod",
          type: "number",
          defaultValue: 26
        },
        {
          name: "signalPeriod",
          type: "number",
          defaultValue: 9
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
        // Boolean: SimpleMAOscillator TODO
        // Boolean: SimpleMASignal TODO
      ];
    case "OBV":
      return [
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "PSAR":
      return [
        {
          name: "step",
          type: "float",
          defaultValue: 0.02
        },
        {
          name: "max",
          type: "float",
          defaultValue: 0.2
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "ROC":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 9
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "RSI":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 10
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "Stochastic": 
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        },
        {
          name: "signalPeriod",
          type: "number",
          defaultValue: 3
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "StochasticRSI":
      return [
        {
          name: "dPeriod",
          type: "number",
          defaultValue: 3
        },
        {
          name: "kPeriod",
          type: "number",
          defaultValue: 14
        },
        {
          name: "rsiPeriod",
          type: "number",
          defaultValue: 14
        },
        {
          name: "stochasticPeriod",
          type: "number",
          defaultValue: 14
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ]; 
    case "TRIX":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 15
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "VWAP":
      return [
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "IchimokuCloud":
      return [
        {
          name: "conversionPeriod",
          type: "number",
          defaultValue: 9
        },
        {
          name: "spanPeriod",
          type: "number",
          defaultValue: 52
        },
        {
          name: "basePeriod",
          type: "number",
          defaultValue: 26
        },
        {
          name: "displacement",
          type: "number",
          defaultValue: 26
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "MovingAverage":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        },
        {
          name: "method",
          type: "enum",
          enum: ["SMA","EMA","WEMA","WMA"],
          defaultValue: "SMA"
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "DoubleMovingAverage":
      return [
        {
          name: "shortPeriod",
          type: "number",
          defaultValue: 14
        },
        {
          name: "longPeriod",
          type: "number",
          defaultValue: 50
        },
        {
          name: "shortMethod",
          type: "enum",
          enum: ["SMA","EMA","WEMA","WMA"],
          defaultValue: "SMA"
        },
        {
          name: "longMethod",
          type: "enum",
          enum: ["SMA","EMA","WEMA","WMA"],
          defaultValue: "SMA"
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    case "TripleMovingAverage":
      return [
        {
          name: "shortPeriod",
          type: "number",
          defaultValue: 14
        },
        {
          name: "mediumPeriod",
          type: "number",
          defaultValue: 50
        },
        {
          name: "longPeriod",
          type: "number",
          defaultValue: 100
        },
        {
          name: "shortMethod",
          type: "enum",
          enum: ["SMA","EMA","WEMA","WMA"],
          defaultValue: "SMA"
        },
        {
          name: "mediumMethod",
          type: "enum",
          enum: ["SMA","EMA","WEMA","WMA"],
          defaultValue: "SMA"
        },
        {
          name: "longMethod",
          type: "enum",
          enum: ["SMA","EMA","WEMA","WMA"],
          defaultValue: "SMA"
        },
        {
          name: "keepSignalFor",
          defaultValue: 0
        }
      ];
    default:
      return [];
  }
}

module.exports = {
  technicalIndicators,
  getIndicatorComponents,
  getIndicatorExpectedInput,
  getIndicatorConfig,
  getIndicatorSignal,
  getIndicatorObject,
  getIndicatorValues,
  extractInputData,
  calculateIndicatorValues,
}