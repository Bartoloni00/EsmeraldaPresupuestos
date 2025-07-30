import { IngredienteRepository } from '../../../domain/repositories/IngredienteRepository';

export interface Precio {
    precio: number;
    proveedor_id: number;
    ingrediente_id?: number;
    created_at?: Date;
}

export interface Ingrediente {
    name: string;
    descripcion: string;
    precios?: Array<Precio>; 
}

export class CreateIngrediente {
    constructor(private IngredienteRepository: IngredienteRepository) {}
  
    async execute(newIngrediente: Ingrediente): Promise<any> {
        const ingredienteData = {
            name: newIngrediente.name,
            descripcion: newIngrediente.descripcion,
        }

        const ingredienteID = await this.IngredienteRepository.create(ingredienteData);

        if (newIngrediente.precios) {
            for (const price of newIngrediente.precios) {
                const newPrice = {
                    precio: price.precio,
                    proveedor_id: price.proveedor_id,
                    ingrediente_id: ingredienteID,
                    created_at: new Date()
                }
                await this.IngredienteRepository.createPrecio(newPrice);
            }
        }
    }
}