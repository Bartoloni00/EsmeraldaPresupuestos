import {
    RecetaWithIngredientesAndPackagings,
    IngredienteRecetaDetalle, // Asegúrate de importar esta interfaz
    PackagingRecetaDetalle    // Asegúrate de importar esta interfaz
} from "../../../domain/entities/entities";
import { RecetaRepository } from "../../../domain/repositories/RecetaRepository";
import { ListIngredientes } from "../ingredientes/ListIngredientes";
import { ListPackagings } from "../packagings/ListPackagings";

export class ListRecetas {
    constructor(
        private recetaRepository: RecetaRepository,
        private listIngredientes: ListIngredientes,
        private listPackagings: ListPackagings
    ) {}

    async execute(receta_id?: number): Promise<RecetaWithIngredientesAndPackagings[]> {
        const recetasBase = await this.recetaRepository.getAllorByID(receta_id);

        const recetas: RecetaWithIngredientesAndPackagings[] = recetasBase.map(r => ({
            ...r,
            ingredientes: [],
            packagings: []
        }));

        for (const receta of recetas) {
            const ingredientesData = await this.recetaRepository.getAllIngredientesForReceta(receta.id);

            const ingredientesPromises = ingredientesData.map(async (row) => {
                const result = await this.listIngredientes.execute(row.id);

                if (Array.isArray(result) && result.length > 0) {
                    const ingredienteConPrecioYProveedor = result[0];
                    const cantidad_kg = await this.recetaRepository.getAllCantidadesIngredientesForReceta(receta.id, row.id);
                    return {
                        ...ingredienteConPrecioYProveedor,
                        cantidad_kg: cantidad_kg[0].cantidad_kg
                    } as IngredienteRecetaDetalle;
                }
                return null;
            });

            receta.ingredientes = (await Promise.all(ingredientesPromises)).filter(
                (i): i is IngredienteRecetaDetalle => i !== null
            );

            const packagingData = await this.recetaRepository.getAllPackagingsForReceta(receta.id);

            const packagingsPromises = packagingData.map(async (row) => {
                const result = await this.listPackagings.execute(row.id);

                if (Array.isArray(result) && result.length > 0) {
                    const packagingConPrecioYProveedor = result[0];
                    const cantidad = await this.recetaRepository.getAllCantidadesPackagingsForReceta(receta.id, row.id);
                    return {
                        ...packagingConPrecioYProveedor,
                        cantidad: cantidad[0].cantidad
                    } as PackagingRecetaDetalle;
                }
                return null;
            });

            receta.packagings = (await Promise.all(packagingsPromises)).filter(
                (p): p is PackagingRecetaDetalle => p !== null
            );
        }

        return recetas;
    }
}