const { Bot } = require('../models/bot');
const { Signal } = require('./constants');
const { getInstruments, getInstrumentUnits } = require('./instruments');
const { placeOrder } = require('./orders');
const { extractInputData, getIndicatorValues, getIndicatorSignal } = require('./technical-indicator')


// Calculates a buy/sell/neutral signal for each of the indicators
// and use them together to produce a single signal for the given instrument
const getInstrumentTrigger = (strategy, candles) => {

  let buyTriggers = 0, sellTriggers = 0;

  // prices from oldest to newest
  let prices = extractInputData(candles, ["values"]).values;
  
  strategy.indicators.forEach(indicator => {
    let tiValues = getIndicatorValues(indicator, candles);
    
    try {
      let signal = getIndicatorSignal(indicator, tiValues, prices);

      switch (signal) {
        case Signal.BUY: buyTriggers++; break;
        case Signal.SELL: sellTriggers++; break;
        default: break;
      }
      
    } catch (error) {
      console.log(error);
    }

  });

  console.log("BuyTriggers", buyTriggers, " - sellTriggers", sellTriggers);

  if(buyTriggers >= strategy.minSignals.buy && sellTriggers < strategy.minSignals.sell) { 
    return Signal.BUY;
  }
  else if(sellTriggers >= strategy.minSignals.sell && buyTriggers < strategy.minSignals.buy) {
    return Signal.SELL;
  }
  else { // In the case that neither or both BUY and SELL reach the signal threshold.
    return Signal.NEUTRAL
  }
}

const calculateBot = async (bot) => {

  const { activeStrategy, chartPeriod, instruments } = bot;
  
  try {
    let instrumentsData = await getInstruments(instruments, chartPeriod);

    instrumentsData.forEach(({ candles, instrument }) => {
      
      // removing last candle if it is not complete
      if(!candles[candles.length-1].complete) {
        candles.pop();
      }

      let trigger = getInstrumentTrigger(activeStrategy, candles);

      // ==================
      // ==================
      // ==================
      // TEMPORARY
      // trigger = Signal.SELL; // TO REMOVE
      // ==================
      // ==================
      // ==================
      
      let units;
      switch (trigger) {
        case Signal.BUY:
          console.log("[" + instrument + "] BUY SIGNAL!!!!! TO THE MOON!!!!!");
          units = getInstrumentUnits(instrument, parseFloat(activeStrategy.lotSize)); // positive lotSize to get BUY order
          placeStrategyOrder(instrument, units, bot);
          break;
        case Signal.SELL: 
          console.log("[" + instrument + "] SELL SIGNAL!!!! BIG BEAR TODAY!!!");
          units = getInstrumentUnits(instrument, -parseFloat(activeStrategy.lotSize)); // negative lotSize to get SELL order
          placeStrategyOrder(instrument, units, bot);
          break;
        case Signal.NEUTRAL:
          console.log("[" + instrument + "] NO SIGNAL");
          // WHAT TO DO HERE DEPENDS ON THE STRATEGY: TODO
          break;
        default: 
          break;
      }
      
    });

  } catch (error) {
    console.log(error.errorMessage);
  }
}

const calculateBots = async (chartPeriod) => {
  
  let now = new Date(Date.now());
  console.log("[" + now.getHours() + ":" + now.getMinutes() + "] " + chartPeriod + " Bots");

  try {
   
    // get active bots 
    const bots = await getBots({ chartPeriod, live: true });

    bots.forEach(bot => {
      console.log("[BOT] " + bot.name);
      calculateBot(bot);
    }); 

  } catch (error) {
    console.log(error.errorMessage);
  }

} 

const placeStrategyOrder = async (instrument, units, bot) => {

  let positionId;
  try {
    const { lastTransactionID } = await placeOrder(instrument, units);
    positionId = lastTransactionID;
  } catch (error) {
    console.log(error);
    return;
  }
  
  const { _id, openedPositions } = bot;

  let newOpenedPositions = [...openedPositions];
  newOpenedPositions.push(positionId);

  updateBot(_id, { openedPositions: newOpenedPositions });
}

const getBots = (params = {}) => {
  return new Promise((resolve, reject) => {
    Bot.find(params)
    .populate('activeStrategy')
    .exec((error, bots) => {
      if(error) return reject(error);
      resolve(bots)
    })
  })
}

const updateBot = (id, updateObj) => {
  return new Promise((resolve, reject) => {
    Bot.findByIdAndUpdate(id, { $set: updateObj }, null, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  })
}


module.exports = {
  getBots,
  getInstrumentTrigger,
  calculateBot,
  calculateBots,
  updateBot
}
