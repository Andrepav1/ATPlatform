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
      default: // open (o), close (c), high (h), low (l)
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
// and use them together to produce a single signal for the given instrument
const calculateSignal = (strategy, candles) => {

  let signals = [];

  // console.log(candles.reverse());

  // prices from oldest to newest
  let prices = extractInputData(candles, ["values"]).values;
  
  strategy.indicators.forEach(indicator => {
    let tiValues = calculateIndicator(indicator, candles);
    
    let signal = getIndicatorSignal(indicator, tiValues, prices);
    
    signals.push(signal);
  });

  // console.log(signals);

  return signals;
}

const calculateBot = async ({ activeStrategy, chartPeriod, instruments }) => {

  try {
    let instrumentsData = await getInstruments(instruments, chartPeriod);

    instrumentsData.forEach(({ candles, instrument }) => {
      
      // removing last candle if it is not complete
      if(!candles[candles.length-1].complete) {
        candles.pop();
      }

      let signals = calculateSignal(activeStrategy, candles);

      console.log(instrument, "signals:", signals.join(", "));

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

cron.schedule('*/5  *  *   *   *   *', () => calculateBots("M15"));

// Schedule bots 5 seconds after the set time...
// ...making sure that OANDA instruments data is updated
cron.schedule('5  */5  *   *   *   1-5', () => calculateBots("M5"));
cron.schedule('5  */15 *   *   *   1-5', () => calculateBots("M15"));
cron.schedule('5  */30 *   *   *   1-5', () => calculateBots("M30"));
cron.schedule('5  0    *   *   *   1-5', () => calculateBots("H1"));
cron.schedule('5  0    */4 *   *   1-5', () => calculateBots("H4"));
cron.schedule('5  0    0   *   *   1-5', () => calculateBots("D1"));
