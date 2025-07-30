import { PackagingRepository } from '../../../domain/repositories/PackagingRepository';
import { Packaging } from './CreatePackaging'

export class UpdatePackaging {
    constructor(private packagingRepository: PackagingRepository) {}

    async execute(packaging_id: number, newPackaging: Packaging): Promise<any> {
        const packagingData = {
            title: newPackaging.title,
            descripcion: newPackaging.descripcion,
        };

        await this.packagingRepository.update(packaging_id, packagingData);

        if (Array.isArray(newPackaging.precios)) {
            await this.packagingRepository.deleteAllPrecios(packaging_id);

            for (const price of newPackaging.precios) {
                await this.packagingRepository.createPrecio({
                    precio: price.precio,
                    proveedor_id: price.proveedor_id,
                    packaging_id: packaging_id,
                    created_at: new Date()
                });
            }
        }
    }
}
