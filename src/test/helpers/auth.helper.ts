import request from "supertest";
import { app } from "../../app";

/**
 * Helper to sign up a test user
 */
export const signupTestUser = async (
  email: string = "test@example.com",
  password: string = "Test@1234",
) => {
  const response = await request(app)
    .post("/api/user/signup")
    .send({ email, password })
    .expect(201);

  return response.body;
};

/**
 * Helper to sign in a test user
 */
export const signinTestUser = async (
  email: string = "test@example.com",
  password: string = "Test@1234",
) => {
  const response = await request(app)
    .post("/api/user/signin")
    .send({ email, password })
    .expect(200);

  return response.body;
};

/**
 * Helper to get authentication token
 */
export const getAuthToken = async (): Promise<string> => {
  const email = `test${Date.now()}@example.com`;
  const password = "Test@1234";

  const response = await signupTestUser(email, password);
  return response.token;
};

/**
 * Helper to make authenticated requests
 */
export const authenticatedRequest = (token: string) => {
  return request(app).set("Cookie", [`token=${token}`]);
};
