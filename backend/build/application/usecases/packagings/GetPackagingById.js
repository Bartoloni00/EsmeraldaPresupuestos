"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPackagingById = void 0;
class GetPackagingById {
    PackagingRepository;
    constructor(PackagingRepository) {
        this.PackagingRepository = PackagingRepository;
    }
    async execute() {
        const results = await this.PackagingRepository.getAll();
        const grouped = results.reduce((acc, row) => {
            const existing = acc.find(p => p.id === row.id);
            const priceEntry = {
                precio: row.precio,
                proveedor_name: row.proveedor_name,
            };
            if (existing) {
                existing.precios.push(priceEntry);
            }
            else {
                acc.push({
                    id: row.id,
                    title: row.title,
                    descripcion: row.descripcion,
                    precios: [priceEntry],
                });
            }
            return acc;
        }, []);
        return grouped;
    }
}
exports.GetPackagingById = GetPackagingById;
