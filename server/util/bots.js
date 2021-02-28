const fx = require('simple-fxtrade');
const { Bot } = require('../models/bot');

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

module.exports = {
  getBots
}
