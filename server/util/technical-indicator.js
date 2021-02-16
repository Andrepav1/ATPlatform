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

const technicalIndicators = [
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
  // TypicalPrice, // NOT CURRENTLY AVAILABLE 
  VWAP,
  VolumeProfile,
  EMA,
  WMA,
  WEMA,
  WilliamsR,
  IchimokuCloud
];


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
    case "KST":
      return ["values"];
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
    case "VolumeProfile":
      return ["volume","high","low","open","close"];
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
          type: "int"
        }
      ];
    case"ATR":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "AwesomeOscillator":
      return [
        {
          name: "fastPeriod",
          type: "int"
        },
        {
          name: "slowPeriod",
          type: "int"
        }
      ];
    case "BollingerBands":
      return [
        {
          name: "stdDev",
          type: "int"
        },
        {
          name: "period",
          type: "int"
        }
      ];
    case "CCI":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "ForceIndex":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "KST":
      return [
        {
          name: "signalPeriod",
          type: "int"
        },
        // MANY OTHERS: TODO
      ];
    case "MFI":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "MACD":
      return [
        {
          name: "fastPeriod",
          type: "int"
        },
        {
          name: "slowPeriod",
          type: "int"
        },
        {
          name: "signalPeriod",
          type: "int"
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
          type: "float"
        },
        {
          name: "max",
          type: "float"
        }
      ];
    case "ROC":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "RSI":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "SMA":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "Stochastic":
      return [
        {
          name: "period",
          type: "int"
        },
        {
          name: "signalPeriod",
          type: "int"
        }
      ];
    case "StochasticRSI":
      return [
        {
          name: "dPeriod",
          type: "int"
        },
        {
          name: "kPeriod",
          type: "int"
        },
        {
          name: "rsiPeriod",
          type: "int"
        },
        {
          name: "stochasticPeriod",
          type: "int"
        }
      ];
    case "TRIX":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "VWAP":
      return [];
    case "VolumeProfile":
      return [
        {
          name: "noOfBars",
          type: "int"
        }
      ];
    case "EMA":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "WMA":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "WEMA":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "WilliamsR":
      return [
        {
          name: "period",
          type: "int"
        }
      ];
    case "IchimokuCloud":
      return [
        // TODO
        // conversionPeriod
        // spanPeriod
        // basePeriod
        // displacement
      ];
    default:
      return [];
  }
}


module.exports = {
  getIndicatorExpectedInput,
  getIndicatorConfig,
  technicalIndicators,
  getIndicatorObject
}