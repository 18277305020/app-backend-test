
exports.up = function(knex, Promise) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
    return knex.schema.createTable("comment",table=>{
      table.uuid("cid").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").references('user.uid');
      table.string("target_id");
      table.string("reply_id");
      table.text("content");
      table.integer("like_count").defaultTo(0);
      table.integer("type").comment("0=视频，1=音乐，2=专辑，3=歌单，4=回复，5=活动");
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comment");
};
