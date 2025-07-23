import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'beersapidb'
};

let connection: mysql.Connection;

(async () => {
  connection = await mysql.createConnection(config);
})();

export { connection };
