"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
const placeOrder = (instrument_1, units_1, ...args_1) => __awaiter(void 0, [instrument_1, units_1, ...args_1], void 0, function* (instrument, units, // ?
type = "MARKET", timeInForce = "FOK") {
    return yield simple_fxtrade_1.default.orders.create({
        order: {
            instrument,
            units,
            timeInForce,
            type
        }
    });
});
exports.placeOrder = placeOrder;
