exports.up = function (knex, Promise) {
    return knex.schema.createTable("like", table => {
        table.increments("lid").unsigned().primary();
        table.uuid("user_id").references('user.uid');
        table.string("target_id");
        table.integer("type").defaultTo(0).comment("0=视频，1=音乐，2=专辑，3=歌单，4=评论，5=活动");
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("like");
};
