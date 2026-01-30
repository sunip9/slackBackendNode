import request from "supertest";
import { app } from "../../app";

describe("Auth API Integration Tests", () => {
  describe("POST /api/user/signup", () => {
    it("should create a new user successfully", async () => {
      const email = `test${Date.now()}@example.com`;

      const response = await request(app)
        .post("/api/user/signup")
        .send({
          email,
          password: "Test@1234",
        })
        .expect(201);

      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(email);
      expect(response.body.token).toBeDefined();
      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should return 400 if email is invalid", async () => {
      const response = await request(app)
        .post("/api/user/signup")
        .send({
          email: "invalid-email",
          password: "Test@1234",
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });

    it("should return 400 if password is too weak", async () => {
      const response = await request(app)
        .post("/api/user/signup")
        .send({
          email: "test@example.com",
          password: "weak",
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });

    it("should return 400 if email already exists", async () => {
      const email = `duplicate${Date.now()}@example.com`;

      // First signup
      await request(app)
        .post("/api/user/signup")
        .send({
          email,
          password: "Test@1234",
        })
        .expect(201);

      // Try to signup with same email
      const response = await request(app)
        .post("/api/user/signup")
        .send({
          email,
          password: "Test@1234",
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });

    it("should set secure cookie in production", async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const email = `prod${Date.now()}@example.com`;

      const response = await request(app)
        .post("/api/user/signup")
        .send({
          email,
          password: "Test@1234",
        })
        .expect(201);

      const cookies = response.headers["set-cookie"];
      expect(cookies).toBeDefined();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("POST /api/user/signin", () => {
    it("should sign in successfully with valid credentials", async () => {
      const email = `signin${Date.now()}@example.com`;
      const password = "Test@1234";

      // First create user
      await request(app)
        .post("/api/user/signup")
        .send({ email, password })
        .expect(201);

      // Then sign in
      const response = await request(app)
        .post("/api/user/signin")
        .send({ email, password })
        .expect(200);

      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(email);
      expect(response.body.token).toBeDefined();
    });

    it("should return 400 with invalid email", async () => {
      const response = await request(app)
        .post("/api/user/signin")
        .send({
          email: "nonexistent@example.com",
          password: "Test@1234",
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });

    it("should return 400 with incorrect password", async () => {
      const email = `wrongpass${Date.now()}@example.com`;

      // Create user
      await request(app)
        .post("/api/user/signup")
        .send({ email, password: "Test@1234" })
        .expect(201);

      // Try to sign in with wrong password
      const response = await request(app)
        .post("/api/user/signin")
        .send({ email, password: "Wrong@1234" })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });
  });

  describe("POST /api/user/signout", () => {
    it("should sign out successfully", async () => {
      const response = await request(app).post("/api/user/signout").expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/user/currentuser", () => {
    it("should return current user when authenticated", async () => {
      const email = `current${Date.now()}@example.com`;
      const password = "Test@1234";

      // Sign up
      const signupResponse = await request(app)
        .post("/api/user/signup")
        .send({ email, password })
        .expect(201);

      const token = signupResponse.body.token;

      // Get current user
      const response = await request(app)
        .get("/api/user/currentuser")
        .set("Cookie", [`token=${token}`])
        .expect(200);

      expect(response.body.currentUser).toBeDefined();
      expect(response.body.currentUser.email).toBe(email);
    });

    it("should return null when not authenticated", async () => {
      const response = await request(app)
        .get("/api/user/currentuser")
        .expect(200);

      expect(response.body.currentUser).toBeNull();
    });
  });
});
