import { Request, Response, NextFunction } from 'express';
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListRecetas } from '../../application/usecases/recetas/ListRecetas';
import Result from '../../domain/services/ResultsPattern';

export default class existReceta
{
    constructor(private listRecetas: ListRecetas) {}

    async validate(req: Request, res: Response, next: NextFunction){
        const recetaID = parseInt(req.params.id)
        
        if (!recetaID || recetaID < 1) {
            return res.status(code.NOT_FOUND).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const receta = await this.listRecetas.execute(recetaID)

        if (!Array.isArray(receta) || receta.length < 1) {
            return res.status(code.NOT_FOUND).json(new Result(false, {'mensaje_error': 'La receta solicitada no existe.'}));
        }
        return next()
    }
}