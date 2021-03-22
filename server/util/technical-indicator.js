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

class MovingAveragePriceCrossover {
  constructor() {
    this.name = "MovingAveragePriceCrossover";
    this.label = "Moving Average Price Crossover"
  }

  calculate({ type, values, period, format }) {
    return MovingAveragePriceCrossover.calculate({ type, values, period, format })
  }
  
  static calculate({ type, values, period, format = x => x }) {
    const maObj = getMovingAverageObject(type);
    const maValues = maObj.calculate({ values, period, format }).reverse();
    const priceValues = [...values].reverse();

    const result = []

    // getting shorter array
    let arrLength = maValues.length;
    for (let i = 0; i < arrLength; i++) {
      let ma = maValues.shift();
      let price = priceValues.shift();
      result.unshift({ ma, price });
    }

    return result;
  }
} 

class DoubleMovingAverageCrossover {
  constructor() {
    this.name = "DoubleMovingAverageCrossover";
    this.label = "Double Moving Average Crossover"
  }

  calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format }) {
    return DoubleMovingAverageCrossover.calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format })
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
      result.unshift({ short, long });
    }

    return result;
  }
} 

// class TripleMovingAverageCrossover {
//   constructor() {
//     this.name = "TripleMovingAverageCrossover";
//     this.label = "Triple Moving Average Crossover"
//   }

//   calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format }) {
//     return TripleMovingAverageCrossover.calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format })
//   }

//   static calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format = x => x }) {
    
//     const shortMA = getMovingAverageObject(shortMethod);
//     const mediumMA = getMovingAverageObject(mediumMethod);
//     const longMA = getMovingAverageObject(longMethod);

//     const shortValues = shortMA.calculate({ values, period: shortPeriod, format }).reverse();
//     const mediumValues = mediumMA.calculate({ values, period: mediumPeriod, format }).reverse();
//     const longValues = longMA.calculate({ values, period: longPeriod, format }).reverse();

//     const result = []

//     let arrLength = longValues.length;
//     for (let i = 0; i < arrLength; i++) {
//       let short = shortValues.shift();
//       let medium = mediumValues.shift();
//       let long = longValues.shift();
//       result.unshift({ short, medium, long });
//     }

//     return result;
//   }
// } 


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
  MovingAveragePriceCrossover,
  DoubleMovingAverageCrossover,
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
    
    if(nextValues[a] > nextValues[b] && currValues[a] < currValues[b]) { // line A crossing above
      result[i] = Comparison.CROSS_UP;
    }
    else if(nextValues[a] < nextValues[b] && currValues[a] > currValues[b]) { // line A crossing below
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
    case "MovingAveragePriceCrossover":
      return ["MA", "price", "number"];
    case "DoubleMovingAverageCrossover":
      return ["shortMA", "longMA", "price", "number"];
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
    case "MovingAveragePriceCrossover":
      return ["values"];
    case "DoubleMovingAverageCrossover":
      return ["values"];
    case "TripleMovingAverageCrossover":
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
    case "MovingAveragePriceCrossover":
      return MovingAveragePriceCrossover.calculate(inputData);
    case "DoubleMovingAverageCrossover":
      return DoubleMovingAverageCrossover.calculate(inputData);
    default:
      return [];
  }
}

const calculateSignal = () => {

}

const getIndicatorSignal = ({ name, config, signals }, values, prices) => {
  
  console.log(prices[prices.length-1]);

  // values and prices are oldest to newest (ASC order).
  let latestValues = values.slice(values.length - config.keepSignalFor, values.length);
  let latestPrices = prices.slice(prices.length - config.keepSignalFor, prices.length);
  for (let i = 0; i < latestValues.length; i++) {
    latestValues[i].price = latestPrices[i];
  }


  console.log(config, values.length, signals.length);

  let buySignals = signals.filter((signal) => signal.type === "BUY");
  let sellSignals = signals.filter((signal) => signal.type === "SELL");

  console.log("BUY", buySignals.length, " SELL", sellSignals.length);

  for (const signal of signals) {
  
    if(signal.a === "number" || signal.b === "number") {
      for (let i = 0; i < latestValues.length; i++) {
        latestValues[i].bN = signal.bN;
      }
    }
    let signalGenerator;

    // console.log(latestValues);
    console.log(signal.comparison, signal.a, signal.b);
    switch (signal.comparison) {
      case Comparison.LESS_THAN:
      case Comparison.GREATER_THAN:
        let comparisonValues = getComparison(latestValues, signal.a, signal.b);
        
        signalGenerator = comparisonValues.map((comp) => comp===signal.comparison);
        console.log(signalGenerator);

        break;
      case Comparison.CROSS:
      case Comparison.CROSS_DOWN:
      case Comparison.CROSS_UP:
        let crossOverValues = getCrossOver(latestValues, signal.a, signal.b);

        if(signal.comparison === comparison.CROSS) {
          signalGenerator = crossValues.map((comp) => comp===Comparison.CROSS_DOWN || comp===Comparison.CROSS_UP);
        }
        else {
          signalGenerator = crossOverValues.map((comp) => comp===signal.comparison);
        }

        break;
      default:
        break;
    }
  }


  return Signal.NEUTRAL;

  // let latestValues = values.slice(0,config.keepSignalFor);
  
  // // =======================================================
  // // SWITCH
  // switch (name) {
  //   case"ADX":

  //     // get all pdi and mdi values
  //     // const pdiLine = latestValues.map(({pdi}) => parseFloat(parseFloat(pdi).toFixed(2)))
  //     // const mdiLine = latestValues.map(({mdi}) => parseFloat(parseFloat(mdi).toFixed(2)))

  //     // calculate crossUp and cross down reversing values so that most recent value is [0]
  //     // let crossUpValues = crossUp({ values[a]: pdiLine, values[b]: mdiLine, reversedInput: true })
  //     // let crossDownValues = crossDown({ values[a]: pdiLine, values[b]: mdiLine, reversedInput: true })
      
  //     return Signal.NEUTRAL;
  //   case "ATR":
  //     return Signal.NEUTRAL;
  //   case "AwesomeOscillator":
  //     return Signal.NEUTRAL;
  //   case "BollingerBands":
      
  //     return Signal.NEUTRAL;
  //   case "CCI":
  //     return Signal.NEUTRAL;
  //   case "ForceIndex":
  //     return Signal.NEUTRAL;
  //   case "MFI":
  //     return Signal.NEUTRAL;
  //   case "MACD":
  //     return Signal.NEUTRAL;
  //   case "OBV":
  //     return Signal.NEUTRAL;
  //   case "PSAR":
  //     return Signal.NEUTRAL;
  //   case "ROC":
  //     return Signal.NEUTRAL;
  //   case "RSI":
  //     for (const value of latestValues) {
        
  //       if(value >= signalConfig.sellSignal) {
  //         return Signal.SELL;
  //       }
  //       else if(value <= signalConfig.buySignal) {
  //         return Signal.BUY;
  //       }
  //       else { } // Do Nothing
  //     }
  //     return Signal.NEUTRAL;
  //   case "Stochastic":
  //     return Signal.NEUTRAL;
  //   case "StochasticRSI":
  //     return Signal.NEUTRAL;
  //   case "TRIX":
  //     return Signal.NEUTRAL;
  //   case "VWAP":
  //     return Signal.NEUTRAL;
  //   case "WilliamsR":
  //     return Signal.NEUTRAL;
  //   case "IchimokuCloud":
  //     return Signal.NEUTRAL;
  //   case "MovingAveragePriceCrossover":
      
  //     let mas = latestValues.map(({ma}) => parseFloat(ma));
  //     let prices = latestValues.map(({price}) => parseFloat(price));

  //     result = crossOver(mas.reverse(), prices.reverse()).reverse();
      
  //     for (const value of result) {
  //       if(value === 1) {
  //         return Signal.BUY;
  //       }
  //       else if(value === -1) {
  //         return Signal.SELL;
  //       }
  //     }
  //     return Signal.NEUTRAL;
      
  //   case "DoubleMovingAverageCrossover":
      
  //     let shortMA = latestValues.map(({short}) => parseFloat(short));
  //     let longMA = latestValues.map(({long}) => parseFloat(long));
      
  //     // console.log(shortMA);
  //     // console.log(longMA);

  //     result = crossOver(shortMA.reverse(), longMA.reverse()).reverse();
      
  //     for (const value of result) {
  //       if(value === 1) {
  //         return Signal.SELL;
  //       }
  //       else if(value === -1) {
  //         return Signal.BUY;
  //       }
  //     }
  //     return Signal.NEUTRAL;
      
  //   default:
  //     return Signal.NEUTRAL;
  // }


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
    case "MovingAveragePriceCrossover":
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
    case "DoubleMovingAverageCrossover":
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
    // case "TripleMovingAverageCrossover":
    //   return [
    //     {
    //       name: "shortPeriod",
    //       type: "number",
    //       defaultValue: 14
    //     },
    //     {
    //       name: "mediumPeriod",
    //       type: "number",
    //       defaultValue: 50
    //     },
    //     {
    //       name: "longPeriod",
    //       type: "number",
    //       defaultValue: 100
    //     },
    //     {
    //       name: "shortMethod",
    //       type: "enum",
    //       enum: ["SMA","EMA","WEMA","WMA"],
    //       defaultValue: "SMA"
    //     },
    //     {
    //       name: "mediumMethod",
    //       type: "enum",
    //       enum: ["SMA","EMA","WEMA","WMA"],
    //       defaultValue: "SMA"
    //     },
    //     {
    //       name: "longMethod",
    //       type: "enum",
    //       enum: ["SMA","EMA","WEMA","WMA"],
    //       defaultValue: "SMA"
    //     },
    //   ];
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
  calculateIndicatorValues,
}