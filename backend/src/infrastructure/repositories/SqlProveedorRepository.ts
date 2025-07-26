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

    async create(data?: object): Promise<any> {
        const [rows] = await DB.query(`INSERT INTO proveedor SET ?`, data);
        return rows as any;
    }

    async update(data?: object, proveedor_id?: number): Promise<any> {
        const [rows] = await DB.query(`UPDATE proveedor SET ? WHERE id = ?`, [data, proveedor_id]);
        return rows as any;
    }

    async delete(proveedor_id?: number): Promise<void> {
        await DB.query(`DELETE FROM proveedor WHERE id = ?`, [proveedor_id]);
        return;
    }
}