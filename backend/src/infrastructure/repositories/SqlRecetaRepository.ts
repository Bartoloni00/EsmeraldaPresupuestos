import { RecetaRepository } from "../../domain/repositories/RecetaRepository";
import { DB } from "../db/mysql/db";
import { ResultSetHeader } from 'mysql2/promise';

export class MySQLRecetaRepository implements RecetaRepository
{
    async getAllorByID(id?: number): Promise<any[]>
    {
        let query = `SELECT * FROM receta`;
        if (id) {
            query += ` WHERE id = ${id}`;
        }
        const [rows] = await DB.query(query);
        return rows as any[]
    }

    async getAllIngredientesForReceta(receta_id?: number): Promise<any[]>
    {
        let query = `SELECT ingrediente.id
        FROM ingrediente_receta
        INNER JOIN ingrediente ON ingrediente.id = ingrediente_receta.ingrediente_id
        WHERE receta_id = ?`;

        const params = [receta_id];

        const [rows] = await DB.query(query, params);
        return rows as any[];
    }

    async getAllPackagingsForReceta(receta_id?: number): Promise<any[]>
    {
        let query = `SELECT packaging.id
        FROM packaging_receta
        INNER JOIN packaging ON packaging.id = packaging_receta.packaging_id
        WHERE receta_id = ?`;

        const params = [receta_id];

        const [rows] = await DB.query(query, params);
        return rows as any[];
    }

    async getAllCantidadesIngredientesForReceta(receta_id?: number, ingrediente_id?: number): Promise<Array<{ id: number; cantidad_kg: number; }>> 
    {
        let query = `SELECT ingrediente_receta.ingrediente_id as id, ingrediente_receta.cantidad_kg
        FROM ingrediente_receta
        INNER JOIN ingrediente ON ingrediente.id = ingrediente_receta.ingrediente_id
        WHERE receta_id = ? AND ingrediente_receta.ingrediente_id = ?`;

        const params = [receta_id, ingrediente_id];

        const [rows] = await DB.query(query, params);
        return rows as Array<{ id: number; cantidad_kg: number; }>;
    }

    async getAllCantidadesPackagingsForReceta(receta_id?: number, packaging_id?: number): Promise<Array<{ id: number; cantidad: number; }>> 
    {
        let query = `SELECT packaging_receta.packaging_id as id, packaging_receta.cantidad
        FROM packaging_receta
        INNER JOIN packaging ON packaging.id = packaging_receta.packaging_id
        WHERE receta_id = ? AND packaging_receta.packaging_id = ?`;

        const params = [receta_id, packaging_id];

        const [rows] = await DB.query(query, params);
        return rows as Array<{ id: number; cantidad: number; }>;
    }

    async createReceta(data?: object): Promise<number> {
        const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO receta SET ?`, data);
        return rows.insertId;
    }

    async createIngredienteRelation(data?: object): Promise<any> {
        const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO ingrediente_receta SET ?`, data);
        return rows;
    }

    async createPackagingRelation(data?: object): Promise<any> {
        const [rows]: [ResultSetHeader, any] = await DB.query(`INSERT INTO packaging_receta SET ?`, data);
        return rows;
    }

    async deleteIngredienteRelation(receta_id: number, ingrediente_id: number): Promise<void> {
        await DB.query(`DELETE FROM ingrediente_receta WHERE receta_id = ? AND ingrediente_id = ?`, [receta_id, ingrediente_id]);
        return;
    }

    async deletePackagingRelation(receta_id: number, packaging_id: number): Promise<void> {
        await DB.query(`DELETE FROM packaging_receta WHERE receta_id = ? AND packaging_id = ?`, [receta_id, packaging_id]);
        return;
    }

    async updateReceta(receta_id: number, data: object): Promise<void> {
        await DB.query(`UPDATE receta SET ? WHERE id = ?`, [data, receta_id]);
        return;
    }

    async updateIngredienteRelation(receta_id: number, ingrediente_id: number, cantidad_kg: number): Promise<void> {
        await DB.query(`UPDATE ingrediente_receta SET cantidad_kg = ? WHERE receta_id = ? AND ingrediente_id = ?`, [cantidad_kg, receta_id, ingrediente_id]);
        return;
    }

    async updatePackagingRelation(receta_id: number, packaging_id: number, cantidad: number): Promise<void> {
        await DB.query(`UPDATE packaging_receta SET cantidad = ? WHERE receta_id = ? AND packaging_id = ?`, [cantidad, receta_id, packaging_id]);
        return;
    }

    async deleteReceta(receta_id: number): Promise<void> {
        await DB.query(`DELETE FROM ingrediente_receta WHERE receta_id = ?`, [receta_id]);
        await DB.query(`DELETE FROM packaging_receta WHERE receta_id = ?`, [receta_id]);
        await DB.query(`DELETE FROM receta WHERE id = ?`, [receta_id]);
        return;
    }
}