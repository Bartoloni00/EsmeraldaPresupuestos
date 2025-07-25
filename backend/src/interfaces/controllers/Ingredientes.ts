import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
/*
import { CreateIngrediente } from '../../application/usecases/ingredientes/CreateIngrediente';
import { UpdateIngrediente } from '../../application/usecases/ingredientes/UpdateIngrediente';
import { DeleteIngrediente } from '../../application/usecases/ingredientes/DeleteIngrediente';
*/
export default class IngredientesController
{
    constructor(private listIngredientes: ListIngredientes) {}

    async getAll(_req: Request, res: Response): Promise<void> {
        const ingredientes = await this.listIngredientes.execute();
        const result = new Result(true, ingredientes);
        res.status(code.OK).json(result);
    }

    async getById(_req: Request, res: Response): Promise<void> {
        const ingrediente = await this.listIngredientes.execute(parseInt(_req.params.id));
        if (!Array.isArray(ingrediente) || ingrediente.length < 1) {
            res.status(code.NOT_FOUND).json(new Result(false, 'Ingrediente no encontrado.'));
            return;
        }
        res.status(code.OK).json(new Result(true, ingrediente));
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