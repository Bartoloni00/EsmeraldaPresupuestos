import { Proveedor } from '../entities/entities';
export interface ProveedorRepository {
    getAllorByID(proveedor_id ?: number): Promise<Proveedor[]>;
    create(data ?: object): Promise<Proveedor>;
    update(data ?: object, proveedor_id ?: number): Promise<Proveedor>;
    delete(proveedor_id ?: number): Promise<void>;
}