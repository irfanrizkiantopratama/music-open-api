/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('albums',{
        id: {
            type: 'VARCHAR(40)',
            primaryKey: true,
        },
        name: {
            type: 'VARCHAR(40)',
            notNull: true,
        },
    })
};

exports.down = (pgm) => {
    pgm.dropTable('albums');
};
