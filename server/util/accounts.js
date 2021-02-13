const fx = require('simple-fxtrade');

const getAccounts = () => {
  return new Promise(function(resolve, reject) {
    fx.accounts()
    .then((accounts) => {
      resolve(accounts)
    }).catch((error) => {
      reject(error)
    });
  });
}

const getAccountSummary = (accountId) => {
  return new Promise(function(resolve, reject) {
    fx.accounts({ id: accountId })
    .then(({ account }) => {
      resolve(account)
    }).catch((error) => {
      reject(error)
    });
  });
}

module.exports = {
  getAccounts,
  getAccountSummary
}