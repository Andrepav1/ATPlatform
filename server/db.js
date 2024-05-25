"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #1 Import mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// #2 Create a query string to connect to MongoDB server
const DB_URI = "mongodb://localhost:27017/atsdb";
// #3 Connect to MongoDB
mongoose_1.default.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
// #4 Add basic event listeners on the mongoose.connection object
mongoose_1.default.connection.once("open", () => console.log("Connected to a MongoDB instance"));
mongoose_1.default.connection.on("error", (error) => console.error(error));
// #5 Export mongoose.
exports.default = mongoose_1.default;
