import { Receta } from "../entities/entities";

export interface RecetaRepository
{
    getAllorByID(id?: number): Promise<Receta[]>
}