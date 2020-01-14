exports.up = function (knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
        return knex.schema.createTable("song_type", table => {
            table.uuid("id").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("name");
            table.integer("status");
            table.text("information");
            table.string("create_id");
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("song_type");
};
