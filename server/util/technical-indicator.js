const {
  ADL,
  ADX,
  ATR,
  AwesomeOscillator,
  BollingerBands,
  CCI,
  ForceIndex,
  KST,
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
  VolumeProfile,
  EMA,
  WMA,
  WEMA,
  WilliamsR,
  IchimokuCloud
} = require('technicalindicators');

const technicalIndicators = {
  ADL,
  ADX,
  ATR,
  AwesomeOscillator,
  BollingerBands,
  CCI,
  ForceIndex,
  // KST,
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
  // VolumeProfile,
  EMA,
  WMA,
  WEMA,
  WilliamsR,
  IchimokuCloud
};


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
    // case "KST":
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
    // case "VolumeProfile":
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
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case"ADX":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case"ATR":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "AwesomeOscillator":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "BollingerBands":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "CCI":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    // case "KST":
    //   return [
        // {
        //   name: "candlesSize",
        //   defaultValue: "H1"
        // }
    //   ];
    case "MFI":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "MACD":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "OBV":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "PSAR":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "ROC":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
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
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "Stochastic": 
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "StochasticRSI":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ]; 
    case "TRIX":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "VWAP":
      return [];
    // case "VolumeProfile":
    //   return [
        // {
        //   name: "candlesSize",
        //   defaultValue: "H1"
        // }
    //   ];
    case "EMA":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "WMA":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "WEMA":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
        }
      ];
    case "IchimokuCloud":
      return [
        {
          name: "candlesSize",
          defaultValue: "H1"
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
  getIndicatorSignalConfig,
  getIndicatorObject
}