const fx = require('simple-fxtrade');

const getTrades = () => {
  return new Promise(function(resolve, reject) {
    fx.trades()
    .then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
}

const closeTrade = (id) => {
  return new Promise((resolve, reject) => {
    fx.trades.close({ id })
    .then((result) => {
      // console.log(result);
      resolve(result);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  })
  
}


module.exports = {
  getTrades,
  closeTrade
}