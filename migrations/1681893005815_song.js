/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('songs',{
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'text',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        performer: {
            type: 'text',
            notNull: true,
        },
        genre: {
            type: 'text',
            notNull: true,
        },
        duration: {
            type: 'INTEGER',
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
