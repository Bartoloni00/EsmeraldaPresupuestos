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
    deleteIngredienteRelation(receta_id: number, ingrediente_id: number): Promise<void>
    deletePackagingRelation(receta_id: number, packaging_id: number): Promise<void>
    updateReceta(receta_id: number, data: object): Promise<void>
    updateIngredienteRelation(receta_id: number, ingrediente_id: number, cantidad_kg: number): Promise<void>
    updatePackagingRelation(receta_id: number, packaging_id: number, cantidad: number): Promise<void>
    deleteReceta(receta_id: number): Promise<void>
}