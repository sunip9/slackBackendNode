import Pool from "../db/config";
import { Password } from "../services/password";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { User } from "../types/user.types";

class UserRepo implements IUserRepository {
  async find(): Promise<User[]> {
    const { rows } = await Pool.query(
      "SELECT id, email, created_at, updated_at FROM accounts ORDER BY id ASC",
    );
    return rows;
  }

  async findById(id: number): Promise<User[]> {
    const { rows } = await Pool.query("SELECT * FROM accounts WHERE id = $1;", [
      id,
    ]);
    return rows;
  }

  async insert(
    username: string,
    password: string,
    email: string,
  ): Promise<User[]> {
    const { rows } = await Pool.query(
      `INSERT INTO accounts (username, password, email) VALUES ($1, $2, $3) RETURNING *;`,
      [username, password, email],
    );
    return rows;
  }

  async update(
    id: number,
    username?: string,
    password?: string,
    email?: string,
  ): Promise<User[]> {
    const { rows } = await Pool.query(
      `UPDATE accounts SET username = $1, password = $2, email = $4 WHERE id = $3 RETURNING *;`,
      [username, password, id, email],
    );
    return rows;
  }

  async delete(id: number): Promise<User[]> {
    const { rows } = await Pool.query(
      "DELETE FROM accounts WHERE id = $1 RETURNING *;",
      [id],
    );
    return rows;
  }

  async count(): Promise<{ count: string }> {
    const { rows } = await Pool.query("SELECT COUNT(*) FROM accounts ;");
    return rows[0];
  }

  async findOne(email: string): Promise<User | undefined> {
    const { rows } = await Pool.query(
      "SELECT * FROM accounts WHERE email = $1;",
      [email],
    );
    return rows[0];
  }

  async build(email: string, password: string): Promise<User> {
    const hashedPassword = await Password.tohash(password);
    const { rows } = await Pool.query(
      "INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING id, email;",
      [email, hashedPassword],
    );
    return rows[0];
  }
}

export default new UserRepo();
