const pg = require("pg");

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "itri",
  user: "postgres",
  password: "postgres",
});

pool
  .query(
    `
UPDATE posts
SET loc = POINT(lat, lng)
WHERE loc is NULL;
`
  )
  .then(() => {
    console.log("Update complete !");
    pool.end();
  })
  .catch((err) => {
    console.error(err.message);
  });
