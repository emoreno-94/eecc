exports.up = async knex => {
  await knex.schema.dropTable('species_region');
  await knex.schema.dropTable('region');

  await knex.schema.createTable('region', table => {
    table.string('name').primary();
  });
  await knex.schema.createTable('species_region', table => {
    table.increments('id').primary();
    table.string('region_name').references('region.name').notNull().onUpdate('cascade');
    table.string('species_hash').references('species.hash').notNull().onUpdate('cascade');
    table.string('value').default('1');
    table.unique([ 'region_name', 'species_hash' ]);
  });

  await knex('region').insert([
    { name: 'Arica y Parinacota' },
    { name: 'Tarapacá' },
    { name: 'Antofagasta' },
    { name: 'Atacama' },
    { name: 'Coquimbo' },
    { name: 'Valparaíso continental' },
    { name: 'Metropolitana' },
    { name: 'O\'higgins' },
    { name: 'Maule' },
    { name: 'Ñuble' },
    { name: 'Bío-Bío' },
    { name: 'Araucanía' },
    { name: 'De Los Ríos' },
    { name: 'De Los Lagos' },
    { name: 'Aysén' },
    { name: 'Magallanes continental e insular' },
    { name: 'Antártica' },
    { name: 'Isla Pascua' },
    { name: 'Salas y Gómez' },
    { name: 'Juan Fernandez' },
    { name: 'Desventuradas' },
  ]);


  await knex.schema.dropTable('species_valid_category');
  await knex.schema.dropTable('valid_category');

  await knex.schema.createTable('valid_category', table => {
    table.string('short_name').primary();
    table.string('name').unique('');
  });
  await knex.schema.createTable('species_valid_category', table => {
    table.increments('id').primary();
    table.string('valid_category_short_name').references('valid_category.short_name').notNull().onUpdate('cascade');
    table.string('species_hash').references('species.hash').notNull().onUpdate('cascade');
    table.unique([ 'valid_category_short_name', 'species_hash' ]);
  });

  await knex('valid_category').insert([
    { short_name: 'CR', name: 'En peligro crítico' },
    { short_name: 'DD', name: 'Datos insuficientes' },
    { short_name: 'EN', name: 'En Peligro' },
    { short_name: 'EW', name: 'Extinta en estado silvestre' },
    { short_name: 'EX', name: 'Extinta' },
    { short_name: 'FP', name: 'Fuera de Peligro' },
    { short_name: 'IC', name: 'Insuficientemente Conocida' },
    { short_name: 'LC', name: 'Preocupación menor' },
    { short_name: 'NT', name: 'Casi amenazada' },
    { short_name: 'R', name: 'Rara' },
    { short_name: 'VU', name: 'Vulnerable' },
    { short_name: 'Taxón no presente en Chile', name: 'Taxón no presente en Chile' },
    { short_name: 'Otro', name: 'No encaja en las categorías normales' },
  ]);
};

exports.down = async () =>
  // no habrá rollback de esta parte debido a que es un "breaking change" por la eliminación de las seeds
  false
;
