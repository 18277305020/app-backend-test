exports.up = function (knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
        return knex.schema.createTable("library", table => {
            table.uuid("id").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("sid");
            table.string("name");
            table.string("type");
            table.string("writer");
            table.integer("lyrics");
            table.integer("score");
            table.integer("accompany");
            table.integer("original");
            table.string("album");
            table.integer("status");
            table.integer("select");
            table.text("information");
            table.string("create_id");
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("library");
};
