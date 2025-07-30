import { IngredienteRepository } from '../../domain/repositories/IngredienteRepository';
import { DB } from '../db/mysql/db';
import { ResultSetHeader } from 'mysql2/promise';
import { Ingrediente, Precio } from '../../application/usecases/ingredientes/CreateIngrediente';

export class MySQLIngredienteRepository implements IngredienteRepository {
  async getAllorByID(ingrediente_id?: number): Promise<any[]> {
    let query = `
      SELECT ingrediente.*, precio_ingrediente.precio, proveedor.name as proveedor_name
      FROM ingrediente 
      LEFT JOIN precio_ingrediente ON precio_ingrediente.ingrediente_id = ingrediente.id
      LEFT JOIN proveedor ON proveedor.id = precio_ingrediente.proveedor_id
    `;

    const params = [];

    if (ingrediente_id) {
      query += ` WHERE ingrediente.id = ?`;
      params.push(ingrediente_id);
    }

    const [rows] = await DB.query(query, params);
    return rows as any[];
  }

  async create(ingredienteData: Ingrediente): Promise<number> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO ingrediente SET ?`, ingredienteData);
    return rows.insertId;
  }

  async createPrecio(ingredientePrecio: Precio): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO precio_ingrediente SET ?`, ingredientePrecio);
    return rows;
  }

  async update(ingrediente_id: number, ingrediente: Ingrediente): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`UPDATE ingrediente SET ? WHERE id = ?`, [ingrediente, ingrediente_id]);
    return rows;
  }

  async delete(ingrediente_id: number): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`DELETE FROM ingrediente WHERE id = ?`, [ingrediente_id]);
    return rows;
  }

  async deleteAllPrecios(ingrediente_id: number): Promise<any> {
    const [rows]: [ResultSetHeader, any] = await DB.query(`
      DELETE FROM precio_ingrediente 
      WHERE ingrediente_id = ?`, [ingrediente_id]);
    return rows;
  }
}