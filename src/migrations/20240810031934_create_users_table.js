exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('social_reason').notNullable();
        table.string('fantasy_name').notNullable();
        table.string('CNPJ').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('creci');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.date('date_birth');
        table.string('gender');
        table.string('marital_status');
        table.string('phone');
        table.string('profession');
        table.string('whatsapp');
        table.string('facebook');
        table.string('instagran');
        table.string('linkedin');
        table.string('reclame_aqui');
        table.string('site');
        table.string('zip_code');
        table.string('street');
        table.string('number');
        table.string('complement');
        table.string('neighborhood');
        table.string('city');
        table.string('state');
        table.string('opening_hours');
        table.text('description');
        table.string('logo');
        table.string('password').notNullable();
        table.string('status').defaultTo('registered');
        table.timestamps(true, true);  // created_at and updated_at
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
