exports.up = function (knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
        return knex.schema.createTable("department", table => {
            table.uuid("did").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.integer("number");
            table.string("name");
            table.string("host_mid");
            table.string("create_mid");
            table.integer("status");
            table.text("information");
            table.text("remark");
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("department");
};
