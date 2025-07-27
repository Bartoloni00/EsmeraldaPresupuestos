import { Request, Response, NextFunction } from 'express';
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { validateProveedor, validatePartialProveedor } from "../validators/ValidateProveedor"
import Result from '../../domain/services/ResultsPattern';

export default class StoreRequest
{
    static validate(req: Request, res: Response, next: NextFunction){
        if (!req.body) {
            return res.status(code.BAD_REQUEST).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const result = validateProveedor(req.body)
        if (!result.success) {
            return res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, result.error.format()));
        }
        req.body = result.data
        return next()
    }
    
    static partialValidate(req: Request, res: Response, next: NextFunction){
        if (!req.body) {
            return res.status(code.BAD_REQUEST).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const result = validatePartialProveedor(req.body)
        
        if (!result.success) {
            return res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, result.error.format()));
        }
        req.body = result.data
        return next()
    }
}