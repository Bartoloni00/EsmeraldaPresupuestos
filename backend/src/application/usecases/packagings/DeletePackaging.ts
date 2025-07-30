import { PackagingRepository } from '../../../domain/repositories/PackagingRepository';

export class DeletePackaging {
    constructor(private packagingRepository: PackagingRepository) {}

    async execute(packaging_id: number): Promise<any> {
        await this.packagingRepository.deleteAllPrecios(packaging_id);
        await this.packagingRepository.delete(packaging_id);
        return;
    }
}
