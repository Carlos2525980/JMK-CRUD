
//criando conexão com o mysql

import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "crud",
});
