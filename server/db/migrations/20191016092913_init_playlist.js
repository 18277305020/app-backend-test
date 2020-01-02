
exports.up = function(knex, Promise) {
  return knex.schema.createTable("playlist",table=>{
    table.increments("pid").unsigned().primary();
    table.uuid("user_id").references('user.uid');
    table.text("cover");
    table.string("title");
    table.string("desc");
    table.string("tag");
    table.integer("music_count").defaultTo(0);
    table.integer("like_count").defaultTo(0);
    table.integer("comment_count").defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("playlist");
};
