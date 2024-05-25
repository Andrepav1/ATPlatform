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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = require("nodemailer");
const users_1 = require("./util/users");
const sendMail = (api_key_1, _a) => __awaiter(void 0, [api_key_1, _a], void 0, function* (api_key, { bot, instrument, units }) {
    // create reusable transporter object using the default SMTP transport
    let transporter = (0, nodemailer_1.createTransport)({
        host: process.env.E_MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.E_MAIL_USER,
            pass: process.env.E_MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    try {
        const user = yield (0, users_1.getUserByApiKey)(api_key);
        // send mail with defined transport object
        transporter.sendMail({
            from: process.env.E_MAIL_USER,
            to: user.email,
            subject: `New Signal by [${bot.name}]`,
            text: `Your bot [${bot.name}] using strategy [${bot.activeStrategy.name}] has placed a new ${units >= 0 ? "BUY" : "SELL"} order of ${Math.abs(units)} units, on instrument [${instrument}].`
        });
    }
    catch (error) {
        console.log("error while sending email");
    }
});
exports.sendMail = sendMail;
