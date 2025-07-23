import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"

export default class IndexController
{
    static async index(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'EsmeraldaPresupuestos API')
        res.status(code.OK).json(result)
    }
}