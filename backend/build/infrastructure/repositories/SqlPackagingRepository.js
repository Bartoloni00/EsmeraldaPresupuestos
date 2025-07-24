"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLPackagingRepository = void 0;
const db_1 = require("../db/mysql/db");
class MySQLPackagingRepository {
    async getAllorByID(packaging_id) {
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
        const [rows] = await db_1.DB.query(query, params);
        return rows;
    }
}
exports.MySQLPackagingRepository = MySQLPackagingRepository;
