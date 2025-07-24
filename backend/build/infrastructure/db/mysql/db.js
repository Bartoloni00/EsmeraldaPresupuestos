"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'esmeraldapresupuestos',
};
let connection;
(async () => {
    exports.DB = connection = await promise_1.default.createConnection(config);
})();
