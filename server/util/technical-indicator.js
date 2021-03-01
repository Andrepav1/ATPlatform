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
  bullish,
  bearish
} = require('technicalindicators');

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
  SMA,
  Stochastic,
  StochasticRSI,
  TRIX,
  // TypicalPrice, // NOT CURRENTLY AVAILABLE 
  VWAP,
  // VolumeProfile, // NOT CURRENTLY AVAILABLE 
  EMA,
  WMA,
  WEMA,
  WilliamsR,
  IchimokuCloud
};

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
    case"ADX":
      return ["high","low","close"];
    case"ATR":
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
    case "SMA":
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
    case "EMA":
      return ["values"];
    case "WMA":
      return ["values"];
    case "WEMA":
      return ["values"];
    case "WilliamsR":
      return ["high","low","close"];
    case "IchimokuCloud":
      return ["high","low"];
    default:
      return [];
  }
}

const getIndicatorSignal = ({ name, signalConfig, config }, values) => {

  console.log(values);
  switch (name) {
    // case "ADL":
    case"ADX":
    const lastValue = values[values.length-1];

    if(parseInt(lastValue.adx) < 25) // if adx is < 25, trend is weak
      return signals.NEUTRAL;
    

    const lastValues = values.slice(values.length-config.period);
    console.log(lastValues);

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
          type: "int",
          defaultValue: 14
        }
      ];
    case"ATR":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        }
      ];
    case "AwesomeOscillator":
      return [
        {
          name: "fastPeriod",
          type: "int",
          defaultValue: 5
        },
        {
          name: "slowPeriod",
          type: "int",
          defaultValue: 34
        }
      ];
    case "BollingerBands":
      return [
        {
          name: "stdDev",
          type: "int",
          defaultValue: 2
        },
        {
          name: "period",
          type: "int",
          defaultValue: 20
        }
      ];
    case "CCI":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 20
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 13
        }
      ];
    // case "KST":
    //   return [
    //     {
    //       name: "signalPeriod",
    //       type: "int",
    //       defaultValue: 1
    //     },
    //     // MANY OTHERS: TODO
    //   ];
    case "MFI":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        }
      ];
    case "MACD":
      return [
        {
          name: "fastPeriod",
          type: "int",
          defaultValue: 12
        },
        {
          name: "slowPeriod",
          type: "int",
          defaultValue: 26
        },
        {
          name: "signalPeriod",
          type: "int",
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
          type: "int",
          defaultValue: 9
        }
      ];
    case "RSI":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 10
        }
      ];
    case "SMA":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 10
        }
      ];
    case "Stochastic": 
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        },
        {
          name: "signalPeriod",
          type: "int",
          defaultValue: 3
        }
      ];
    case "StochasticRSI":
      return [
        {
          name: "dPeriod",
          type: "int",
          defaultValue: 3
        },
        {
          name: "kPeriod",
          type: "int",
          defaultValue: 14
        },
        {
          name: "rsiPeriod",
          type: "int",
          defaultValue: 14
        },
        {
          name: "stochasticPeriod",
          type: "int",
          defaultValue: 14
        }
      ]; 
    case "TRIX":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 15
        }
      ];
    case "VWAP":
      return [];
    // case "VolumeProfile":
    //   return [
    //     {
    //       name: "noOfBars",
    //       type: "int",
    //       defaultValue: 1
    //     }
    //   ];
    case "EMA":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        }
      ];
    case "WMA":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        }
      ];
    case "WEMA":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "period",
          type: "int",
          defaultValue: 14
        }
      ];
    case "IchimokuCloud":
      return [
        {
          name: "conversionPeriod",
          type: "int",
          defaultValue: 9
        },
        {
          name: "spanPeriod",
          type: "int",
          defaultValue: 52
        },
        {
          name: "basePeriod",
          type: "int",
          defaultValue: 26
        },
        {
          name: "displacement",
          type: "int",
          defaultValue: 26
        }
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
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case"ADX":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case"ATR":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "AwesomeOscillator":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "BollingerBands":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "CCI":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    // case "KST":
    //   return [
        // {
        //   name: "keepSignalFor",
        //   defaultValue: "Do not keep signal"
        // }
    //   ];
    case "MFI":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "MACD":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "OBV":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "PSAR":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "ROC":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "RSI":
      return [
        {
          name: "lowerBound",
          defaultValue: 30
        },
        {
          name: "upperBound",
          defaultValue: 70
        }
      ];
    case "SMA":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "Stochastic": 
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "StochasticRSI":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ]; 
    case "TRIX":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "VWAP":
      return [];
    // case "VolumeProfile":
    //   return [
        // {
        //   name: "keepSignalFor",
        //   defaultValue: "Do not keep signal"
        // }
    //   ];
    case "EMA":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "WMA":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "WEMA":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
        }
      ];
    case "IchimokuCloud":
      return [
        {
          name: "keepSignalFor",
          defaultValue: "Do not keep signal"
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
  signals
}