exports.up = function(knex) {
    return knex.schema.createTable('objectives', function (table) {
        table.increments('id');
        table.string('objective_name').notNullable();
        table.string('category').notNullable();

        table.string('user_id').notNullable();
        
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('objectives');
};
