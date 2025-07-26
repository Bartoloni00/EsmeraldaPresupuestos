import { Proveedor } from '../../../domain/entities/entities';
import { ProveedorRepository } from '../../../domain/repositories/ProveedorRepository';

export class CreateProveedor {
constructor(private proveedorRepository: ProveedorRepository) {}

    async execute(data?: object): Promise<Proveedor> {
        return await this.proveedorRepository.create(data);
    }
}