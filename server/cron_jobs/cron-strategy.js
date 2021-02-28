const cron = require('node-cron');
const { getBots } = require('../util/bots');
const { getInstruments } = require('../util/instruments');
const { getIndicatorObject, getIndicatorExpectedInput } = require('../util/technical-indicator')


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

const calculateIndicator = (indicator, candles) => {

  let expectedInput = getIndicatorExpectedInput(indicator.name);
  let inputData = extractInputData(candles, expectedInput);
  inputData = { ...indicator.config, ...inputData, format: (a) => a.toFixed(4) };

  let tiObj = getIndicatorObject(indicator.name);
  let result = tiObj.calculate(inputData);

}

const calculateSignal = (strategy, candles) => {

  strategy.indicators.forEach(indicator => {
    calculateIndicator(indicator, candles);
  });

}

const calculateBot = async ({ activeStrategy, chartPeriod, instruments }) => {

  let instrumentsData = await getInstruments(instruments, chartPeriod);

  let numberOfCandles = 200;

  instrumentsData.forEach(({ candles, instrument }) => {
    calculateSignal(activeStrategy, candles.slice(0, numberOfCandles));
  });


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
    console.log(error);
  }

}

// cron.schedule('*/15  *  *   *   *   *', () => calculateBots("M5"));

// Schedule bots 5 seconds after the set time...
// ...making sure that OANDA instruments data is updated
cron.schedule('5  */5  *   *   *   1-5', () => calculateBots("M5"));
cron.schedule('5  */15 *   *   *   1-5', () => calculateBots("M15"));
cron.schedule('5  */30 *   *   *   1-5', () => calculateBots("M30"));
cron.schedule('5  0    *   *   *   1-5', () => calculateBots("H1"));
cron.schedule('5  0    */4 *   *   1-5', () => calculateBots("H4"));
cron.schedule('5  0    0   *   *   1-5', () => calculateBots("D1"));
