"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../util/users");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("users");
});
router.put("/update", (req, res, next) => {
    const { api_key, email } = req.body;
    (0, users_1.updateUser)(api_key, { email })
        .then(() => {
        res.json({ message: "updated successfully" });
    })
        .catch((error) => {
        res.json({ error });
    });
});
exports.default = router;
