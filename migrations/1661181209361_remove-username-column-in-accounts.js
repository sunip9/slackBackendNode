/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql("ALTER TABLE accounts DROP COLUMN username;");
};

exports.down = (pgm) => {
  pgm.sql("ALTER TABLE accounts ADD COLUMN username;");
};
