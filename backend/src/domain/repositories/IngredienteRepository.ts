import { Ingrediente, Precio } from "../../application/usecases/ingredientes/CreateIngrediente";

export interface IngredienteRepository {
    getAllorByID(Ingrediente_id ?: number): Promise<any[]>;
    create(ingredienteData: Ingrediente): Promise<number>;
    createPrecio(ingredientePrecio: Precio): Promise<void>;
    update(ingrediente_id: number, ingrediente: Ingrediente): Promise<any>;
    delete(ingrediente_id: number): Promise<any>;
    deleteAllPrecios(ingrediente_id: number): Promise<any>;
}
