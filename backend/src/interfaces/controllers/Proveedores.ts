import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';

export default class ProveedoresController
{
    constructor(private listProveedores: ListProveedores) {}

    async getAll(_req: Request, res: Response): Promise<void>
    {
        const proveedores = await this.listProveedores.execute()
        const result = new Result(true, proveedores)
        res.status(code.OK).json(result)
    }
    async getById(_req: Request, res: Response): Promise<void>
    {
        const proveedor = await this.listProveedores.execute(parseInt(_req.params.id))
        if (!Array.isArray(proveedor) || proveedor.length < 1) {
            res.status(code.NOT_FOUND).json(new Result(false, 'proveedor no encontrado.'))
            return
        }
        res.status(code.OK).json(new Result(true, proveedor))
    }

    async create(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'proveedores crear')
        res.status(code.OK).json(result)
    }
    async update(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'proveedores actualizar')
        res.status(code.OK).json(result)
    }
    async delete(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'proveedores eliminar')
        res.status(code.OK).json(result)
    }
}