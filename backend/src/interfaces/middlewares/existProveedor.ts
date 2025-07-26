import { Request, Response, NextFunction } from 'express';
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';
import Result from '../../domain/services/ResultsPattern';

export default class existProveedor
{
    constructor(private listProveedores: ListProveedores) {}

    async validate(req: Request, res: Response, next: NextFunction){
        const proveedorID = parseInt(req.params.id)
        
        if (!proveedorID || proveedorID < 1) {
            return res.status(code.NOT_FOUND).json(new Result(false, {'mensaje_error': 'No se pudo procesar la petición.'}));
        }
        const proveedor = await this.listProveedores.execute(proveedorID)

        if (!Array.isArray(proveedor) || proveedor.length < 1) {
            return res.status(code.NOT_FOUND).json(new Result(false, {'mensaje_error': 'El proveedor solicitado no existe.'}));
        }
        return next()
    }
}