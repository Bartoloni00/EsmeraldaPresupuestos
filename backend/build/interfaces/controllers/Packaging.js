"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResultsPattern_1 = __importDefault(require("../../domain/services/ResultsPattern"));
const httpStatusCodes_1 = require("../../domain/services/httpStatusCodes");
class PackagingController {
    listPackagings;
    constructor(listPackagings) {
        this.listPackagings = listPackagings;
    }
    async getAll(_req, res) {
        const packagings = await this.listPackagings.execute();
        const result = new ResultsPattern_1.default(true, packagings);
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
        return;
    }
    async getById(_req, res) {
        const packaging = await this.listPackagings.execute(parseInt(_req.params.id));
        if (!Array.isArray(packaging) || packaging.length < 1) {
            res.status(httpStatusCodes_1.httpStatusCodes.NOT_FOUND).json(new ResultsPattern_1.default(false, 'packaging no encontrado.'));
            return;
        }
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(new ResultsPattern_1.default(true, packaging));
        return;
    }
    async create(_req, res) {
        const result = new ResultsPattern_1.default(true, 'packaging crear');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    async update(_req, res) {
        const result = new ResultsPattern_1.default(true, 'packaging actualizar');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    async delete(_req, res) {
        const result = new ResultsPattern_1.default(true, 'packaging eliminar');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
}
exports.default = PackagingController;
