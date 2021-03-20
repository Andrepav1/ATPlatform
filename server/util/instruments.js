const fx = require('simple-fxtrade');

// Do not include first as candles are requested 5 seconds after the period, 
// Avoiding an incomplete candle of 5 seconds
const getInstrument = (id, granularity) => { 
  return new Promise((resolve, reject) => {
    fx.candles({ id, granularity })
    .then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error);
    })
  })
}

const getInstruments = (instruments, granularity) => {
  return new Promise((resolve, reject) => {
  
    let promises = [];
    instruments.forEach(instrument => {
      promises.push(getInstrument(instrument, granularity));
    });
    
    Promise.all(promises)
    .then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });

  });
}


module.exports = {
  getInstrument,
  getInstruments
}
