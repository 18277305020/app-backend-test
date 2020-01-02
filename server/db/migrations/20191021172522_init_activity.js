exports.up = function (knex, Promise) {
    return knex.schema.createTable("activity", table => {
        table.increments("aid").unsigned().primary();
        table.uuid("user_id").references('user.uid');
        table.string("title");
        table.text("cover");
        table.text("content");
        table.string("tag");
        table.integer("join_count").defaultTo(0).comment("报名人数");
        table.integer("like_count").defaultTo(0);
        table.integer("comment_count").defaultTo(0);
        table.integer("type").defaultTo(0).comment("0=默认，1=视频，2=专辑，3=歌单，4=活动")
        table.integer("status").defaultTo(0).comment("")
        table.string("start_at").comment("开始时间");
        table.string("end_at").comment("结束时间");
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("activity");
};

