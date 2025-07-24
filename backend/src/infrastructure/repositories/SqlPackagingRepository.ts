import { PackagingRepository } from '../../domain/repositories/PackagingRepository';
import { DB } from '../db/mysql/db';

export class MySQLPackagingRepository implements PackagingRepository {
  async getAllorByID(packaging_id?: number): Promise<any[]> {
    let query = `
      SELECT packaging.*, precio_packaging.precio, proveedor.name as proveedor_name
      FROM packaging 
      JOIN precio_packaging ON precio_packaging.packaging_id = packaging.id
      JOIN proveedor ON proveedor.id = precio_packaging.proveedor_id
    `;

    const params = [];

    if (packaging_id) {
      query += ` WHERE packaging.id = ?`;
      params.push(packaging_id);
    }

    const [rows] = await DB.query(query, params);
    return rows as any[];
  }
}