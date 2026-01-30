/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql("ALTER TABLE accounts ADD UNIQUE (email);");
};

exports.down = (pgm) => {
  pgm.sql("ALTER TABLE accounts REMOVE UNIQUE (email);");
};
