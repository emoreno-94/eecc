'use strict';

exports.up = function(knex) {
  return knex.schema
    .createTable('species', (table) => {
      table.string('hash').primary();
      table.string('collector_hash').default();
      table.text('scientist_name').default('');
      table.text('common_name').default('');
      table.text('incomplete_synonymy').default('');
      table.string('inhabit').default('');
      table.string('kingdom').default('');
      table.string('division').default('');
      table.string('class').default('');
      table.string('order').default('');
      table.string('family').default('');
      table.string('endemic').default('');
      table.text('distribution').default('');
      table.string('valid_category_text').default('');
      table.string('source_category').default('');
      table.string('classify_rule_for_valid_rce_species').default('');
      table.string('process_number_rce').default('');
      table.string('reference_or_decree_valid_category').default('');
      table.string('before_category_to_current_rce_not_valid').default('');
      table.string('before_source_category_to_current_rce_not_valid').default('');
      table.string('before_before_category_to_current_rce_not_valid').default('');
      table.string('before_before_source_category_to_current_rce_not_valid').default('');
      table.string('classification').default('');
      table.integer('version').default(1);
      table.enu('state', [ 'new', 'changed', 'found', 'not-found' ]).default('new');
      table.jsonb('last_diff').default(null);
      table.timestamp('last_date_found').default(knex.fn.now());
      table.timestamp('created_at');
      table.timestamp('updated_at');
    })

    .createTable('region', (table) => {
      table.increments('id').primary();
      table.string('name').unique();
      table.timestamp('created_at');
      table.timestamp('updated_at');
    })

    .createTable('species_region', (table) => {
      table.increments('id').primary();
      table.integer('region_id').references('region.id').notNull();
      table.string('species_hash').references('species.hash').notNull();
      table.string('value').default('1');
      table.timestamp('created_at');
      table.timestamp('updated_at');
      table.unique([ 'region_id', 'species_hash' ]);
    })

    .createTable('valid_category', (table) => {
      table.increments('id').primary();
      table.string('short_name').unique();
      table.string('name').unique('');
      table.timestamp('created_at');
      table.timestamp('updated_at');
    })

    .createTable('species_valid_category', (table) => {
      table.increments('id').primary();
      table.integer('valid_category_id').references('valid_category.id').notNull();
      table.string('species_hash').references('species.hash').notNull();
      table.timestamp('created_at');
      table.timestamp('updated_at');
      table.unique([ 'valid_category_id', 'species_hash' ]);
    })

    // triggers
    .raw(`
      CREATE OR REPLACE FUNCTION make_created_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.created_at IS NULL THEN
          NEW.created_at = now();
          NEW.updated_at = now();
          RETURN NEW;
        ELSE
          RETURN NEW;
        END IF;
      END;
      $$ language 'plpgsql';
    `)

    .raw(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `)

    // triggers species
    .raw(`
      CREATE TRIGGER make_species_creation_time

      BEFORE INSERT ON species
      FOR EACH ROW EXECUTE PROCEDURE make_created_at_column()
    `)

    .raw(`
      CREATE TRIGGER update_species_update_time
      BEFORE UPDATE ON species
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()
    `)

    // triggers region
    .raw(`
      CREATE TRIGGER make_region_creation_time

      BEFORE INSERT ON region
      FOR EACH ROW EXECUTE PROCEDURE make_created_at_column()
    `)

    .raw(`
      CREATE TRIGGER update_region_update_time
      BEFORE UPDATE ON region
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()
    `)

    // triggers species_region
    .raw(`
      CREATE TRIGGER make_species_region_creation_time

      BEFORE INSERT ON species_region
      FOR EACH ROW EXECUTE PROCEDURE make_created_at_column()
    `)

    .raw(`
      CREATE TRIGGER update_species_region_update_time
      BEFORE UPDATE ON species_region
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()
    `)

    // triggers valid_category
    .raw(`
      CREATE TRIGGER make_valid_category_creation_time

      BEFORE INSERT ON valid_category
      FOR EACH ROW EXECUTE PROCEDURE make_created_at_column()
    `)

    .raw(`
      CREATE TRIGGER update_valid_category_update_time
      BEFORE UPDATE ON valid_category
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()
    `)

    // triggers species_valid_category
    .raw(`
      CREATE TRIGGER make_species_valid_category_creation_time

      BEFORE INSERT ON species_valid_category
      FOR EACH ROW EXECUTE PROCEDURE make_created_at_column()
    `)

    .raw(`
      CREATE TRIGGER update_species_valid_category_update_time
      BEFORE UPDATE ON species_valid_category
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()
    `);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE IF EXISTS species CASCADE`),
    knex.schema.raw(`DROP TABLE IF EXISTS region CASCADE`),
    knex.schema.raw(`DROP TABLE IF EXISTS species_region CASCADE`),
    knex.schema.raw(`DROP TABLE IF EXISTS valid_category CASCADE`),
    knex.schema.raw(`DROP TABLE IF EXISTS species_valid_category CASCADE`),
    knex.raw(`DROP FUNCTION make_created_at_column() CASCADE`),
    knex.raw(`DROP FUNCTION update_updated_at_column() CASCADE`)
  ]);
};
