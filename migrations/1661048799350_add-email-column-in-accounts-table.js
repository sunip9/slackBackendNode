/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE accounts
    ADD COLUMN email VARCHAR(50)
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE accounts
    DROP COLUMN email;
    `);
};
