const fx = require('simple-fxtrade');

const placeOrder = (units, instrument) => {
  return new Promise((resolve, reject) => {
    fx.orders.create({
      order: {
        units,
        instrument
      }
    })
    .then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  })
  
}

module.exports = {
  placeOrder,
}