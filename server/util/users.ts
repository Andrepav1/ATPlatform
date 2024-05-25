const User = require("../models/user");

const getUserByApiKey = (api_key) => {
  return new Promise((resolve, reject) => {
    User.findOne({ api_key }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const updateUser = (api_key, updateObj) => {
  return new Promise((resolve, reject) => {
    User.updateOne({ api_key }, updateObj, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  getUserByApiKey,
  updateUser,
};
