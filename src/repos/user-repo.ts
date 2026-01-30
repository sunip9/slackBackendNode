import Pool from "../db/config";
import { Password } from "../services/password";

class UserRepo {
  static async find() {
    const { rows } = await Pool.query(
      "SELECT id, email, created_at, updated_at FROM accounts ORDER BY id ASC"
    );
    return rows;
  }
  static async findById(id: any) {
    const { rows } = await Pool.query("SELECT * FROM accounts WHERE id = $1;", [
      id,
    ]);
    return rows;
  }
  static async insert(username: any, password: any, email: any) {
    const { rows } = await Pool.query(
      `INSERT INTO accounts (username, password, email) VALUES ($1, $2, $3) RETURNING *;`,
      [username, password, email]
    );
    return rows;
  }
  static async update(id: any, username?: string, password?: any, email?: any) {
    const { rows } = await Pool.query(
      `UPDATE accounts SET username = $1, password = $2, email = $4 WHERE id = $3 RETURNING *;`,
      [username, password, id, email]
    );
    return rows;
  }
  static async delete(id: any) {
    const { rows } = await Pool.query(
      "DELETE FROM accounts WHERE id = $1 RETURNING *;",
      [id]
    );
    return rows;
  }
  static async count() {
    const { rows } = await Pool.query("SELECT COUNT(*) FROM accounts ;");
    return rows[0];
  }
  static async findOne(email: string) {
    const { rows } = await Pool.query(
      "SELECT * FROM accounts WHERE email = $1;",
      [email]
    );
    return rows[0];
  }
  static async build(email: any, password: any) {
    const hashedPassword = await Password.tohash(password);
    const { rows } = await Pool.query(
      "INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING id, email;",
      [email, hashedPassword]
    );
    return rows[0];
  }
}

export default UserRepo;
