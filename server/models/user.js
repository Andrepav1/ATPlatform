"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const db_1 = __importDefault(require("../db"));
exports.userSchema = new db_1.default.Schema({
    api_key: String,
    primary_account: String,
    email: String
});
exports.User = db_1.default.model("User", exports.userSchema);
