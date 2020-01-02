
exports.up = function(knex, Promise) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
    return knex.schema.createTable("member",table=>{
      table.uuid("mid").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("membername");
      table.string("nickname");
      table.string("phone");
      table.string("wechat");
      table.string("qq");
      table.string("code");
      table.string("family");
      table.string("roles");
      table.string("familyLead");
      table.string("recommendname");
      table.text("remark");
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("member");
};
