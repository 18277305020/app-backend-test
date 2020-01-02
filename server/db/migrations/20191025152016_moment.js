
exports.up = function(knex, Promise) {
  return knex.schema.createTable("moment",table=>{
    table.increments("mid").unsigned().primary();
    table.uuid("user_id").references('user.uid');
    table.string("desc");
    table.json("photos").comment("发布的照片");
    table.text("video").comment("发布的视频");
    table.integer("like_count").defaultTo(0);
    table.integer("comment_count").defaultTo(0);
    table.integer("status").defaultTo(0).comment("");
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("moment");
};


