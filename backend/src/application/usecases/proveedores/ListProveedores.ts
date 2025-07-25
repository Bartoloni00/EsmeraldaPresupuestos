import { Proveedor } from '../../../domain/entities/entities';
import { ProveedorRepository } from '../../../domain/repositories/ProveedorRepository';

export class ListProveedores {
constructor(private proveedorRepository: ProveedorRepository) {}

    async execute(proveedor_id?: number): Promise<Proveedor[]> {
        return await this.proveedorRepository.getAllorByID(proveedor_id);
    }
}