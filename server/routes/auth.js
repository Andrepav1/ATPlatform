"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
// login only sets the API key and the account ID for the next calls and saves the user object
router.post('/login', function (req, res, next) {
    const { apiKey, accountId, live } = req.body;
    try {
        simple_fxtrade_1.default.configure({ apiKey, accountId, live });
        var user_instance = new user_1.User({
            api_key: apiKey,
            primary_account: accountId
        });
        user_instance.save((error) => {
            if (error) {
                console.log('Error while saving user');
            }
        });
    }
    catch (error) {
        next(error);
    }
    res.json({ apiKey, accountId });
});
exports.default = router;
