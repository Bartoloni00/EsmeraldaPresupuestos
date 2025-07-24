import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"

import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { GetIngredientesById } from '../../application/usecases/ingredientes/GetIngredientesById';
import { CreateIngrediente } from '../../application/usecases/ingredientes/CreateIngrediente';
import { UpdateIngrediente } from '../../application/usecases/ingredientes/UpdateIngrediente';
import { DeleteIngrediente } from '../../application/usecases/ingredientes/DeleteIngrediente';

export default class IngredientesController
{
    constructor(
        private listIngredients: ListIngredients,
        private getIngredientById: GetIngredientById,
        private createIngredient: CreateIngredient,
        private updateIngredient: UpdateIngredient,
        private deleteIngredient: DeleteIngredient
    ) {}

    static async getAll(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'ingredientes')
        res.status(code.OK).json(result)
    }

    static async getById(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'ingredientes')
        res.status(code.OK).json(result)
    }

    static async create(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'ingredientes')
        res.status(code.OK).json(result)
    }
    static async update(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'ingredientes')
        res.status(code.OK).json(result)
    }
    static async delete(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'ingredientes')
        res.status(code.OK).json(result)
    }
}