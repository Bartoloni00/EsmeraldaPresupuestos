import { IngredienteRepository } from '../../../domain/repositories/IngredienteRepository';

export class DeleteIngrediente {
    constructor(private IngredienteRepository: IngredienteRepository) {}

    async execute(ingrediente_id: number): Promise<any> {
        await this.IngredienteRepository.deleteAllPrecios(ingrediente_id);
        await this.IngredienteRepository.delete(ingrediente_id);
        return;
    }
}
