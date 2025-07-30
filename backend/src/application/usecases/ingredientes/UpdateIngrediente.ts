import { IngredienteRepository } from '../../../domain/repositories/IngredienteRepository';
import { Ingrediente } from './CreateIngrediente'

export class UpdateIngrediente {
    constructor(private IngredineteRepository: IngredienteRepository) {}

    async execute(Ingrediente_id: number, newIngredinete: Ingrediente): Promise<any> {
        const IngredienteData = {
            name: newIngredinete.name,
            descripcion: newIngredinete.descripcion,
        };

        await this.IngredineteRepository.update(Ingrediente_id, IngredienteData);

        if (Array.isArray(newIngredinete.precios)) {
            await this.IngredineteRepository.deleteAllPrecios(Ingrediente_id);

            for (const price of newIngredinete.precios) {
                await this.IngredineteRepository.createPrecio({
                    precio: price.precio,
                    proveedor_id: price.proveedor_id,
                    ingrediente_id: Ingrediente_id,
                    created_at: new Date()
                });
            }
        }
    }
}
