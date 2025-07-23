"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResultsPattern_1 = __importDefault(require("../../domain/services/ResultsPattern"));
const httpStatusCodes_1 = require("../../domain/services/httpStatusCodes");
class IndexController {
    static async index(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'EsmeraldaPresupuestos API');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
}
exports.default = IndexController;
