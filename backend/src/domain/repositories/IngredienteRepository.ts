export interface IngredienteRepository {
    getAllorByID(Ingrediente_id ?: number): Promise<any[]>;
}
