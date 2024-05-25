"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technical_indicator_1 = require("../util/technical-indicator");
const router = express_1.default.Router();
// get all indicators
router.get('/', (_req, res, _next) => {
    let tiArray = Object.values(technical_indicator_1.technicalIndicators);
    const formattedIndicators = tiArray.map((indicator) => {
        return {
            name: indicator.name,
            config: (0, technical_indicator_1.getIndicatorConfig)(indicator.name),
            components: (0, technical_indicator_1.getIndicatorComponents)(indicator.name)
        };
    });
    res.json(formattedIndicators);
});
exports.default = router;
