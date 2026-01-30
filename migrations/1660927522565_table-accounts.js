/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE accounts ( 
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(30) NOT NULL,
        password VARCHAR(30) NOT NULL   
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE accounts;
    `);
};
