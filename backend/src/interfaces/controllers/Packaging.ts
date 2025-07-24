import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { GetPackagingById } from '../../application/usecases/packagings/GetPackagingById';
import { CreatePackaging } from '../../application/usecases/packagings/CreatePackaging';
import { UpdatePackaging } from '../../application/usecases/packagings/UpdatePackaging';
import { DeletePackaging } from '../../application/usecases/packagings/DeletePackaging';


export default class PackagingController
{
    constructor(
        private ListPackagings: ListPackagings,
        private GetPackagingById: GetPackagingById,
        private CreatePackaging: CreatePackaging,
        private UpdatePackaging: UpdatePackaging,
        private DeletePackaging: DeletePackaging
    ) {}
    
    static async getAll(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'packaging')
        res.status(code.OK).json(result)
    }
    static async getById(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'packaging id')
        res.status(code.OK).json(result)
    }

    static async create(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'packaging crear')
        res.status(code.OK).json(result)
    }
    static async update(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'packaging actualizar')
        res.status(code.OK).json(result)
    }
    static async delete(_req: Request, res: Response): Promise<void>
    {
        const result = new Result(true, code.OK, 'packaging eliminar')
        res.status(code.OK).json(result)
    }
}