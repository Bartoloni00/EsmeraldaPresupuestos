"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResultsPattern_1 = __importDefault(require("../../domain/services/ResultsPattern"));
const httpStatusCodes_1 = require("../../domain/services/httpStatusCodes");
class PackagingController {
    static async getAll(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'packaging');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async getById(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'packaging id');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async create(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'packaging crear');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async update(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'packaging actualizar');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async delete(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'packaging eliminar');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
}
exports.default = PackagingController;
