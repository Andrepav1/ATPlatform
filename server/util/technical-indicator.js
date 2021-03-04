const {
  // ADL,
  ADX,
  ATR,
  AwesomeOscillator,
  BollingerBands,
  CCI,
  ForceIndex,
  KST, // NOT CURRENTLY AVAILABLE 
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
  TypicalPrice, // NOT CURRENTLY AVAILABLE 
  VWAP,
  VolumeProfile, // NOT CURRENTLY AVAILABLE 
  EMA,
  WMA,
  WEMA,
  WilliamsR,
  IchimokuCloud,
  // NOT TECHNICAL INDICATORS
  crossDown,
  crossUp
} = require('technicalindicators');

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

class TripleMovingAverageCrossover {
  constructor() {
    this.name = "TripleMovingAverageCrossover";
    this.label = "Triple Moving Average Crossover"
  }

  calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format }) {
    return TripleMovingAverageCrossover.calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format })
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
  // ADL, // MAYBE ADD LATER
  ADX,
  ATR,
  AwesomeOscillator,
  BollingerBands,
  CCI,
  ForceIndex,
  // KST, // NOT CURRENTLY AVAILABLE 
  MFI,
  MACD,
  OBV,
  PSAR,
  ROC,
  RSI,
  Stochastic,
  StochasticRSI,
  TRIX,
  // TypicalPrice, // NOT CURRENTLY AVAILABLE 
  VWAP,
  // VolumeProfile, // NOT CURRENTLY AVAILABLE 
  WilliamsR,
  IchimokuCloud,

  // MOVING AVERAGE CROSSOVER INDICATORS
  MovingAveragePriceCrossover,
  DoubleMovingAverageCrossover,
  TripleMovingAverageCrossover
};

// return an array
// value = 1,  if line A crosses above line B
// value = -1, if line A crosses below line B 
// otherwise 0
const crossOver = (lineA, lineB) => {
  let result = [0];
  for (let i = 1; i < lineA.length; i++) {
    if(lineA[i] > lineB[i] && lineA[i-1] < lineB[i-1]) { // line A crossing above
      result[i] = 1;
    }
    else if(lineA[i] < lineB[i] && lineA[i-1] > lineB[i-1]) { // line A crossing below
      result[i] = -1;
    }
    else {
      result[i] = 0;
    }
  }
  return result;
}

const signals = {
	STRONG_SELL: 0,
	SELL: 1,
  NEUTRAL: 2,
  BUY: 3, 
  STRONG_BUY: 4
}

const getIndicatorObject = (name) => {
  return technicalIndicators[name];
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
      return ["values"]
    case "DoubleMovingAverageCrossover":
      return ["values"]
    case "TripleMovingAverageCrossover":
      return ["values"]
    default:
      return [];
  }
}

// inputData values array goes from least to most recent, inside this function ...
// ... we reverse the array, so that most recent is index [0].
const calculateIndicatorValues = ({ name }, inputData) => {

  switch (name) {
    case "ADX":
      return ADX.calculate(inputData).reverse();
    case "ATR":
      return ATR.calculate(inputData).reverse();
    case "AwesomeOscillator":
      return AwesomeOscillator.calculate(inputData).reverse();
    case "BollingerBands":
      return BollingerBands.calculate(inputData).reverse();
    case "CCI":
      return CCI.calculate(inputData).reverse();
    case "ForceIndex":
      return ForceIndex.calculate(inputData).reverse();
    case "MFI":
      return MFI.calculate(inputData).reverse();
    case "MACD":
      return MACD.calculate(inputData).reverse();
    case "OBV":
      return OBV.calculate(inputData).reverse();
    case "PSAR":
      return PSAR.calculate(inputData).reverse();
    case "ROC":
      return ROC.calculate(inputData).reverse();
    case "RSI":
      return RSI.calculate(inputData).reverse();
    case "Stochastic":
      return Stochastic.calculate(inputData).reverse();
    case "StochasticRSI":
      return StochasticRSI.calculate(inputData).reverse();
    case "TRIX":
      return TRIX.calculate(inputData).reverse();
    case "VWAP":
      return VWAP.calculate(inputData).reverse();
    case "WilliamsR":
      return WilliamsR.calculate(inputData).reverse();
    case "IchimokuCloud":
      return IchimokuCloud.calculate(inputData).reverse();
    case "MovingAveragePriceCrossover":
      return MovingAveragePriceCrossover.calculate(inputData).reverse();
    case "DoubleMovingAverageCrossover":
      return DoubleMovingAverageCrossover.calculate(inputData).reverse();
    case "TripleMovingAverageCrossover":
      return TripleMovingAverageCrossover.calculate(inputData).reverse();
    default:
      return [];
  }
}

const getIndicatorSignal = ({ name, signalConfig, config }, values) => {

  let result;
  const latestValues = values.slice(0,signalConfig.keepSignalFor);
  
  // =======================================================
  // SWITCH
  switch (name) {
    // case "ADL":
    case"ADX":
    const lastValue = latestValues[0];

    if(parseInt(lastValue.adx) < 25) { // if adx is < 25, trend is weak
      return signals.NEUTRAL;
    }
    
    // get all pdi and mdi values
    const pdiLine = latestValues.map(({pdi}) => parseFloat(parseFloat(pdi).toFixed(2)))
    const mdiLine = latestValues.map(({mdi}) => parseFloat(parseFloat(mdi).toFixed(2)))

    // calculate crossUp and cross down reversing values so that most recent value is [0]
    let crossUpValues = crossUp({ lineA: pdiLine, lineB: mdiLine, reversedInput: true })
    let crossDownValues = crossDown({ lineA: pdiLine, lineB: mdiLine, reversedInput: true })

    console.log(pdiLine.reverse());
    console.log(mdiLine.reverse());
    console.log(crossUpValues);
    console.log(crossDownValues);

    case"ATR":
    case "AwesomeOscillator":
    case "BollingerBands":
    case "CCI":
    case "ForceIndex":
    // case "KST": // NOT CURRENTLY AVAILABLE 
    case "MFI":
    case "MACD":
    case "OBV":
    case "PSAR":
    case "ROC":
    case "RSI":
      for (const value of latestValues) {
        
        if(value >= signalConfig.sellSignal) {
          return signals.SELL;
        }
        else if(value <= signalConfig.buySignal) {
          return signals.BUY;
        }
        else { } // Do Nothing
      }
      return signals.NEUTRAL;
    case "SMA":
    case "Stochastic":
    case "StochasticRSI":
    case "TRIX":
    // case "TypicalPrice": // NOT CURRENTLY AVAILABLE 
    case "VWAP":
    // case "VolumeProfile": // NOT CURRENTLY AVAILABLE 
    case "EMA":
    case "WMA":
    case "WEMA":
    case "WilliamsR":
    case "IchimokuCloud":
    case "MovingAveragePriceCrossover":
      
      let mas = latestValues.map(({ma}) => parseFloat(ma));
      let prices = latestValues.map(({price}) => parseFloat(price));

      result = crossOver(mas.reverse(), prices.reverse()).reverse();
      
      for (const value of result) {
        if(value === 1) {
          return signals.BUY;
        }
        else if(value === -1) {
          return signals.SELL;
        }
      }
      return signals.NEUTRAL;
      
    case "DoubleMovingAverageCrossover":
      
      let shortMA = latestValues.map(({short}) => parseFloat(short));
      let longMA = latestValues.map(({long}) => parseFloat(long));
      
      console.log(shortMA);
      console.log(longMA);

      result = crossOver(shortMA.reverse(), longMA.reverse()).reverse();
      
      for (const value of result) {
        if(value === 1) {
          return signals.SELL;
        }
        else if(value === -1) {
          return signals.BUY;
        }
      }
      return signals.NEUTRAL;
      
    case "TripleMovingAverageCrossover":
      
      // let shortMA = latestValues.map(({short}) => parseFloat(short));
      // let longMA = latestValues.map(({long}) => parseFloat(long));
      
      // console.log(shortMA);
      // console.log(longMA);

      // result = crossOver(shortMA.reverse(), longMA.reverse()).reverse();
      
      // for (const value of result) {
      //   if(value === 1) {
      //     return signals.SELL;
      //   }
      //   else if(value === -1) {
      //     return signals.BUY;
      //   }
      // }
      return signals.NEUTRAL;
      
    default:
      return signals.NEUTRAL;
  }
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
        }
      ];
    case"ATR":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
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
        }
      ];
    case "CCI":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 20
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 13
        }
      ];
    // case "KST":
    //   return [
    //     {
    //       name: "signalPeriod",
    //       type: "number",
    //       defaultValue: 1
    //     },
    //     // MANY OTHERS: TODO
    //   ];
    case "MFI":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
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
        }
        // Boolean: SimpleMAOscillator TODO
        // Boolean: SimpleMASignal TODO
      ];
    case "OBV":
      return [];
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
        }
      ];
    case "ROC":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 9
        }
      ];
    case "RSI":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 10
        }
      ];
    case "SMA":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 10
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
        }
      ]; 
    case "TRIX":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 15
        }
      ];
    case "VWAP":
      return [];
    // case "VolumeProfile":
    //   return [
    //     {
    //       name: "noOfBars",
    //       type: "number",
    //       defaultValue: 1
    //     }
    //   ];
    case "EMA":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        }
      ];
    case "WMA":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        }
      ];
    case "WEMA":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "period",
          type: "number",
          defaultValue: 14
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
      ];
    case "TripleMovingAverageCrossover":
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
          defaultValue: 200
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
      ];
    default:
      return [];
  }
}


const getIndicatorSignalConfig = (name) => {

  switch (name) {
    case "ADL":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case"ADX":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case"ATR":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "AwesomeOscillator":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "BollingerBands":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "CCI":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    // case "KST":
    //   return [
        //   name: "keepSignalFor",
        //   defaultValue: 1
        // }
    //   ];
    case "MFI":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "MACD":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "OBV":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "PSAR":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "ROC":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "RSI":
      return [
        {
          name: "buySignal",
          label: "Lower Bound",
          defaultValue: 30,
          type: "number"
        },
        {
          name: "sellSignal",
          label: "Upper Bound",
          defaultValue: 70,
          type: "number"
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "SMA":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "Stochastic": 
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "StochasticRSI":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ]; 
    case "TRIX":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "VWAP":
      return [];
    // case "VolumeProfile":
    //   return [
        //   name: "keepSignalFor",
        //   defaultValue: 1
        // }
    //   ];
    case "EMA":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "WMA":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "WEMA":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "IchimokuCloud":
      return [
        {
          name: "buySignal",
          defaultValue: ""
        },
        {
          name: "sellSignal",
          defaultValue: ""
        },
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "MovingAveragePriceCrossover":
      return [
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "DoubleMovingAverageCrossover":
      return [
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    case "TripleMovingAverageCrossover":
      return [
        {
          name: "keepSignalFor",
          defaultValue: 1
        }
      ];
    default:
      return [];
  }
}

module.exports = {
  technicalIndicators,
  getIndicatorExpectedInput,
  getIndicatorConfig,
  getIndicatorSignal,
  getIndicatorSignalConfig,
  getIndicatorObject,
  calculateIndicatorValues,
  signals
}