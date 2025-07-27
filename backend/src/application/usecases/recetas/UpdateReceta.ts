import { UpdateRecetaData } from "../../../domain/entities/entities";
import { RecetaRepository } from "../../../domain/repositories/RecetaRepository";

export class UpdateReceta
{
    constructor(private recetaRepository: RecetaRepository) {}

    async execute(receta_id: number, data: UpdateRecetaData): Promise<any>
    {
        let recetaData: any = {
            title: data.title,
        };

        if (data.descripcion) {
            recetaData.descripcion = data.descripcion;
        }
        await this.recetaRepository.updateReceta(receta_id,recetaData);

        if (data.ingredientes) {
            const ingredientes = data.ingredientes;
            const actIngredientes = await this.recetaRepository.getAllIngredientesForReceta(receta_id);

            const eliminarIngredientes = actIngredientes.filter(i => !ingredientes.find(d => d.ingrediente_id === i.id));
            if (eliminarIngredientes.length > 0) {
                await Promise.all(eliminarIngredientes.map(async (ingrediente) => {
                    await this.recetaRepository.deleteIngredienteRelation(receta_id, ingrediente.id);
                    return ingrediente;
                }));
            }
            const nuevosIngredientes = ingredientes.filter(i => !actIngredientes.find(d => d.id === i.ingrediente_id));
            if (nuevosIngredientes.length > 0) {
                await Promise.all(nuevosIngredientes.map(async (ingrediente) => {
                    const ingredienteData = {
                        receta_id: receta_id,
                        ingrediente_id: ingrediente.ingrediente_id,
                        cantidad_kg: ingrediente.cantidad_kg
                    }
                    await this.recetaRepository.createIngredienteRelation(ingredienteData);
                    return ingredienteData;
                }));
            }

            const ingredientesActualizables = ingredientes.filter(i => {
                const actual = actIngredientes.find(d => d.id === i.ingrediente_id);
                return actual && actual.cantidad_kg !== i.cantidad_kg;
            });

            await Promise.all(ingredientesActualizables.map(async (ingrediente) => {
                await this.recetaRepository.updateIngredienteRelation(
                    receta_id,
                    ingrediente.ingrediente_id,
                    ingrediente.cantidad_kg
                );
            }));
        }
        if (data.packagings) {
            const packagings = data.packagings;
            const actPackagings = await this.recetaRepository.getAllPackagingsForReceta(receta_id);

            const eliminarPackagings = actPackagings.filter(p => !packagings.find(d => d.packaging_id === p.id));
            if (eliminarPackagings.length > 0) {
                await Promise.all(eliminarPackagings.map(async (packaging) => {
                    await this.recetaRepository.deletePackagingRelation(receta_id, packaging.id);
                    return packaging;
                }));
            }

            const nuevosPackagings = packagings.filter(p => !actPackagings.find(d => d.id === p.packaging_id));
            if (nuevosPackagings.length > 0) {
                await Promise.all(nuevosPackagings.map(async (packaging) => {
                    const packagingData = {
                        receta_id: receta_id,
                        packaging_id: packaging.packaging_id,
                        cantidad: packaging.cantidad
                    }
                    await this.recetaRepository.createPackagingRelation(packagingData);
                    return packagingData;
                }));
            }

            const packagingsActualizables = packagings.filter(p => {
                const actual = actPackagings.find(d => d.id === p.packaging_id);
                return actual && actual.cantidad !== p.cantidad;
            });

            await Promise.all(packagingsActualizables.map(async (packaging) => {
                await this.recetaRepository.updatePackagingRelation(
                    receta_id,
                    packaging.packaging_id,
                    packaging.cantidad
                );
            }));
        }

        return {
            ...data,
        }
    }
}