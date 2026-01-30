import Pool from "../db/config";

beforeAll(async () => {
  return Pool.connect();
});

afterAll(() => {
  return Pool.close();
});
