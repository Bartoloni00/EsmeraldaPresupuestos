import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern";
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes";
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';

export default class PackagingController {
    constructor(
        private listPackagings: ListPackagings,
        /*
        private getPackagingById: typeof GetPackagingById,
        private createPackaging: typeof CreatePackaging,
        private updatePackaging: typeof UpdatePackaging,
        private deletePackaging: typeof DeletePackaging
        */
    ) {}

    async getAll(_req: Request, res: Response): Promise<void> {
        const packagings = await this.listPackagings.execute();
        const result = new Result(true,packagings);
        res.status(code.OK).json(result);
        return;
    }

    async getById(_req: Request, res: Response): Promise<void> {
        const packaging = await this.listPackagings.execute(parseInt(_req.params.id));

        if (!Array.isArray(packaging) || packaging.length < 1) {
            res.status(code.NOT_FOUND).json(new Result(false, 'packaging no encontrado.'));
            return;
        }

        res.status(code.OK).json(new Result(true, packaging));
        return;
    }

    async create(_req: Request, res: Response): Promise<void> {
        const result = new Result(true, 'packaging crear');
        res.status(code.OK).json(result);
    }

    async update(_req: Request, res: Response): Promise<void> {
        const result = new Result(true, 'packaging actualizar');
        res.status(code.OK).json(result);
    }

    async delete(_req: Request, res: Response): Promise<void> {
        const result = new Result(true, 'packaging eliminar');
        res.status(code.OK).json(result);
    }
}
