"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndicatorConfig = exports.getIndicatorValues = exports.extractInputData = exports.getIndicatorSignal = exports.signalTriggered = exports.calculateIndicatorValues = exports.getIndicatorExpectedInput = exports.getIndicatorComponents = exports.getIndicatorObject = exports.technicalIndicators = void 0;
const technicalindicators_1 = require("technicalindicators");
const constants_1 = require("../util/constants");
function getMovingAverageObject(type) {
    switch (type) {
        case "SMA":
            return technicalindicators_1.SMA;
        case "EMA":
            return technicalindicators_1.EMA;
        case "WMA":
            return technicalindicators_1.WMA;
        case "WEMA":
            return technicalindicators_1.WEMA;
        default:
            return technicalindicators_1.SMA;
    }
}
class MovingAverage {
    constructor() {
        this.name = "MovingAverage";
        this.label = "Moving Average";
    }
    calculate({ type, values, period, format }) {
        return MovingAverage.calculate({ type, values, period, format });
    }
    static calculate({ type, values, period, format = (x) => x }) {
        const maObj = getMovingAverageObject(type);
        let maValues = maObj.calculate({ values, period, format });
        return maValues.map((MA) => {
            return { MA };
        });
    }
}
class DoubleMovingAverage {
    constructor() {
        this.name = "DoubleMovingAverage";
        this.label = "Double Moving Average";
    }
    calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format }) {
        return DoubleMovingAverage.calculate({
            shortMethod,
            longMethod,
            values,
            shortPeriod,
            longPeriod,
            format
        });
    }
    static calculate({ shortMethod, longMethod, values, shortPeriod, longPeriod, format = (x) => x }) {
        const shortMA = getMovingAverageObject(shortMethod);
        const longMA = getMovingAverageObject(longMethod);
        const shortValues = shortMA
            .calculate({ values, period: shortPeriod, format })
            .reverse();
        const longValues = longMA
            .calculate({ values, period: longPeriod, format })
            .reverse();
        const result = [];
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
        this.label = "Triple Moving Average";
    }
    calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format }) {
        return TripleMovingAverage.calculate({
            shortMethod,
            mediumMethod,
            longMethod,
            values,
            shortPeriod,
            mediumPeriod,
            longPeriod,
            format
        });
    }
    static calculate({ shortMethod, mediumMethod, longMethod, values, shortPeriod, mediumPeriod, longPeriod, format = (x) => x }) {
        const shortMA = getMovingAverageObject(shortMethod);
        const mediumMA = getMovingAverageObject(mediumMethod);
        const longMA = getMovingAverageObject(longMethod);
        const shortValues = shortMA
            .calculate({ values, period: shortPeriod, format })
            .reverse();
        const mediumValues = mediumMA
            .calculate({ values, period: mediumPeriod, format })
            .reverse();
        const longValues = longMA
            .calculate({ values, period: longPeriod, format })
            .reverse();
        const result = [];
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
exports.technicalIndicators = {
    ADX: technicalindicators_1.ADX,
    ATR: technicalindicators_1.ATR,
    AwesomeOscillator: technicalindicators_1.AwesomeOscillator,
    BollingerBands: technicalindicators_1.BollingerBands,
    CCI: technicalindicators_1.CCI,
    ForceIndex: technicalindicators_1.ForceIndex,
    MFI: technicalindicators_1.MFI,
    MACD: technicalindicators_1.MACD,
    OBV: technicalindicators_1.OBV,
    PSAR: technicalindicators_1.PSAR,
    ROC: technicalindicators_1.ROC,
    RSI: technicalindicators_1.RSI,
    Stochastic: technicalindicators_1.Stochastic,
    StochasticRSI: technicalindicators_1.StochasticRSI,
    TRIX: technicalindicators_1.TRIX,
    VWAP: technicalindicators_1.VWAP,
    WilliamsR: technicalindicators_1.WilliamsR,
    IchimokuCloud: technicalindicators_1.IchimokuCloud,
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
    for (let i = 0; i < values.length - 1; i++) {
        let currValues = values[i];
        let nextValues = values[i + 1];
        if (nextValues[a] >= nextValues[b] && currValues[a] < currValues[b]) {
            // line A crossing above
            result[i] = constants_1.Comparison.CROSS_UP;
        }
        else if (nextValues[a] <= nextValues[b] &&
            currValues[a] > currValues[b]) {
            // line A crossing below
            result[i] = constants_1.Comparison.CROSS_DOWN;
        }
        else {
            result[i] = constants_1.Comparison.NO_CROSS;
        }
    }
    return result;
};
// returns an array
// GREATER_THAN, if A > B
// LESS_THAN, if A < B
const getComparison = (values, a, b) => {
    let result = [];
    for (let i = 0; i < values.length; i++) {
        let currValues = values[i];
        if (currValues[a] >= currValues[b]) {
            result.push(constants_1.Comparison.GREATER_THAN);
        }
        else {
            result.push(constants_1.Comparison.LESS_THAN);
        }
    }
    return result;
};
const getIndicatorObject = (name) => {
    return exports.technicalIndicators[name];
};
exports.getIndicatorObject = getIndicatorObject;
const getIndicatorComponents = (name) => {
    switch (name) {
        case "ADL":
            return ["ADL", "price", "number"];
        case "ADX":
            return ["adx", "mdi", "pdi", "price", "number"];
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
            return ["MACD", "price", "number", "histogram", "signal"];
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
};
exports.getIndicatorComponents = getIndicatorComponents;
const getIndicatorExpectedInput = (name) => {
    switch (name) {
        case "ADL":
            return ["volume", "high", "low", "close"];
        case "ADX":
            return ["high", "low", "close"];
        case "ATR":
            return ["high", "low", "close"];
        case "AwesomeOscillator":
            return ["high", "low"];
        case "BollingerBands":
            return ["values"];
        case "CCI":
            return ["high", "low", "open", "close"];
        case "ForceIndex":
            return ["volume", "high", "low", "open", "close"];
        // case "KST": // NOT CURRENTLY AVAILABLE
        //   return ["values"];
        case "MFI":
            return ["volume", "high", "low", "close"];
        case "MACD":
            return ["values"];
        case "OBV":
            return ["volume", "close"];
        case "PSAR":
            return ["high", "low"];
        case "ROC":
            return ["values"];
        case "RSI":
            return ["values"];
        case "Stochastic":
            return ["high", "low", "close"];
        case "StochasticRSI":
            return ["values"];
        case "TRIX":
            return ["values"];
        // case "TypicalPrice": // NOT CURRENTLY AVAILABLE
        //   return ["high","low","close"];
        case "VWAP":
            return ["volume", "high", "low", "open", "close"];
        // case "VolumeProfile": // NOT CURRENTLY AVAILABLE
        //   return ["volume","high","low","open","close"];
        case "WilliamsR":
            return ["high", "low", "close"];
        case "IchimokuCloud":
            return ["high", "low"];
        case "MovingAverage":
            return ["values"];
        case "DoubleMovingAverage":
            return ["values"];
        case "TripleMovingAverage":
            return ["values"];
        default:
            return [];
    }
};
exports.getIndicatorExpectedInput = getIndicatorExpectedInput;
const calculateIndicatorValues = ({ name }, inputData) => {
    let result;
    switch (name) {
        case "ADX":
            return technicalindicators_1.ADX.calculate(inputData);
        case "ATR":
            result = technicalindicators_1.ATR.calculate(inputData);
            return result.map((ATR) => {
                return { ATR };
            });
        case "AwesomeOscillator":
            result = technicalindicators_1.AwesomeOscillator.calculate(inputData);
            return result.map((AwesomeOscillator) => {
                return { AwesomeOscillator };
            });
        case "BollingerBands":
            return technicalindicators_1.BollingerBands.calculate(inputData);
        case "CCI":
            result = technicalindicators_1.CCI.calculate(inputData);
            return result.map((CCI) => {
                return { CCI };
            });
        case "ForceIndex":
            result = technicalindicators_1.ForceIndex.calculate(inputData);
            return result.map((ForceIndex) => {
                return { ForceIndex };
            });
        case "MFI":
            result = technicalindicators_1.MFI.calculate(inputData);
            return result.map((MFI) => {
                return { MFI };
            });
        case "MACD":
            return technicalindicators_1.MACD.calculate(inputData);
        case "OBV":
            result = technicalindicators_1.OBV.calculate(inputData);
            return result.map((OBV) => {
                return { OBV };
            });
        case "PSAR":
            result = technicalindicators_1.PSAR.calculate(inputData);
            return result.map((PSAR) => {
                return { PSAR };
            });
        case "ROC":
            result = technicalindicators_1.ROC.calculate(inputData);
            return result.map((ROC) => {
                return { ROC };
            });
        case "RSI":
            result = technicalindicators_1.RSI.calculate(inputData);
            return result.map((RSI) => {
                return { RSI };
            });
        case "Stochastic":
            return technicalindicators_1.Stochastic.calculate(inputData);
        case "StochasticRSI":
            result = technicalindicators_1.StochasticRSI.calculate(inputData);
            return result.map((StochasticRSI) => {
                return { StochasticRSI };
            });
        case "TRIX":
            result = technicalindicators_1.TRIX.calculate(inputData);
            return result.map((TRIX) => {
                return { TRIX };
            });
        case "VWAP":
            result = technicalindicators_1.VWAP.calculate(inputData);
            return result.map((VWAP) => {
                return { VWAP };
            });
        case "WilliamsR":
            result = technicalindicators_1.WilliamsR.calculate(inputData);
            return result.map((WilliamsR) => {
                return { WilliamsR };
            });
        case "IchimokuCloud":
            return technicalindicators_1.IchimokuCloud.calculate(inputData);
        case "MovingAverage":
            return MovingAverage.calculate(inputData);
        case "DoubleMovingAverage":
            return DoubleMovingAverage.calculate(inputData);
        case "TripleMovingAverage":
            return TripleMovingAverage.calculate(inputData);
        default:
            return [];
    }
};
exports.calculateIndicatorValues = calculateIndicatorValues;
const signalTriggered = (signal, values) => {
    // console.log(signal);
    if (signal.b === "number") {
        for (let i = 0; i < values.length; i++) {
            values[i].number = signal.bN;
        }
    }
    // console.log("===============");
    // console.log(signal.a + " " + Object.keys(Comparison)[signal.comparison] + " " + signal.b);
    // console.log(values);
    switch (signal.comparison) {
        case constants_1.Comparison.LESS_THAN:
        case constants_1.Comparison.GREATER_THAN:
            let comparisonValues = getComparison(values, signal.a, signal.b);
            return comparisonValues[1] === signal.comparison;
        case constants_1.Comparison.CROSS:
        case constants_1.Comparison.CROSS_DOWN:
        case constants_1.Comparison.CROSS_UP:
            let crossOverValues = getCrossOver(values, signal.a, signal.b);
            if (signal.comparison === constants_1.Comparison.CROSS) {
                return (crossOverValues[0] === constants_1.Comparison.CROSS_DOWN ||
                    crossOverValues[0] === constants_1.Comparison.CROSS_UP);
            }
            else {
                return crossOverValues[0] === signal.comparison;
            }
        default:
            return false;
    }
};
exports.signalTriggered = signalTriggered;
const getIndicatorSignal = ({ config, signals }, values, prices) => {
    let finalSignal = true;
    // Getting the two latest TI values and prices
    let latestValues = values.slice(values.length - 2, values.length);
    let latestPrices = prices.slice(prices.length - 2, prices.length);
    for (let i = 0; i < latestValues.length; i++) {
        latestValues[i].price = latestPrices[i];
    }
    for (const signal of signals) {
        let signalTrigger = (0, exports.signalTriggered)(signal, latestValues);
        // All signals configurations have to trigger
        if (!signalTrigger) {
            finalSignal = false;
        }
    }
    if (finalSignal) {
        // All signals triggered, get type and return final signal
        return signals[0].type === "BUY" ? constants_1.Signal.BUY : constants_1.Signal.SELL;
    }
    else {
        return constants_1.Signal.NEUTRAL;
    }
};
exports.getIndicatorSignal = getIndicatorSignal;
// extract the values needed by the indicator from the instrument candles
const extractInputData = (candles, values) => {
    let inputData = {};
    values.forEach((value) => {
        switch (value) {
            case "volume":
                // @ts-expect-error TS(2339): Property 'volume' does not exist on type '{}'.
                inputData.volume = candles.map((_) => _.volume);
                break;
            case "values": // use "close" as default value, could be changed in the future no problemo
                // @ts-expect-error TS(2339): Property 'values' does not exist on type '{}'.
                inputData.values = candles.map((_) => parseFloat(_.mid.c));
                break;
            default:
                // open (o), close (c), high (h), low (l)
                inputData[value] = candles.map((_) => parseFloat(_.mid[value.charAt(0)]));
                break;
        }
    });
    return inputData;
};
exports.extractInputData = extractInputData;
// returns an array of values using the indicator config and expected input
const getIndicatorValues = (indicator, candles) => {
    let expectedInput = (0, exports.getIndicatorExpectedInput)(indicator.name);
    let inputData = (0, exports.extractInputData)(candles, expectedInput);
    inputData = Object.assign(Object.assign(Object.assign({}, indicator.config), inputData), { format: (a) => a.toFixed(4) });
    return (0, exports.calculateIndicatorValues)(indicator, inputData);
};
exports.getIndicatorValues = getIndicatorValues;
const getIndicatorConfig = (name) => {
    switch (name) {
        case "ADL":
            return [];
        case "ADX":
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
        case "ATR":
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
                    enum: ["SMA", "EMA", "WEMA", "WMA"],
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
                    enum: ["SMA", "EMA", "WEMA", "WMA"],
                    defaultValue: "SMA"
                },
                {
                    name: "longMethod",
                    type: "enum",
                    enum: ["SMA", "EMA", "WEMA", "WMA"],
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
                    enum: ["SMA", "EMA", "WEMA", "WMA"],
                    defaultValue: "SMA"
                },
                {
                    name: "mediumMethod",
                    type: "enum",
                    enum: ["SMA", "EMA", "WEMA", "WMA"],
                    defaultValue: "SMA"
                },
                {
                    name: "longMethod",
                    type: "enum",
                    enum: ["SMA", "EMA", "WEMA", "WMA"],
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
};
exports.getIndicatorConfig = getIndicatorConfig;
