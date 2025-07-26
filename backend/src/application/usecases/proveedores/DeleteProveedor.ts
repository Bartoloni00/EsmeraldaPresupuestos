import { ProveedorRepository } from '../../../domain/repositories/ProveedorRepository';

export class DeleteProveedor {
constructor(private proveedorRepository: ProveedorRepository) {}

    async execute(proveedor_id?: number): Promise<void> {
        return await this.proveedorRepository.delete(proveedor_id);
    }
}