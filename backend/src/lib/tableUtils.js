// Bringing in the module for autocomplete
/* eslint-disable-next-line no-unused-vars */
const Knex = require('knex');

/**
 * Adds the created_at, updated_at, and deleted_at columns to the table passed in.
 * @param {Knex.CreateTableBuilder} table - The table being created
 */
function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

/**
 * Creates a table with just the default columns and a name attribute.
 * @param {Knex} knex - The instance of knex passed into the migration file.
 * @param {String} tableName - The name of the table to be created.
 */
function createNameTable(knex, tableName) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().notNullable();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
  });
}

/**
 * Creates a foreign key reference to another table.
 * @param {Knex.CreateTableBuilder} table - The table Knex generates in when creating a table.
 * @param {String} tableName - The name of the table the column will be referencing. For example,
 *                             passing in team will result in the column being named team_id and
 *                             referencing the id field in the team table.
 * @param {Boolean} notNullable - Defaults to true. Determines whether or not the field can be null.
 */
function references(table, tableName, notNullable = true) {
  const definition = table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }
}

/**
 * Creates a String column on a table that has a defined limit for URLs.
 * @param {Knex.CreateTableBuilder} table - The table Knex generates in when creating a table.
 * @param {String} columnName - The name of the column to be generated.
 */
function url(table, columnName) {
  table.string(columnName, 2000);
}

module.exports = {
  addDefaultColumns,
  createNameTable,
  references,
  url,
};
