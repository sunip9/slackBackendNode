/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    "ALTER TABLE accounts ALTER COLUMN password TYPE character varying(220);"
  );
};

exports.down = (pgm) => {
  pgm.sql(
    "ALTER TABLE accounts ALTER COLUMN password TYPE character varying(30);"
  );
};
