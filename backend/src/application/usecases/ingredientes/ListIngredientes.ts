import { IngredienteWithPrecioAndProveedor } from '../../../domain/entities/entities';
import { IngredienteRepository } from '../../../domain/repositories/IngredienteRepository';

  export class ListIngredientes {
    constructor(private IngredienteRepository: IngredienteRepository) {}
  
    async execute(ingrediente_id?: number): Promise<IngredienteWithPrecioAndProveedor[]> {
      const rows = await this.IngredienteRepository.getAllorByID(ingrediente_id);
  
      const result: IngredienteWithPrecioAndProveedor[] = [];
  
      for (const row of rows) {
        const existing = result.find(p => p.id === row.id);
  
        const priceEntry = {
          precio: row.precio,
          proveedor_name: row.proveedor_name
        };
  
        if (existing) {
          existing.precios.push(priceEntry);
        } else {
          result.push({
            id: row.id,
            name: row.name,
            descripcion: row.descripcion,
            precios: [priceEntry]
          });
        }
      }
  
      return result;
    }
  }