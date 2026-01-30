import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const options = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "itri",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
};

class Pool {
  _pool: pg.Pool | null = null;

  connect() {
    this._pool = new pg.Pool(options);
    console.log("DB connected !!");
    return this._pool.query("SELECT 1+1");
  }

  close() {
    if (!this._pool) {
      throw new Error("Database pool not initialized. Call connect() first.");
    }
    console.log("DB disconnected");
    return this._pool.end();
  }

  query(sql: string, params?: any[]) {
    if (!this._pool) {
      throw new Error("Database pool not initialized. Call connect() first.");
    }
    return this._pool.query(sql, params);
  }
}

export default new Pool();
