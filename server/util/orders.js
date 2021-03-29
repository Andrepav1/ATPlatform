const fx = require('simple-fxtrade');

const placeOrder = (instrument, units, type = "MARKET", timeInForce = "FOK") => {
  return new Promise((resolve, reject) => {
    fx.orders.create({
      order: {
        instrument, 
        units,
        timeInForce,
        type
      }
    })
    .then((result) => {
      resolve(result);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  })
  
}

module.exports = {
  placeOrder,
}