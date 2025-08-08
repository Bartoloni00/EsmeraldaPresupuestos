import { Proveedor } from '../../../domain/entities/entities';
import { ProveedorRepository } from '../../../domain/repositories/ProveedorRepository';

interface CreateProveedorData {
    name: string;
    descripcion?: string;
    telefono?: string;
    mail?: string;
    pagina?: string;
    pais?: string;
    provincia?: string;
    ciudad?: string;
    calle?: string;
    numero_calle?: number|string|null;
}

export class CreateProveedor {
constructor(private proveedorRepository: ProveedorRepository) {}

    async execute(data?: CreateProveedorData): Promise<Proveedor> {
        if (data?.numero_calle === '') {
            data.numero_calle = null;
        }
        return await this.proveedorRepository.create(data);
    }
}