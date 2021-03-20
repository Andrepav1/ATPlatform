const cron = require('node-cron');
const { getBots } = require('../util/bots');
const { getInstruments } = require('../util/instruments');
const { calculateIndicatorValues, getIndicatorExpectedInput, getIndicatorSignal } = require('../util/technical-indicator')

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
      default: // open, close, high, low
        inputData[value] = candles.map(_ => parseFloat(_.mid[value.charAt(0)]));
        break;
    }
  });
  return inputData;
}

// returns an array of values using the indicator config and expected input
const calculateIndicator = (indicator, candles) => {
  let expectedInput = getIndicatorExpectedInput(indicator.name);
  let inputData = extractInputData(candles, expectedInput);
  inputData = { ...indicator.config, ...inputData, format: (a) => a.toFixed(4) };

  return calculateIndicatorValues(indicator, inputData);
}

// Calculates a buy/sell/neutral signal for each of the indicators
const calculateSignal = (strategy, candles) => {

  let signals = [];

  // let cLog = [...candles];
  // console.log(cLog.reverse().slice(0,10));

  let values = extractInputData(candles, ["values"]).values.reverse();
  console.log(values);

  strategy.indicators.forEach(indicator => {
    let tiValues = calculateIndicator(indicator, candles);
    signals.push(getIndicatorSignal(indicator, tiValues, values));
  });

  console.log(signals);

  return signals;
}

const calculateBot = async ({ activeStrategy, chartPeriod, instruments }) => {

  try {
    let instrumentsData = await getInstruments(instruments, chartPeriod);

    instrumentsData.forEach(({ candles, instrument }) => {
      let signals = calculateSignal(activeStrategy, candles);
    });

  } catch (error) {
    console.log(error.errorMessage);
  }
}

const calculateBots = async (chartPeriod) => {
  
  console.log("Calculate bots - chart period", chartPeriod);
  try {
   
    // get active bots 
    const bots = await getBots({ chartPeriod, live: true });

    bots.forEach(bot => {
      console.log(bot.name);
      calculateBot(bot);
    }); 

  } catch (error) {
    console.log(error.errorMessage);
  }

} 

// cron.schedule('*/5  *  *   *   *   *', () => calculateBots("M30"));

// Schedule bots 5 seconds after the set time...
// ...making sure that OANDA instruments data is updated
cron.schedule('5  */5  *   *   *   1-5', () => calculateBots("M5"));
cron.schedule('5  */15 *   *   *   1-5', () => calculateBots("M15"));
cron.schedule('5  */30 *   *   *   1-5', () => calculateBots("M30"));
cron.schedule('5  0    *   *   *   1-5', () => calculateBots("H1"));
cron.schedule('5  0    */4 *   *   1-5', () => calculateBots("H4"));
cron.schedule('5  0    0   *   *   1-5', () => calculateBots("D1"));
