import request from "supertest";
import { app } from "../../app";
import { getAuthToken } from "../../test/helpers/auth.helper";

describe("Users API Integration Tests", () => {
  describe("GET /api/users", () => {
    it("should return list of users", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("success");
      expect(response.body).toHaveProperty("count");
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should not include password in user data", async () => {
      const response = await request(app).get("/api/users").expect(200);

      if (response.body.data.length > 0) {
        expect(response.body.data[0]).not.toHaveProperty("password");
      }
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user by id", async () => {
      // First create a user
      const email = `getuser${Date.now()}@example.com`;
      const signupResponse = await request(app)
        .post("/api/user/signup")
        .send({ email, password: "Test@1234" })
        .expect(201);

      const userId = signupResponse.body.user.id;

      // Get user by id
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 400 for non-existent user", async () => {
      const response = await request(app).get("/api/users/99999").expect(400);

      expect(response.body.data).toBe("User Data not found !");
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const email = `newuser${Date.now()}@example.com`;

      const response = await request(app)
        .post("/api/users")
        .send({
          username: "testuser",
          password: "password123",
          email,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update an existing user", async () => {
      // Create user first
      const email = `update${Date.now()}@example.com`;
      const createResponse = await request(app)
        .post("/api/users")
        .send({
          username: "oldname",
          password: "password123",
          email,
        })
        .expect(200);

      const userId = createResponse.body.data[0].id;

      // Update user
      const newEmail = `updated${Date.now()}@example.com`;
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send({
          username: "newname",
          password: "newpassword",
          email: newEmail,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data[0].email).toBe(newEmail);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete an existing user", async () => {
      // Create user first
      const email = `delete${Date.now()}@example.com`;
      const createResponse = await request(app)
        .post("/api/users")
        .send({
          username: "todelete",
          password: "password123",
          email,
        })
        .expect(200);

      const userId = createResponse.body.data[0].id;

      // Delete user
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 400 when deleting non-existent user", async () => {
      const response = await request(app)
        .delete("/api/users/99999")
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
