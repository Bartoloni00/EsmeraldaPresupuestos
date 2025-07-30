import { Packaging, PrecioPackaging } from '../../domain/entities/entities';
import { PackagingRepository } from '../../domain/repositories/PackagingRepository';
import { ResultSetHeader } from 'mysql2/promise';
import { DB } from '../db/mysql/db';

export class MySQLPackagingRepository implements PackagingRepository {
  async getAllorByID(packaging_id?: number): Promise<any[]> {
    let query = `
      SELECT 
      packaging.id,
      packaging.title,
      packaging.descripcion,
      precio_packaging.precio,
      proveedor.name as proveedor_name
      FROM packaging 
      LEFT JOIN precio_packaging ON precio_packaging.packaging_id = packaging.id
      LEFT JOIN proveedor ON proveedor.id = precio_packaging.proveedor_id
    `;

    const params = [];

    if (packaging_id) {
      query += ` WHERE packaging.id = ?`;
      params.push(packaging_id);
    }

    const [rows] = await DB.query(query, params);
    return rows as any[];
  }
  
  async create(packaging: Packaging): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO packaging SET ?`, packaging);
    return rows.insertId;
  }

  async createPrecio(data: PrecioPackaging): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO precio_packaging SET ?`, data);
    return rows;
  }

  async update(packaging_id: number, packaging: Packaging): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`UPDATE packaging SET ? WHERE id = ?`, [packaging, packaging_id]);
    return rows;
  }

  async delete(packaging_id: number): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`DELETE FROM packaging WHERE id = ?`, [packaging_id]);
    return rows;
  }

  async deleteAllPrecios(packaging_id: number): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`
      DELETE FROM precio_packaging 
      WHERE packaging_id = ?`, [packaging_id]);
    return rows;
  }

  async getAllPrecios(packaging_id: number): Promise<any[]> {
    let query = `
      SELECT packaging.*, precio_packaging.precio, proveedor.name as proveedor_name
      FROM packaging 
      JOIN precio_packaging ON precio_packaging.packaging_id = packaging.id
      JOIN proveedor ON proveedor.id = precio_packaging.proveedor_id
      WHERE packaging.id = ?`;

    const [rows] = await DB.query(query, [packaging_id]);
    return rows as any[];
  }
}