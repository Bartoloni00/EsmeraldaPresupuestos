import { Request, Response, NextFunction } from 'express';
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { validateReceta, validatePartialReceta } from "../validators/ValidateReceta"
import Result from '../../domain/services/ResultsPattern';
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';

export default class StoreRequest
{
    constructor(
        private listIngredientes: ListIngredientes,
        private listPackagings: ListPackagings
    ) {}

    async validate(req: Request, res: Response, next: NextFunction){
        if (!req.body) {
            return res.status(code.BAD_REQUEST).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const result = validateReceta(req.body)
        if (!result.success) {
            return res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, result.error.format()));
        }

        if (req.body.ingredientes) {
            for (const ing of req.body.ingredientes) {
                const ingrediente = await this.listIngredientes.execute(ing.ingrediente_id);
                if (!Array.isArray(ingrediente) || ingrediente.length < 1) {
                    return res.status(code.NOT_FOUND).json(new Result(false, { 'mensaje_error': 'El ingrediente solicitado no existe.' }));
                }
            }
        }


        if (req.body.packagings) {
            for (const pack of req.body.packagings) {
                const packaging = await this.listPackagings.execute(pack.packaging_id);
                if (!Array.isArray(packaging) || packaging.length < 1) {
                    return res.status(code.NOT_FOUND).json(new Result(false, { 'mensaje_error': 'El packaging solicitado no existe.' }));
                }
            }
        }

        req.body = result.data
        return next()
    }
    
    async partialValidate(req: Request, res: Response, next: NextFunction){
        if (!req.body) {
            return res.status(code.BAD_REQUEST).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const result = validatePartialReceta(req.body)
        
        if (req.body.ingredientes) {
            for (const ing of req.body.ingredientes) {
                const ingrediente = await this.listIngredientes.execute(ing.ingrediente_id);
                if (!Array.isArray(ingrediente) || ingrediente.length < 1) {
                    return res.status(code.NOT_FOUND).json(new Result(false, { 'mensaje_error': 'El ingrediente solicitado no existe.' }));
                }
            }
        }


        if (req.body.packagings) {
            for (const pack of req.body.packagings) {
                const packaging = await this.listPackagings.execute(pack.packaging_id);
                if (!Array.isArray(packaging) || packaging.length < 1) {
                    return res.status(code.NOT_FOUND).json(new Result(false, { 'mensaje_error': 'El packaging solicitado no existe.' }));
                }
            }
        }

        if (!result.success) {
            return res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, result.error.format()));
        }
        req.body = result.data
        return next()
    }
}