import { Receta } from "../../../domain/entities/entities";
import { RecetaRepository } from "../../../domain/repositories/RecetaRepository";

export class ListRecetas
{
    constructor(private recetaRepository: RecetaRepository) {}

    async execute(receta_id?: number): Promise<Receta[]>
    {
        return await this.recetaRepository.getAllorByID(receta_id);
    }
}