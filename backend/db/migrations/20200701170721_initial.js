/* eslint-disable-next-line no-unused-vars */
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const {
  createNameTable, addDefaultColumns, url, references,
} = require('../../src/lib/tableUtils');

/**
 * Initial migration file that creates the different tables and relationships.
 * Entity Relationship Diagram can be found here: https://app.lucidchart.com/documents/edit/d9c7212c-2424-44a4-8a88-088b3133a1a3/0_0
 * The up is what is run when knex:migrate is ran.
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  /* Create the division, conference, stat_type, and season_type tables all at once because
     they don't have any dependencies */
  await Promise.all([
    // DIVISION
    createNameTable(knex, tableNames.division),
    // CONFERENCE
    createNameTable(knex, tableNames.conference),

    // STAT_TYPE
    knex.schema.createTable(tableNames.stat_type, (table) => {
      table.increments().notNullable();
      table.string('type', 100).notNullable().unique();
      addDefaultColumns(table);
    }),

    // SEASON_TYPE
    knex.schema.createTable(tableNames.season_type, (table) => {
      table.increments().notNullable();
      table.string('type', 50).notNullable().unique();
      addDefaultColumns(table);
    }),
  ]);

  // SEASON
  await knex.schema.createTable(tableNames.season, (table) => {
    table.increments().notNullable();
    table.integer('year').unsigned().notNullable().unique();
    references(table, tableNames.season_type);
    addDefaultColumns(table);
  });

  // TEAM
  await knex.schema.createTable(tableNames.team, (table) => {
    table.increments().notNullable();
    table.string('name', 100).notNullable().unique();
    references(table, tableNames.division, false);
    references(table, tableNames.conference);
    table.string('color', 8).notNullable();
    table.string('alt_color', 8).notNullable();
    table.string('abbreviation', 50).notNullable();
    url(table, 'logo');
    addDefaultColumns(table);
  });

  // GAME
  await knex.schema.createTable(tableNames.game, (table) => {
    table.increments().notNullable();
    table.integer('week').notNullable();
    table.dateTime('game_start').notNullable();
    table.boolean('neutral_site').notNullable().defaultTo(false);
    table.boolean('conference_game').notNullable();
    table.integer('home_points').notNullable();
    table.integer('away_points').notNullable();
    references(table, tableNames.season);
    table.integer('home_team_id').unsigned().references('id').inTable(tableNames.team)
      .onDelete('cascade');
    table.integer('away_team_id').unsigned().references('id').inTable(tableNames.team)
      .onDelete('cascade');
    addDefaultColumns(table);
  });

  // TEAM_STAT
  await knex.schema.createTable(tableNames.team_stat, (table) => {
    table.increments().notNullable();
    references(table, tableNames.team);
    references(table, tableNames.stat_type);
    references(table, tableNames.season);
    table.integer('wins').notNullable();
    table.integer('losses').notNullable();
    table.float('stat').notNullable();
    table.string('stat_name', 255).notNullable();
    addDefaultColumns(table);
  });

  // GAME_STAT
  await knex.schema.createTable(tableNames.game_stat, (table) => {
    table.increments().notNullable();
    references(table, tableNames.game);
    references(table, tableNames.stat_type);
    table.float('stat').notNullable();
    table.string('stat_name', 255).notNullable();
    addDefaultColumns(table);
  });
};

/**
 * Drops the tables created above.
 * Down is executed on knex:rollback
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTable(tableNames.game_stat),
    knex.schema.dropTable(tableNames.team_stat),
    knex.schema.dropTable(tableNames.game),
    knex.schema.dropTable(tableNames.team),
    knex.schema.dropTable(tableNames.season),
    knex.schema.dropTable(tableNames.season_type),
    knex.schema.dropTable(tableNames.stat_type),
    knex.schema.dropTable(tableNames.conference),
    knex.schema.dropTable(tableNames.division),
  ]);
};
