import { Proveedor } from '../../../domain/entities/entities';
import { ProveedorRepository } from '../../../domain/repositories/ProveedorRepository';

export class UpdateProveedor {
constructor(private proveedorRepository: ProveedorRepository) {}

    async execute(data?: object, proveedor_id?: number): Promise<Proveedor> {
        return await this.proveedorRepository.update(data, proveedor_id);
    }
}