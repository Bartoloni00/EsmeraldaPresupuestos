import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'abraham',
  port: 3306,
  password: '123',
  database: 'esmeraldapresupuestos',
};

let connection: mysql.Connection;

(async () => {
  connection = await mysql.createConnection(config);
})();

export { connection as DB };
