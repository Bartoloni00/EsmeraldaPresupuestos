import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListRecetas } from "../../application/usecases/recetas/ListRecetas";

export default class RecetasController
{
    constructor(private listRecetas: ListRecetas) {}

    async getAll(_req: Request, res: Response): Promise<void>
    {
        const recetas = await this.listRecetas.execute()
        res.status(code.OK).json(new Result(true, recetas))
    }
    async getById(_req: Request, res: Response): Promise<void>
    {
        const receta = await this.listRecetas.execute(parseInt(_req.params.id))
        if (!Array.isArray(receta) || receta.length < 1) {
            res.status(code.NOT_FOUND).json(new Result(false, 'receta no encontrado.'))
            return
        }
        res.status(code.OK).json(new Result(true, receta))
    }

    async create(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas crear')
        res.status(code.OK).json(result)
    }
    async update(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas actualizar')
        res.status(code.OK).json(result)
    }
    async delete(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'recetas eliminar')
        res.status(code.OK).json(result)
    }
}