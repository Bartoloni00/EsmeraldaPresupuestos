import { Proveedor } from '../entities/entities';
export interface ProveedorRepository {
    getAllorByID(proveedor_id ?: number): Promise<Proveedor[]>;
}