const fx = require('simple-fxtrade');

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
