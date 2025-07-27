import { Receta } from "../entities/entities";

export interface RecetaRepository
{
    getAllorByID(id?: number): Promise<Receta[]>
    getAllIngredientesForReceta(receta_id?: number): Promise<any[]>
    getAllPackagingsForReceta(receta_id?: number): Promise<any[]>
    getAllCantidadesIngredientesForReceta(receta_id?: number, ingrediente_id?: number): Promise<Array<{ id: number; cantidad_kg: number; }>> 
    getAllCantidadesPackagingsForReceta(receta_id?: number, packaging_id?: number): Promise<Array<{ id: number; cantidad: number; }>> 
    createReceta(data ?: object): Promise<number>
    createIngredienteRelation(data ?: object): Promise<void>
    createPackagingRelation(data ?: object): Promise<void>
}