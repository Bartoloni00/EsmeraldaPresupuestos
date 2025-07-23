"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_js_1 = __importDefault(require("./interfaces/routes/api.js"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3333;
exports.port = port;
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/static', express_1.default.static('static'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(api_js_1.default);
