import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern";
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes";
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { CreatePackaging } from '../../application/usecases/packagings/CreatePackaging';
import { UpdatePackaging } from '../../application/usecases/packagings/UpdatePackaging';
import { DeletePackaging } from '../../application/usecases/packagings/DeletePackaging';

export default class PackagingController {
    constructor(
        private listPackagings: ListPackagings,
        private createPackaging: CreatePackaging,
        private updatePackaging: UpdatePackaging,
        private deletePackaging: DeletePackaging
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
        const newPackaging = _req.body;
        try {
            await this.createPackaging.execute(newPackaging);

            res.status(code.OK).json(new Result(true, {
                'mensaje': 'packaging '+ newPackaging.title + ' creado',
            }));
        } catch (error) {
            res.status(code.BAD_REQUEST).json(new Result(false, {
                'mensaje_error': 'Ocurrio un error al crear el packaging',
            }));
        }
    }

    async update(_req: Request, res: Response): Promise<void> {
        const packaging_id = parseInt(_req.params.id);
        const newPackaging = _req.body;

        try {
            await this.updatePackaging.execute(packaging_id, newPackaging);

            res.status(code.OK).json(new Result(true, {
                'mensaje': 'El packaging con el id: ' + packaging_id + ' fue actualizado.',
            }));
        } catch (error) {
            res.status(code.BAD_REQUEST).json(new Result(false, {
                'mensaje_error': 'Ocurrio un error al actualizar el packaging',
            }));
        }
    }

    async delete(_req: Request, res: Response): Promise<void> {
        const packaging_id = parseInt(_req.params.id);
        try {
            await this.deletePackaging.execute(packaging_id);
            res.status(code.OK).json(new Result(true, {
                'mensaje': 'El packaging con el id: ' + packaging_id + ' fue eliminado.',
            }));
        } catch (error) {
            res.status(code.BAD_REQUEST).json(new Result(false, {
                'mensaje_error': 'Ocurrio un error al eliminar el packaging',
            }));
        }
    }
}
