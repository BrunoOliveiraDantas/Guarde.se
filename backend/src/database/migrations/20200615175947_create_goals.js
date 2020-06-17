exports.up = function(knex) {
    return knex.schema.createTable('goals', function (table) {
        table.increments('id');
        table.string('goal_name').notNullable();
        table.integer('goal_activity').notNullable();

        table.string('objective_id').notNullable();
        
        table.foreign('objective_id').references('id').inTable('objectives');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('goals');
};
