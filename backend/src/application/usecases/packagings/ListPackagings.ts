import { PackagingWithPrecioAndProveedor } from '../../../domain/entities/entities';
import { PackagingRepository } from '../../../domain/repositories/PackagingRepository';

  export class ListPackagings {
    constructor(private packagingRepository: PackagingRepository) {}
  
    async execute(packaging_id?: number): Promise<PackagingWithPrecioAndProveedor[]> {
      const rows = await this.packagingRepository.getAllorByID(packaging_id);
  
      const result: PackagingWithPrecioAndProveedor[] = [];
  
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
            title: row.title,
            precios: [priceEntry]
          });
        }
      }
  
      return result;
    }
  }