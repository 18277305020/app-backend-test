
exports.up = function(knex, Promise) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
    return knex.schema.createTable("video",table=>{
      table.uuid("vid").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").references('user.uid');
      table.text("cover");
      table.text("url");
      table.string("title");
      table.text("desc");
      table.integer("status").defaultTo(0);
      table.integer("type").defaultTo(0);
      table.string("tag");
      table.integer("like_count").defaultTo(0);
      table.integer("comment_count").defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("video");
};
