"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResultsPattern_1 = __importDefault(require("../../domain/services/ResultsPattern"));
const httpStatusCodes_1 = require("../../domain/services/httpStatusCodes");
/*
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { GetIngredientesById } from '../../application/usecases/ingredientes/GetIngredientesById';
import { CreateIngrediente } from '../../application/usecases/ingredientes/CreateIngrediente';
import { UpdateIngrediente } from '../../application/usecases/ingredientes/UpdateIngrediente';
import { DeleteIngrediente } from '../../application/usecases/ingredientes/DeleteIngrediente';
*/
class IngredientesController {
    /*
    constructor(
        private listIngredients: ListIngredients,
        private getIngredientById: GetIngredientById,
        private createIngredient: CreateIngredient,
        private updateIngredient: UpdateIngredient,
        private deleteIngredient: DeleteIngredient
    ) {}*/
    static async getAll(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'ingredientes');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async getById(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'ingredientes');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async create(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'ingredientes');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async update(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'ingredientes');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
    static async delete(_req, res) {
        const result = new ResultsPattern_1.default(true, httpStatusCodes_1.httpStatusCodes.OK, 'ingredientes');
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(result);
    }
}
exports.default = IngredientesController;
