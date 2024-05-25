"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserByApiKey = void 0;
const user_1 = require("../models/user");
const getUserByApiKey = (api_key) => {
    return new Promise((resolve, reject) => {
        user_1.User.findOne({ api_key }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
    });
};
exports.getUserByApiKey = getUserByApiKey;
const updateUser = (api_key, updateObj) => {
    return new Promise((resolve, reject) => {
        user_1.User.updateOne({ api_key }, updateObj, {}, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
    });
};
exports.updateUser = updateUser;
