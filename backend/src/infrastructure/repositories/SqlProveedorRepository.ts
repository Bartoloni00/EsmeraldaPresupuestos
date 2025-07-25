import { ProveedorRepository } from '../../domain/repositories/ProveedorRepository';
import { DB } from '../db/mysql/db';

export class MySQLProveedorRepository implements ProveedorRepository {
    async getAllorByID(proveedor_id?: number): Promise<any[]> {
        let query = `SELECT * FROM proveedor`;

        const params = [];

        if (proveedor_id) {
            query += ` WHERE proveedor.id = ?`;
            params.push(proveedor_id);
        }

        const [rows] = await DB.query(query, params);
        return rows as any[];
    }
}