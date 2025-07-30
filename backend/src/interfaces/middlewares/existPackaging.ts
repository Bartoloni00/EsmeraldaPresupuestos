import { Request, Response, NextFunction } from 'express';
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import Result from '../../domain/services/ResultsPattern';

export default class existPackaging
{
    constructor(private listPackagings: ListPackagings) {}

    async validate(req: Request, res: Response, next: NextFunction){
        const packagingID = parseInt(req.params.id)
        
        if (!packagingID || packagingID < 1) {
            return res.status(code.NOT_FOUND).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const packaging = await this.listPackagings.execute(packagingID)

        if (!Array.isArray(packaging) || packaging.length < 1) {
            return res.status(code.NOT_FOUND).json(new Result(false, {'mensaje_error': 'El packaging solicitado no existe.'}));
        }
        return next()
    }
}