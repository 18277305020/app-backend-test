
exports.up = function(knex, Promise) {
  return knex.schema.createTable("playlist_music",table=>{
    table.string("pmid");
    table.uuid("mpid");
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("playlist_music");
};
