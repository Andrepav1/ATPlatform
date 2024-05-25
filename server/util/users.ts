import { User } from "../models/user";

export const getUserByApiKey = (api_key): any => {
  return new Promise((resolve, reject) => {
    User.findOne({ api_key }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

export const updateUser = (api_key, updateObj) => {
  return new Promise((resolve, reject) => {
    User.updateOne({ api_key }, updateObj, {}, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};
