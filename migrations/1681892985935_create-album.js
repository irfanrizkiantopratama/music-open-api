/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('albums',{
        id: {
            type: 'VARCHAR(40)',
            primaryKey: true,
        },
        name: {
            type: 'VARCHAR(40)',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        created_at:{
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('albums');
};
