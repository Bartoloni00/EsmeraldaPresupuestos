import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListRecetas } from "../../application/usecases/recetas/ListRecetas";
import { CreateReceta } from "../../application/usecases/recetas/CreateReceta";
import { UpdateReceta } from "../../application/usecases/recetas/UpdateReceta";
import { DeleteReceta } from "../../application/usecases/recetas/DeleteReceta";

export default class RecetasController
{
    constructor(
        private listRecetas: ListRecetas,
        private createReceta: CreateReceta,
        private updateReceta: UpdateReceta,
        private deleteReceta: DeleteReceta
    ) {}

    async getAll(_req: Request, res: Response): Promise<void>
    {
        const recetas = await this.listRecetas.execute()
        res.status(code.OK).json(new Result(true, recetas))
    }
    async getById(_req: Request, res: Response): Promise<void>
    {
        const receta = await this.listRecetas.execute(parseInt(_req.params.id))
        if (!Array.isArray(receta) || receta.length < 1) {
            res.status(code.NOT_FOUND).json(new Result(false, 'La receta solicitada no existe.'))
            return
        }
        res.status(code.OK).json(new Result(true, receta))
    }

    async create(_req: Request, res: Response): Promise<void>
    {
        const recetaData = _req.body
        try {
            await this.createReceta.execute(recetaData)
            res.status(code.OK).json(new Result(true, {
                'message': 'Receta con el nombre: ' + recetaData.title + ' creada correctamente.'
            }))
        } catch (error) {
            res.status(code.OK).json(new Result(true, {
                'mensaje_error': 'Error inesperado al crear la receta.'
            }))
        }
    }
    async update(_req: Request, res: Response): Promise<void>
    {
        const recetaID = parseInt(_req.params.id)
        const recetaData = _req.body
        try {
            await this.updateReceta.execute(recetaID, recetaData)
            res.status(code.OK).json(new Result(true, {
                'message': 'Receta con el id: ' + recetaID + ' editada correctamente.'
            }))
        } catch (error) {
            
        }
    }
    async delete(_req: Request, res: Response): Promise<void>
    {
        const recetaID = parseInt(_req.params.id)
        try {
            await this.deleteReceta.execute(recetaID)
            res.status(code.OK).json(new Result(true, {
                'message': 'Receta con el id: ' + recetaID + ' eliminada correctamente.'
            }))
        } catch (error) {
            res.status(code.OK).json(new Result(false, {
                'mensaje_error': 'Error inesperado al eliminar la receta.'
            }))
        }
    }
}