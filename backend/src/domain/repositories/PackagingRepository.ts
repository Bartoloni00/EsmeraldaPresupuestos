import { Packaging, PrecioPackaging } from '../entities/entities';

export interface PackagingRepository {
    getAllorByID(packaging_id ?: number): Promise<any[]>;
    create(packaging: Packaging): Promise<any>;
    update(packaging_id: number, packaging: Packaging): Promise<any>;
    createPrecio(precio: PrecioPackaging): Promise<any>;
    deleteAllPrecios(packaging_id: number): Promise<any>;
    getAllPrecios(packaging_id: number): Promise<any[]>;
    delete(packaging_id: number): Promise<any>;
}
