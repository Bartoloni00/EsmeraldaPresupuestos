"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPackagings = void 0;
class ListPackagings {
    packagingRepository;
    constructor(packagingRepository) {
        this.packagingRepository = packagingRepository;
    }
    async execute(packaging_id) {
        const rows = await this.packagingRepository.getAllorByID(packaging_id);
        const result = [];
        for (const row of rows) {
            const existing = result.find(p => p.id === row.id);
            const priceEntry = {
                precio: row.precio,
                proveedor_name: row.proveedor_name
            };
            if (existing) {
                existing.precios.push(priceEntry);
            }
            else {
                result.push({
                    id: row.id,
                    title: row.title,
                    precios: [priceEntry]
                });
            }
        }
        return result;
    }
}
exports.ListPackagings = ListPackagings;
