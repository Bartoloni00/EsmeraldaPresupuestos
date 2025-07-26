import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';
import { CreateProveedor } from '../../application/usecases/proveedores/CreateProveedor';
import { UpdateProveedor } from '../../application/usecases/proveedores/UpdateProveedor';
import { DeleteProveedor } from '../../application/usecases/proveedores/DeleteProveedor';

export default class ProveedoresController
{
    constructor(
        private listProveedores: ListProveedores, 
        private createProveedor: CreateProveedor, 
        private updateProveedor: UpdateProveedor,
        private deleteProveedor: DeleteProveedor,
        ) {}

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

    async create(req: Request, res: Response): Promise<void>
    {
        const proveedorData = req.body
        try {
            await this.createProveedor.execute(proveedorData)

            res.status(code.OK).json(new Result(true, {
                'message': 'proveedor ' + proveedorData.name + ' creado correctamente.',
            }))
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json(new Result(false, {
                'mensaje_error': 'Error inesperado al crear el proveedor.',
            }))
        }
    }
    async update(_req: Request, res: Response): Promise<void>
    {
        const proveedorID = parseInt(_req.params.id)
        const proveedorData = _req.body
        try {
            await this.updateProveedor.execute(proveedorData, proveedorID)
            res.status(code.OK).json(new Result(true, {
                'message': 'proveedor con el id: ' + proveedorID + ' actualizado correctamente.',
            }))
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json(new Result(false, {
                'mensaje_error': 'Error inesperado al actualizar el proveedor.',
            }))
        }
    }
    async delete(_req: Request, res: Response): Promise<void>
    {
        const proveedorID = parseInt(_req.params.id)
        try {
            await this.deleteProveedor.execute(proveedorID)

            res.status(code.OK).json(new Result(true, {
                'message': 'proveedor eliminado con el id: ' + proveedorID,
            }))
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json(new Result(false, {
                'mensaje_error': 'Error inesperado al eliminar el proveedor.',
            }))
        }
    }
}