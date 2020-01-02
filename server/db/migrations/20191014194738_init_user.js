
exports.up = function(knex, Promise) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
    return knex.schema.createTable("user",table=>{
      table.uuid("uid").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("password");
      table.string("platform").comment("属于哪个第三方登陆");
      table.string("platform_key").comment("属于哪个第三方登陆");
      table.string("rongyun_token").comment("融云token");
      table.string("nickname");
      table.text("avatar");
      table.json("photos").comment("用户形象照");
      table.string("phone");
      table.text("birth");
      table.integer("verified").defaultTo(0).comment("用户认证状态，0=未认证，1=认证中，2=已认证");
      table.integer("role").defaultTo(0).comment("用户角色，0=普通用户，1=音乐人，2=管理员");
      table.integer("sex").defaultTo(0);
      table.text("sign").comment("用户签名");
      table.text("city");
      table.string("secret").comment("用户身份证");
      table.boolean("is_communication_agree").defaultTo(false).comment("是否接受推送");
      table.integer("follow_count").defaultTo(0);
      table.json("wechat").comment("微信用户信息");
      table.json("qq").comment("qq用户信息");
      table.json("weibo").comment("微博用户信息");
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user");
};
