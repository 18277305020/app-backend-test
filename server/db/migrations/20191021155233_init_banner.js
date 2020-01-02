
exports.up = function(knex, Promise) {
  return knex.schema.createTable("banner",table=>{
    table.increments("bid").unsigned().primary();
    table.string("title");
    table.text("cover");
    table.text("desc");
    table.integer("type").defaultTo(0).comment("0=默认，1=视频，2=专辑，3=歌单，4=活动")
    table.string("key").comment("对应的id");
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("banner");
};

