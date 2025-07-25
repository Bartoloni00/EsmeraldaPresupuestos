import { RecetaRepository } from "../../domain/repositories/RecetaRepository";
import { DB } from "../db/mysql/db";

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
}