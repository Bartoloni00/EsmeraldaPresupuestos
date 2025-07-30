import { PackagingRepository } from '../../../domain/repositories/PackagingRepository';

export interface Precio {
    precio: number;
    proveedor_id: number;
}

export interface Packaging {
    title: string;
    descripcion: string;
    precios?: Array<Precio>; 
}

export class CreatePackaging {
    constructor(private packagingRepository: PackagingRepository) {}
  
    async execute(newPackaging: Packaging): Promise<any> {
        const packagingData = {
            title: newPackaging.title,
            descripcion: newPackaging.descripcion,
        }

        const packagingID = await this.packagingRepository.create(packagingData);

        if (newPackaging.precios) {
            for (const price of newPackaging.precios) {
                const newPrice = {
                    precio: price.precio,
                    proveedor_id: price.proveedor_id,
                    packaging_id: packagingID,
                    created_at: new Date()
                }
                await this.packagingRepository.createPrecio(newPrice);
            }
        }
    }
}