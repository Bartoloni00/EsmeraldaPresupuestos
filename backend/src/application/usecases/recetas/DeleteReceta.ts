import { RecetaRepository } from "../../../domain/repositories/RecetaRepository";

export class DeleteReceta
{
    constructor(private recetaRepository: RecetaRepository) {}

    async execute(receta_id: number): Promise<any>
    {
        return await this.recetaRepository.deleteReceta(receta_id);
    }
}