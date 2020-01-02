
exports.up = function(knex, Promise) {
  return knex.schema.createTable("follow",table=>{
    table.increments("fid").unsigned().primary();
    table.uuid("user_id").references('user.uid');
    table.uuid("target_id").references('user.uid');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("follow");
};



