import { CreateRecetaData } from "../../../domain/entities/entities";
import { RecetaRepository } from "../../../domain/repositories/RecetaRepository";

export class CreateReceta
{
    constructor(private recetaRepository: RecetaRepository) {}

    async execute(data: CreateRecetaData): Promise<any>
    {
        const recetaData = {
            title: data.title,
            descripcion: data.descripcion,
        }
        const recetaID = await this.recetaRepository.createReceta(recetaData);

        const ingredientes = await Promise.all(data.ingredientes.map(async (ingrediente) => {
            const ingredienteData = {
                receta_id: recetaID,
                ingrediente_id: ingrediente.ingrediente_id,
                cantidad_kg: ingrediente.cantidad_kg
            }
            await this.recetaRepository.createIngredienteRelation(ingredienteData);
            return ingredienteData;
        }));

        const packagings = await Promise.all(data.packagings.map(async (packaging) => {
            const packagingData = {
                receta_id: recetaID,
                packaging_id: packaging.packaging_id,
                cantidad: packaging.cantidad
            }
            await this.recetaRepository.createPackagingRelation(packagingData);
            return packagingData;
        }));

        return {
            ...recetaData,
            ingredientes,
            packagings
        }
    }
}