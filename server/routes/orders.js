"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
const router = express_1.default.Router();
const getOrders = () => {
    return new Promise(function (resolve, reject) {
        simple_fxtrade_1.default.orders()
            .then((result) => {
            resolve(result);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
/* GET orders. */
router.get('/', (req, res, next) => {
    getOrders()
        .then((result) => {
        res.json(result);
    })
        .catch((error) => {
        console.log(error);
        res.json({ error });
    });
});
router.post('/place', (req, res, next) => {
    const query = req.query;
    const params = req.params;
    console.log(query, params);
});
exports.default = router;
