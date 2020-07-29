/* eslint-disable no-console */
/* eslint-disable-next-line no-unused-vars */
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

/**
 * Initial seed data for the season and season_type table.
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Clear the tables first.
  console.log('Clearing Season');
  await knex(tableNames.season).del();

  console.log('Clearing Season Type');
  await knex(tableNames.season_type).del();

  // Insert the season_type row
  const seasonType = {
    type: 'REGULAR',
  };

  const [createdSeasonType] = await knex(tableNames.season_type).insert(seasonType).returning('*');
  const seasonTypeId = createdSeasonType.id;

  console.log('Season Type Created:', createdSeasonType);

  // Insert the season row
  const season = {
    year: 2020,
    season_type_id: seasonTypeId,
  };

  const [createdSeason] = await knex(tableNames.season).insert(season).returning('*');
  console.log('Season Created:', createdSeason);
};
