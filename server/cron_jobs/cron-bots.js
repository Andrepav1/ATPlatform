const cron = require('node-cron');
const fx = require('simple-fxtrade');
const { calculateBots } = require('../util/bots');


const streamInstrument = async (instruments) => {

  instruments = "AUD_USD";

  const stream = await fx.pricing.stream({ instruments });
 
  // Handle some data
  stream.on('data', data => {
    console.log(data); // PRICE or HEARTBEAT
  });
   
  // Sometime later when done with the stream
  stream.disconnect();
}

setTimeout(() => {
  // streamInstrument();
}, 2000);


// cron.schedule('*/5  *  *   *   *   *', () => calculateBots("M1"));

// Schedule bots 5 seconds after the set time...
// ...making sure that OANDA instruments data is updated
cron.schedule('5  *  *   *   *   1-5', () => calculateBots("M1"));
cron.schedule('5  */5  *   *   *   1-5', () => calculateBots("M5"));
cron.schedule('5  */15 *   *   *   1-5', () => calculateBots("M15"));
cron.schedule('5  */30 *   *   *   1-5', () => calculateBots("M30"));
cron.schedule('5  0    *   *   *   1-5', () => calculateBots("H1"));
cron.schedule('5  0    */4 *   *   1-5', () => calculateBots("H4"));
cron.schedule('5  0    0   *   *   1-5', () => calculateBots("D1"));
