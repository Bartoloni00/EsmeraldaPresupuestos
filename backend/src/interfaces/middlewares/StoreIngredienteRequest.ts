import { Request, Response, NextFunction } from 'express';
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { validateIngrediente, validatePartialIngrediente } from "../validators/ValidateIngrediente"
import Result from '../../domain/services/ResultsPattern';
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';

export default class StoreIngrediente {
    constructor(private listProveedores: ListProveedores) {}

    async validate(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            return res.status(code.BAD_REQUEST).json(new Result(false, { mensaje_error: 'No se pudo procesar la petición.' }));
        }

        const result = validateIngrediente(req.body);
        if (!result.success) {
            return res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, result.error.format()));
        }

        try {
            if (Array.isArray(result.data.precios)) {
                for (const price of result.data.precios) {
                    await this.validateProveedor(price.proveedor_id);
                }
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Proveedor no encontrado';
            return res.status(code.NOT_FOUND).json(new Result(false, message));
        }

        req.body = result.data;
        return next();
    }

    async partialValidate(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            return res.status(code.BAD_REQUEST).json(new Result(false, { mensaje_error: 'No se pudo procesar la petición.' }));
        }

        const result = validatePartialIngrediente(req.body);

        if (!result.success) {
            return res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, result.error.format()));
        }

        try {
            if (Array.isArray(result.data.precios)) {
                for (const price of result.data.precios) {
                    await this.validateProveedor(price.proveedor_id);
                }
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Proveedor no encontrado';
            return res.status(code.NOT_FOUND).json(new Result(false, message));
        }

        req.body = result.data;
        return next();
    }

    private async validateProveedor(proveedor_id: number): Promise<void> {
        const proveedor = await this.listProveedores.execute(proveedor_id);
        if (!Array.isArray(proveedor) || proveedor.length < 1) {
            throw new Error('Proveedor no encontrado');
        }
    }
}
