import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({ email: "test@test7.com", password: "password" })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({ email: "test@test6com", password: "password" })
    .expect(400);
});
