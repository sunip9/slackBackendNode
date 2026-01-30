/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE accounts
    RENAME COLUMN name to username;
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE accounts
    RENAME COLUMN username to name;
    `);
};
