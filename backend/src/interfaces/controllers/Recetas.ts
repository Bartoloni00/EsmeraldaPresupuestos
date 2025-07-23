import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"

export default class RecetasController
{
    static async getAll(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas')
        res.status(code.OK).json(result)
    }
    static async getById(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas id')
        res.status(code.OK).json(result)
    }

    static async create(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas crear')
        res.status(code.OK).json(result)
    }
    static async update(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas actualizar')
        res.status(code.OK).json(result)
    }
    static async delete(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas eliminar')
        res.status(code.OK).json(result)
    }
}