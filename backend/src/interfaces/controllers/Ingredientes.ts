import { Request, Response } from 'express';
import Result from "../../domain/services/ResultsPattern"
import { httpStatusCodes as code } from "../../domain/services/httpStatusCodes"
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { CreateIngrediente } from '../../application/usecases/ingredientes/CreateIngrediente';
import { UpdateIngrediente } from '../../application/usecases/ingredientes/UpdateIngrediente';
import { DeleteIngrediente } from '../../application/usecases/ingredientes/DeleteIngrediente';

export default class IngredientesController
{
    constructor(
        private listIngredientes: ListIngredientes,
        private createIngrediente: CreateIngrediente,
        private updateIngrediente: UpdateIngrediente,
        private deleteIngrediente: DeleteIngrediente
    ) {}

    async getAll(_req: Request, res: Response): Promise<void> {
        const ingredientes = await this.listIngredientes.execute();
        const result = new Result(true, ingredientes);
        res.status(code.OK).json(result);
    }

    async getById(_req: Request, res: Response): Promise<void> {
        const ingrediente = await this.listIngredientes.execute(parseInt(_req.params.id));
        if (!Array.isArray(ingrediente) || ingrediente.length < 1) {
            res.status(code.NOT_FOUND).json(new Result(false, 'Ingrediente no encontrado.'));
            return;
        }
        res.status(code.OK).json(new Result(true, ingrediente));
    }

    async create(_req: Request, res: Response): Promise<void>
    {
        const IngredienteData = _req.body;

        try {
            await this.createIngrediente.execute(IngredienteData);
            res.status(code.OK).json(new Result(true, {
                mensaje: 'Ingrediente "'+ IngredienteData.name +'" creado exitosamente.'
            }));
        } catch (error) {
            res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, {
                mensaje_error: 'Ocurrió un error al crear el ingrediente.'
            }));
        }
    }
    async update(_req: Request, res: Response): Promise<void>
    {
        const ingredienteID = parseInt(_req.params.id);
        const ingredienteData = _req.body;

        try {
            await this.updateIngrediente.execute(ingredienteID, ingredienteData);
            res.status(code.OK).json(new Result(true, {
                mensaje: 'Ingrediente con el id: '+ ingredienteID +' actualizado exitosamente.'
            }));
        } catch (error) {
            res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, {
                mensaje_error: 'Ocurrió un error al actualizar el ingrediente.'
            }));
        }
    }
    async delete(_req: Request, res: Response): Promise<void>
    {
        const ingredienteID = parseInt(_req.params.id);
        try {
            await this.deleteIngrediente.execute(ingredienteID);
            res.status(code.OK).json(new Result(true, {
                mensaje: 'Ingrediente con el id: '+ ingredienteID +' eliminado exitosamente.'
            }));
        } catch (error) {
            res.status(code.UNPROCESSABLE_ENTITY).json(new Result(false, {
                mensaje_error: 'Ocurrió un error al eliminar el ingrediente.'
            }));
        }
    }
}