const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "274001",
  host: "localhost",
  port: 5432,
  database: "officebanao_todo_db"
});

module.exports = pool;