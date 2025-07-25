import { IngredienteRepository } from '../../domain/repositories/IngredienteRepository';
import { DB } from '../db/mysql/db';

export class MySQLIngredienteRepository implements IngredienteRepository {
  async getAllorByID(ingrediente_id?: number): Promise<any[]> {
    let query = `
      SELECT ingrediente.*, precio_ingrediente.precio, proveedor.name as proveedor_name
      FROM ingrediente 
      JOIN precio_ingrediente ON precio_ingrediente.ingrediente_id = ingrediente.id
      JOIN proveedor ON proveedor.id = precio_ingrediente.proveedor_id
    `;

    const params = [];

    if (ingrediente_id) {
      query += ` WHERE ingrediente.id = ?`;
      params.push(ingrediente_id);
    }

    const [rows] = await DB.query(query, params);
    return rows as any[];
  }
}