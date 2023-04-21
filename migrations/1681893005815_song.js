/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('songs',{
        id: {
            type: 'VARCHAR(30)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        performer: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        genre: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        duration: {
            type: 'INTEGER',
        },
        album_id: {
            type: 'VARCHAR(30)',
            references: '"albums"',
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
